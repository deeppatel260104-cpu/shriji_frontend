import FieldRenderer from './FieldRenderer';

/**
 * Unified Add / Edit modal.
 *
 * Layout groups consecutive fields that have `size: 'half'` into a 2-column
 * grid so images, selects, and toggles can sit side-by-side naturally.
 *
 * @param {object}   config       - Module config (name, namePlural, fields)
 * @param {'add'|'edit'} mode
 * @param {object}   formState    - From useFormState()
 * @param {object}   editItem     - Current item being edited (null for add)
 * @param {object}   extraData    - Extra Redux data (e.g. categories list)
 * @param {boolean}  loading
 * @param {object}   toast        - { msg, type } | null
 * @param {Function} onSubmit
 * @param {Function} onSecondary  - "Reset" for add, "Cancel" for edit
 * @param {Function} onClose
 */
const CrudModal = ({
  config,
  mode = 'add',
  formState,
  editItem,
  extraData = {},
  loading,
  toast,
  onSubmit,
  onSecondary,
  onClose,
}) => {
  const isAdd = mode === 'add';
  const { fields } = config;

  // ── Group fields into rows: consecutive 'half' fields → 2-col grid ──────────
  const renderBody = () => {
    const elements = [];
    let i = 0;
    while (i < fields.length) {
      const f = fields[i];
      if (f.size === 'half' && fields[i + 1]?.size === 'half') {
        elements.push(
          <div key={`row-${i}`} className="grid grid-cols-2 gap-4">
            <FieldRenderer field={fields[i]}     formState={formState} editItem={editItem} extraData={extraData} />
            <FieldRenderer field={fields[i + 1]} formState={formState} editItem={editItem} extraData={extraData} />
          </div>
        );
        i += 2;
      } else {
        elements.push(
          <FieldRenderer key={f.name} field={f} formState={formState} editItem={editItem} extraData={extraData} />
        );
        i++;
      }
    }
    return elements;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0b08]/75 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl rounded-2xl shadow-2xl bg-[#f7f3ee] border border-[#2c2420]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-[#2c2420]/15">
          <div>
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#2c2420]/50">
              {config.namePlural || config.name}
            </span>
            <h2 className="text-lg font-bold text-[#0d0b08] leading-tight mt-0.5">
              {isAdd ? `Add ${config.name}` : `Edit ${config.name}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2c2420] text-[#f7f3ee] text-sm hover:bg-[#0d0b08] transition-colors"
          >✕</button>
        </div>

        {/* ── Body ── */}
        <div className="px-7 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {renderBody()}

          {/* Loading bar */}
          {loading && (
            <div className="h-0.5 rounded overflow-hidden bg-[#2c2420]/15">
              <div className="h-full animate-pulse w-full bg-[#2c2420]" />
            </div>
          )}

          {/* Toast */}
          {toast && (
            <div className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-[#2c2420]/08 border border-[#2c2420]/25 text-[#2c2420]'
                : 'bg-red-600/08 border border-red-500/25 text-red-600'
            }`}>
              {toast.type === 'success' ? '✓' : '⚠'} {toast.msg}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center gap-3 px-7 py-4 border-t border-[#2c2420]/12 bg-[#ede8e2] rounded-b-2xl">
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-lg bg-[#0d0b08] text-[#f7f3ee] hover:bg-[#2c2420] hover:-translate-y-0.5 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="w-3.5 h-3.5 border-2 border-[#f7f3ee]/30 border-t-[#f7f3ee] rounded-full animate-spin" />
            )}
            {loading
              ? (isAdd ? 'Adding…'  : 'Saving…')
              : (isAdd ? `Add ${config.name}` : 'Save Changes')}
          </button>
          <button
            type="button"
            onClick={onSecondary}
            disabled={loading}
            className="text-sm font-semibold px-5 py-2.5 rounded-lg border border-[#2c2420]/30 text-[#2c2420] bg-transparent hover:bg-[#2c2420]/08 hover:border-[#2c2420] transition-all disabled:opacity-40"
          >
            {isAdd ? 'Reset' : 'Cancel'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CrudModal;
