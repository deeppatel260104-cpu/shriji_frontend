import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormState } from './useFormState';
import CrudModal   from './CrudModal';
import DeleteModal from './DeleteModal';
import CrudTable   from './CrudTable';

// ─── Default FormData builder ─────────────────────────────────────────────────
const buildDefaultFormData = (values, files) => {
  const fd = new FormData();
  Object.entries(files).forEach(([k, v])   => { if (v != null) fd.append(k, v); });
  Object.entries(values).forEach(([k, v])  => { if (v != null) fd.append(k, v); });
  return fd;
};

// ─── CrudManager ─────────────────────────────────────────────────────────────
/**
 * Drop-in CRUD page orchestrator. Just pass a config object — no Redux
 * boilerplate needed in the page component.
 *
 * Required config shape:
 * {
 *   name, namePlural, subtitle,
 *   fields,          // FieldRenderer field definitions
 *   columns,         // CrudTable column definitions
 *   gridTemplate,    // CSS grid-template-columns string (includes actions slot)
 *   itemsKey,        // key inside the list-selector result (e.g. 'categories')
 *   selectors: { list, action },
 *   actions:   { fetch, create, update, delete, clearErrors, clearMessage },
 *
 *   // Optional
 *   extraSelector,   // (state) => object — extra data (e.g. { categories })
 *   extraFetch,      // array of action creators to dispatch on mount / success
 *   toggleConfig,    // { field, action } — for is_active style toggles
 *   filterConfig,    // { label, optionsKey, optionLabel, onFilter(value, dispatch) }
 *   validate,        // (values, files, isEdit) => errorString | null
 *   buildPayload,    // (values, files) => FormData | plain object
 *   getItemLabel,    // (item) => string — used in delete confirmation
 * }
 */
const CrudManager = ({ config }) => {
  const dispatch = useDispatch();
  const toggleActionPending = useRef(false);
  const pendingScrollRestore = useRef(null);

  // ── Redux ──────────────────────────────────────────────────────────────────
  const listState   = useSelector(config.selectors.list);
  const actionState = useSelector(config.selectors.action);
  const extraData   = useSelector(config.extraSelector ?? (() => ({})));

  const items        = listState[config.itemsKey] ?? [];
  const fetchLoading = listState.loading;
  const { loading: actionLoading, message, error } = actionState;

  // ── Modal state ────────────────────────────────────────────────────────────
  const [addOpen,     setAddOpen]     = useState(false);
  const [editItem,    setEditItem]    = useState(null);
  const [deleteItem,  setDeleteItem]  = useState(null);
  const [toast,       setToast]       = useState(null);

  // ── Form state (separate instances for add & edit) ─────────────────────────
  const addForm  = useFormState(config.fields);
  const editForm = useFormState(config.fields);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const showToast = (msg, type) => setToast({ msg, type });

  const captureScrollPositions = () => {
    if (typeof document === 'undefined') return [];

    const scrollNodes = [
      document.scrollingElement,
      ...document.querySelectorAll('.overflow-auto'),
    ].filter(Boolean);

    return [...new Set(scrollNodes)].map((node) => ({
      node,
      top: node.scrollTop,
      left: node.scrollLeft,
    }));
  };

  const restoreScrollPositions = (positions) => {
    if (!positions?.length || typeof window === 'undefined') return;

    const restore = () => {
      positions.forEach(({ node, top, left }) => {
        node.scrollTop = top;
        node.scrollLeft = left;
      });
    };

    window.requestAnimationFrame(() => {
      restore();
      window.requestAnimationFrame(restore);
    });
  };

  const dispatchAll = (actions = []) =>
    actions.forEach((a) => dispatch(a()));

  const refreshAll = () => {
    dispatch(config.actions.fetch());
    if (config.extraFetch) dispatchAll(config.extraFetch);
  };

  // ── Fetch on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    refreshAll();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // ── Global message / error handler ────────────────────────────────────────
  useEffect(() => {
    if (message) {
      showToast('Action completed successfully! 🎉', 'success');
      dispatch(config.actions.clearMessage());
      if (toggleActionPending.current) {
        toggleActionPending.current = false;
        return;
      }
      pendingScrollRestore.current = captureScrollPositions();
      refreshAll();
      restoreScrollPositions(pendingScrollRestore.current);
      setAddOpen(false);
      setEditItem(null);
      setDeleteItem(null);
      addForm.reset();
      editForm.reset();
    }
    if (error) {
      toggleActionPending.current = false;
      showToast(error, 'error');
      dispatch(config.actions.clearErrors());
    }
  }, [message, error]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Toast auto-dismiss ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (fetchLoading || !pendingScrollRestore.current) return;
    restoreScrollPositions(pendingScrollRestore.current);
    pendingScrollRestore.current = null;
  }, [fetchLoading]);

  // ── Sync edit form when item changes ──────────────────────────────────────
  useEffect(() => {
    if (editItem) editForm.populate(editItem);
  }, [editItem]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Submit handlers ────────────────────────────────────────────────────────
  const handleAddSubmit = () => {
    if (config.validate) {
      const err = config.validate(addForm.values, addForm.files, false);
      if (err) { showToast(err, 'error'); return; }
    }
    const payload = config.buildPayload
      ? config.buildPayload(addForm.values, addForm.files)
      : buildDefaultFormData(addForm.values, addForm.files);
    dispatch(config.actions.create(payload));
  };

  const handleEditSubmit = () => {
    if (config.validate) {
      const err = config.validate(editForm.values, editForm.files, true);
      if (err) { showToast(err, 'error'); return; }
    }
    const id = editItem?.id ?? editItem?._id;
    const payload = config.buildPayload
      ? config.buildPayload(editForm.values, editForm.files)
      : buildDefaultFormData(editForm.values, editForm.files);
    dispatch(config.actions.update(id, payload));
  };

  const handleDeleteConfirm = () => {
    if (deleteItem) {
      dispatch(config.actions.delete(deleteItem.id ?? deleteItem._id));
    }
  };

  const handleToggle = config.toggleConfig
    ? (id, item, col) => {
        const toggleConfigs = Array.isArray(config.toggleConfig)
          ? config.toggleConfig
          : [config.toggleConfig];
        const toggle = toggleConfigs.find((entry) => entry.field === col?.key) || toggleConfigs[0];
        if (toggle?.action) {
          toggleActionPending.current = true;
          dispatch(toggle.action(id, item));
        }
      }
    : null;



  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-8 py-4 shadow-sm"
        style={{ backgroundColor: '#f7f3ee', borderBottom: '1px solid #2c2420' }}
      >
        <div>
          <h1 className="font-bold text-xl tracking-tight" style={{ color: '#0d0b08' }}>
            {config.namePlural || config.name}
          </h1>
          {config.subtitle && (
            <p className="text-xs mt-0.5" style={{ color: '#2c2420' }}>{config.subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Optional category / entity filter */}
         

          {/* Add button */}
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg"
            style={{ backgroundColor: '#0d0b08', color: '#f7f3ee' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add {config.name}
          </button>
        </div>
      </header>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <CrudTable
        config={config}
        items={items}
        fetchLoading={fetchLoading}
        extraData={extraData}
        onEdit={setEditItem}
        onDelete={setDeleteItem}
        onToggle={handleToggle}
      />

      {/* ── Add Modal ───────────────────────────────────────────────────── */}
      {addOpen && (
        <CrudModal
          config={config}
          mode="add"
          formState={addForm}
          editItem={null}
          extraData={extraData}
          loading={actionLoading}
          toast={toast}
          onSubmit={handleAddSubmit}
          onSecondary={() => addForm.reset()}
          onClose={() => { setAddOpen(false); addForm.reset(); }}
        />
      )}

      {/* ── Edit Modal ──────────────────────────────────────────────────── */}
      {editItem && (
        <CrudModal
          config={config}
          mode="edit"
          formState={editForm}
          editItem={editItem}
          extraData={extraData}
          loading={actionLoading}
          toast={toast}
          onSubmit={handleEditSubmit}
          onSecondary={() => { setEditItem(null); editForm.reset(); }}
          onClose={() => { setEditItem(null); editForm.reset(); }}
        />
      )}

      {/* ── Delete Modal ────────────────────────────────────────────────── */}
      {deleteItem && (
        <DeleteModal
          config={config}
          item={deleteItem}
          loading={actionLoading}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteItem(null)}
        />
      )}
    </>
  );
};

export default CrudManager;
