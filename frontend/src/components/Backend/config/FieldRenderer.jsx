import { useRef, useState } from 'react';

// ─── Shared style tokens ──────────────────────────────────────────────────────
const CLS = {
  label:    'text-[10px] font-bold tracking-widest uppercase text-[#2c2420]/50',
  hint:     'text-[11px] text-[#2c2420]/40',
  card:     'flex flex-col gap-1.5 rounded-xl bg-[#ede8e2] border border-[#2c2420]/20 px-5 py-4',
  input:    'outline-none rounded-lg px-4 py-2.5 text-sm font-medium bg-[#ede8e2] border border-[#2c2420]/25 text-[#0d0b08] placeholder:text-[#2c2420]/30 focus:border-[#2c2420] transition-colors w-full',
  numInput: 'w-20 text-center outline-none rounded-lg px-3 py-2 text-sm font-semibold bg-[#f7f3ee] border border-[#2c2420]/25 text-[#0d0b08] focus:border-[#2c2420] transition-colors',
};

// ─── Drop Zone ────────────────────────────────────────────────────────────────
const DropZone = ({ onFile, existingUrl, label }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith('image/')) onFile(f);
  };

  // Show existing image (edit mode) with a click-to-replace overlay
  if (existingUrl) {
    return (
      <div
        onClick={() => inputRef.current.click()}
        className="relative w-full h-full min-h-[9rem] rounded-xl overflow-hidden border border-[#2c2420]/20 bg-[#ede8e2] cursor-pointer group"
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} />
        <img src={existingUrl} alt={label || 'existing'} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0d0b08]/50 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f7f3ee]/20 text-sm">🖼️</div>
          <p className="text-[10px] font-bold text-[#f7f3ee] tracking-wide">Click to replace</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`w-full h-full min-h-[9rem] flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
        dragging
          ? 'border-[#2c2420] bg-[#2c2420]/08'
          : 'border-[#2c2420]/30 bg-[#ede8e2] hover:border-[#2c2420]/60 hover:bg-[#2c2420]/05'
      }`}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} />
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#2c2420]/10 text-base">🖼️</div>
      <div className="text-center">
        <p className="text-xs font-bold text-[#2c2420]/70 tracking-wide">Drop or click</p>
        <p className="text-[10px] text-[#2c2420]/40 mt-0.5">JPG · PNG · WEBP</p>
      </div>
    </div>
  );
};

// ─── YouTube helper ───────────────────────────────────────────────────────────
export const getYoutubeId = (url = '') => {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
};

// ─── FieldRenderer ────────────────────────────────────────────────────────────
/**
 * Renders a single form field based on its `type` config.
 *
 * Supported types: 'text' | 'textarea' | 'number' | 'image' | 'select' | 'youtube' | 'layout-toggle' | 'checkbox'
 *
 * @param {object} field      - Field definition from config.fields
 * @param {object} formState  - { values, files, previews, setField, setFile }
 * @param {object} editItem   - Current item being edited (provides existing image URLs)
 * @param {object} extraData  - Extra Redux data (e.g. { categories: [...] })
 */
const FieldRenderer = ({ field, formState, editItem, extraData = {} }) => {
  const { values, files, previews, setField, setFile } = formState;

  switch (field.type) {

    // ── Image upload ──────────────────────────────────────────────────────────
    case 'image': {
      const preview    = previews[field.name];
      const existingUrl = editItem?.[field.name];

      return (
        <div className="flex flex-col gap-2">
          <span className={CLS.label}>{field.label}</span>
          {preview ? (
            <div className="relative rounded-xl overflow-hidden border border-[#2c2420]/20 bg-[#ede8e2] group">
              <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
              <button
                type="button"
                onClick={() => setFile(field.name, null)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-[#0d0b08]/70 text-[#f7f3ee] text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >✕</button>
              <div className="px-3 py-1.5 bg-[#ede8e2] border-t border-[#2c2420]/10">
                <p className="text-[10px] text-[#2c2420]/60 truncate">{files[field.name]?.name}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#2c2420]/30 bg-[#ede8e2] h-40 flex items-center justify-center">
              <DropZone
                onFile={(f) => setFile(field.name, f)}
                existingUrl={existingUrl}
                label={field.label}
              />
            </div>
          )}
        </div>
      );
    }

    // ── Text input ────────────────────────────────────────────────────────────
    case 'text': {
      const inputEl = (
        <input
          type="text"
          value={values[field.name] ?? ''}
          onChange={(e) => setField(field.name, e.target.value)}
          placeholder={field.placeholder}
          className={
            field.card
              ? 'outline-none bg-transparent text-sm font-medium text-[#0d0b08] placeholder:text-[#2c2420]/30 border-b border-[#2c2420]/15 pb-1 focus:border-[#2c2420] transition-colors w-full'
              : CLS.input
          }
        />
      );

      if (field.card) {
        return (
          <div className={CLS.card}>
            <label className={CLS.label}>
              {field.label}
              {field.optional && (
                <span className="normal-case font-normal text-[#2c2420]/30 ml-1">(optional)</span>
              )}
            </label>
            {field.hint && <span className={CLS.hint}>{field.hint}</span>}
            {inputEl}
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-1.5">
          <label className={CLS.label}>{field.label}</label>
          {inputEl}
        </div>
      );
    }

    case 'textarea': {
      return (
        <div className="flex flex-col gap-1.5">
          <label className={CLS.label}>{field.label}</label>
          <textarea
            value={values[field.name] ?? ''}
            onChange={(e) => setField(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 5}
            className={`${CLS.input} min-h-[120px] resize-y leading-relaxed`}
          />
          {field.hint && <span className={CLS.hint}>{field.hint}</span>}
        </div>
      );
    }

    // ── Number input (card layout) ────────────────────────────────────────────
    case 'number': {
      return (
        <div className="flex items-center gap-4 rounded-xl bg-[#ede8e2] border border-[#2c2420]/20 px-5 py-4">
          <div className="flex flex-col flex-1 gap-1">
            <label className={CLS.label}>{field.label}</label>
            {field.hint && <span className={CLS.hint}>{field.hint}</span>}
          </div>
          <input
            type="number"
            min={field.min ?? 0}
            value={values[field.name] ?? 0}
            onChange={(e) => setField(field.name, Number(e.target.value))}
            className={CLS.numInput}
          />
        </div>
      );
    }

    // ── Select / dropdown ─────────────────────────────────────────────────────
    case 'select': {
      // Options can come from extraData (dynamic) or field.options (static)
      const rawOptions = field.optionsKey
        ? (extraData[field.optionsKey] || [])
        : (field.options || []);

      const options = field.optionsKey
        ? rawOptions.map((o) => ({
            value: String(o[field.optionValue || 'id'] ?? o._id ?? ''),
            label: o[field.optionLabel || 'name'] ?? '',
          }))
        : rawOptions; // already { value, label }

      return (
        <div className={CLS.card}>
          <label className={CLS.label}>{field.label}</label>
          {field.hint && <span className={CLS.hint}>{field.hint}</span>}
          <select
            value={values[field.name] ?? ''}
            onChange={(e) => setField(field.name, e.target.value)}
            className="w-full outline-none rounded-lg px-3 py-2 text-sm font-semibold bg-[#f7f3ee] border border-[#2c2420]/25 text-[#0d0b08] focus:border-[#2c2420] transition-colors appearance-none cursor-pointer mt-1"
          >
            <option value="">— Select {field.label} —</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    }

    // ── Layout toggle (full / half buttons) ───────────────────────────────────
    case 'layout-toggle': {
      const opts = field.options || ['full', 'half'];
      return (
        <div className={CLS.card}>
          <label className={CLS.label}>{field.label}</label>
          {field.hint && <span className={CLS.hint}>{field.hint}</span>}
          <div className="flex gap-2 mt-1">
            {opts.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setField(field.name, opt)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all capitalize ${
                  values[field.name] === opt
                    ? 'bg-[#0d0b08] text-[#f7f3ee] border-[#0d0b08]'
                    : 'bg-[#f7f3ee] text-[#2c2420] border-[#2c2420]/25 hover:border-[#2c2420]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      );
    }

    case 'checkbox': {
      const checked = !!values[field.name];
      return (
        <label className={`${CLS.card} cursor-pointer`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className={CLS.label}>{field.label}</span>
              {field.hint && <span className={CLS.hint}>{field.hint}</span>}
            </div>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setField(field.name, e.target.checked)}
              className="sr-only peer"
            />
            <span className="relative inline-flex h-6 w-11 shrink-0 rounded-full bg-[#2c2420]/20 transition-colors duration-200 peer-checked:bg-[#0d0b08]">
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                  checked ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </span>
          </div>
        </label>
      );
    }

    // ── YouTube URL with inline thumbnail ─────────────────────────────────────
    case 'youtube': {
      const url  = values[field.name] ?? '';
      const ytId = getYoutubeId(url);
      const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;

      return (
        <div className="flex flex-col gap-2">
          <label className={CLS.label}>{field.label}</label>
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setField(field.name, e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 outline-none rounded-lg px-4 py-2.5 text-sm font-medium bg-[#ede8e2] border border-[#2c2420]/20 text-[#0d0b08] placeholder:text-[#2c2420]/30 focus:border-[#2c2420] transition-colors"
            />
            {thumb && (
              <img
                src={thumb}
                alt="Preview"
                className="w-28 h-[42px] object-cover rounded-lg border border-[#2c2420]/20 shrink-0"
              />
            )}
          </div>
          {url && !ytId && (
            <p className="text-[11px] text-red-500 flex items-center gap-1">⚠ Invalid YouTube URL</p>
          )}
        </div>
      );
    }

    default:
      return null;
  }
};

export default FieldRenderer;
