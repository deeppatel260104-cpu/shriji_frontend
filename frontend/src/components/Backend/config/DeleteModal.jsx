/**
 * Unified delete confirmation modal.
 *
 * @param {object}   config     - Module config (name, getItemLabel)
 * @param {object}   item       - Item being deleted
 * @param {boolean}  loading
 * @param {Function} onConfirm
 * @param {Function} onCancel
 */
const DeleteModal = ({ config, item, loading, onConfirm, onCancel }) => {
  const label = config.getItemLabel ? config.getItemLabel(item) : item?.name || 'this item';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0d0b08]/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl bg-[#f7f3ee] border border-[#2c2420]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-[#2c2420]/15">
          <div>
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#2c2420]/50">
              {config.name}
            </span>
            <h2 className="text-lg font-bold text-[#0d0b08] leading-tight mt-0.5">
              Delete {config.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2c2420] text-[#f7f3ee] text-sm hover:bg-[#0d0b08] transition-colors"
          >✕</button>
        </div>

        {/* ── Body ── */}
        <div className="px-7 py-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 border border-red-100">
            <span className="text-2xl select-none">🗑️</span>
            <div>
              <p className="text-sm font-semibold text-[#0d0b08]">
                Are you sure you want to delete this {config.name.toLowerCase()}?
              </p>
              <p className="text-xs text-[#2c2420]/60 mt-1 italic">"{label}"</p>
              <p className="text-xs text-red-500 mt-2 font-medium">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center gap-3 px-7 py-4 border-t border-[#2c2420]/12 bg-[#ede8e2] rounded-b-2xl">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {loading ? 'Deleting…' : 'Yes, Delete'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="text-sm font-semibold px-5 py-2.5 rounded-lg border border-[#2c2420]/30 text-[#2c2420] bg-transparent hover:bg-[#2c2420]/08 hover:border-[#2c2420] transition-all disabled:opacity-40"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;
