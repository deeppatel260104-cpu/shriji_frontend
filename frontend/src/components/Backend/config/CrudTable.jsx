import { getYoutubeId } from './FieldRenderer';

// ─── Image thumbnail (matches existing design) ────────────────────────────────
const ImageThumb = ({ url, name }) => {
  if (url) {
    return (
      <div className="w-16 h-10 rounded-lg overflow-hidden border border-[#2c2420]/20 flex-shrink-0">
        <img src={url} alt="thumb" className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 bg-[#ede8e2] rounded-lg px-3 py-1.5 border border-[#2c2420]/10 max-w-[140px]">
      <svg className="w-4 h-4 text-[#2c2420]/30 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span className="text-[#2c2420]/40 text-xs truncate">{name || 'No image'}</span>
    </div>
  );
};

// ─── Single cell renderer ─────────────────────────────────────────────────────
/**
 * Renders one table cell based on its column type.
 *
 * Supported column types:
 *   'index'        – row number (1-based)
 *   'image'        – ImageThumb
 *   'text'         – plain text (bold)
 *   'mono'         – monospace text
 *   'badge'        – pill badge
 *   'toggle'       – active/inactive switch (calls onToggle(itemId))
 *   'youtube-thumb'– YouTube thumbnail image
 *   'youtube-link' – Clickable truncated link
 *   'custom'       – col.render(value, item, extraData) → ReactNode
 */
const CellRenderer = ({ col, value, item, idx, onToggle, extraData }) => {
  switch (col.type) {

    case 'index':
      return <span className="font-mono text-sm" style={{ color: '#2c2420' }}>{idx + 1}</span>;

    case 'image':
      return <ImageThumb url={value} name={col.imageName || 'image.jpg'} />;

    case 'text':
      return <span className="text-sm font-semibold" style={{ color: '#0d0b08' }}>{value ?? '—'}</span>;

    case 'mono':
      return <span className="text-sm font-mono" style={{ color: '#2c2420' }}>{value ?? '—'}</span>;

    case 'badge':
      return (
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize w-fit"
          style={{ backgroundColor: 'rgba(44,36,32,0.1)', color: '#2c2420', border: '1px solid rgba(44,36,32,0.2)' }}
        >
          {value ?? '—'}
        </span>
      );

    case 'toggle': {
      const id = item.id ?? item._id;
      const checked = value === true || value === 1 || value === '1';
      return (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggle?.(id, item, col)}
            className="sr-only peer"
          />
          <div
            className="w-10 h-5 rounded-full transition-all duration-300 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:rounded-full after:h-4 after:w-4 after:transition-all after:duration-300 after:bg-white"
            style={{ backgroundColor: checked ? '#2c2420' : 'rgba(44,36,32,0.2)' }}
          />
        </label>
      );
    }

    case 'youtube-thumb': {
      const ytId = getYoutubeId(value ?? '');
      const src  = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;
      return src
        ? <img src={src} alt="thumb" className="w-24 h-14 object-cover rounded-lg border border-[#2c2420]/10" />
        : <div className="w-24 h-14 rounded-lg bg-[#ede8e2] border border-[#2c2420]/10 flex items-center justify-center text-[#2c2420]/30 text-xs">No thumb</div>;
    }

    case 'youtube-link':
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2c2420]/50 hover:text-[#0d0b08] text-xs truncate block underline underline-offset-2 transition-colors max-w-[200px]"
        >
          {value}
        </a>
      );

    case 'custom':
      return col.render ? col.render(value, item, extraData) : null;

    default:
      return <span className="text-sm" style={{ color: '#0d0b08' }}>{value ?? '—'}</span>;
  }
};

// ─── CrudTable ────────────────────────────────────────────────────────────────
/**
 * Generic table driven by config.columns + config.gridTemplate.
 *
 * @param {object}   config       - Module config
 * @param {Array}    items        - Data rows
 * @param {boolean}  fetchLoading
 * @param {object}   extraData    - Passed to custom cell renderers
 * @param {Function} onEdit
 * @param {Function} onDelete
 * @param {Function} onToggle     - Optional; used when a column has type 'toggle'
 */
const CrudTable = ({
  config,
  items = [],
  fetchLoading,
  extraData = {},
  onEdit,
  onDelete,
  onToggle,
}) => {
  const { columns, gridTemplate, name, namePlural } = config;
  // gridTemplate must include the trailing Actions column slot
  const colTemplate = gridTemplate || `repeat(${columns.length}, 1fr) 130px`;
  const label = (namePlural || name || 'items').toLowerCase();
  const initialLoading = fetchLoading && items.length === 0;
  const refreshing = fetchLoading && items.length > 0;

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2c2420' }}>

        {/* ── Header row ── */}
        <div
          className="grid px-6 py-3 text-xs font-semibold tracking-widest uppercase"
          style={{
            gridTemplateColumns: colTemplate,
            backgroundColor: '#f7f3ee',
            borderBottom: '1px solid #2c2420',
            color: '#2c2420',
          }}
        >
          {columns.map((col) => (
            <span key={col.key + col.label}>{col.label}</span>
          ))}
          <span className="text-right">Actions</span>
        </div>

        {/* ── Loading ── */}
        {initialLoading && (
          <div className="flex items-center justify-center py-16 text-sm" style={{ backgroundColor: '#f7f3ee', color: '#2c2420' }}>
            <span className="w-4 h-4 border-2 rounded-full animate-spin mr-3" style={{ borderColor: '#2c2420', borderTopColor: '#0d0b08' }} />
            Loading {label}…
          </div>
        )}

        {refreshing && (
          <div
            className="flex items-center justify-end gap-2 px-6 py-2 text-xs font-semibold"
            style={{
              backgroundColor: '#ede8e2',
              borderBottom: '1px solid rgba(44,36,32,0.18)',
              color: '#2c2420',
            }}
          >
            <span className="w-3 h-3 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(44,36,32,0.25)', borderTopColor: '#2c2420' }} />
            Updating...
          </div>
        )}

        {/* ── Empty ── */}
        {!fetchLoading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16" style={{ backgroundColor: '#f7f3ee', color: '#2c2420' }}>
            <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <p className="text-sm">No {label} yet. Add one to get started.</p>
          </div>
        )}

        {/* ── Data rows ── */}
        {!initialLoading && items.map((item, idx) => (
          <div
            key={item._id || item.id || idx}
            className="grid px-6 py-4 items-center transition-colors"
            style={{
              gridTemplateColumns: colTemplate,
              backgroundColor: '#f7f3ee',
              borderBottom: '1px solid rgba(44,36,32,0.3)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ede8e2'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f7f3ee'; }}
          >
            {columns.map((col) => (
              <div key={col.key + col.label}>
                <CellRenderer
                  col={col}
                  value={col.key === '_rowIndex' ? null : item[col.key]}
                  item={item}
                  idx={idx}
                  onToggle={onToggle}
                  extraData={extraData}
                />
              </div>
            ))}

            {/* ── Actions ── */}
            <div className="flex items-center justify-end gap-3">
              {/* Edit */}
              <button
                type="button"
                onClick={() => onEdit(item)}
                title="Edit"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ backgroundColor: 'rgba(44,36,32,0.1)', border: '1px solid rgba(44,36,32,0.3)', color: '#2c2420' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(44,36,32,0.25)'; e.currentTarget.style.borderColor = '#2c2420'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(44,36,32,0.1)'; e.currentTarget.style.borderColor = 'rgba(44,36,32,0.3)'; }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              {/* Delete */}
              <button
                type="button"
                onClick={() => onDelete(item)}
                title="Delete"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#dc2626' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.2)'; e.currentTarget.style.borderColor = '#dc2626'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.08)'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.2)'; }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CrudTable;
