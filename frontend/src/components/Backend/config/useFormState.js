import { useState } from 'react';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getDefaultValue = (field) => {
  if (field.default !== undefined) return field.default;
  switch (field.type) {
    case 'number':        return 0;
    case 'layout-toggle': return field.options?.[0] ?? 'full';
    case 'checkbox':      return false;
    case 'image':         return null; // managed via files state
    default:              return '';
  }
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
/**
 * Manages form values, file uploads, and previews for dynamic field configs.
 *
 * @param {Array} fields - Field config array from a CrudConfig object
 * @returns {{ values, files, previews, setField, setFile, reset, populate }}
 */
export const useFormState = (fields = []) => {
  const buildDefaults = (overrides = {}) => {
    const vals = {};
    fields.forEach((f) => {
      if (f.type !== 'image') {
        vals[f.name] = overrides[f.name] ?? getDefaultValue(f);
      }
    });
    return vals;
  };

  const [values, setValues]     = useState(() => buildDefaults());
  const [files, setFilesMap]    = useState({});
  const [previews, setPreviewsMap] = useState({});

  /**
   * Update a single field value.
   * Also auto-derives any dependent fields (derivedFrom / deriveValue).
   */
  const setField = (name, value) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-derive related fields (e.g. slug from name)
      fields.forEach((f) => {
        if (f.derivedFrom === name && typeof f.deriveValue === 'function') {
          next[f.name] = f.deriveValue(value);
        }
      });
      return next;
    });
  };

  /**
   * Set a file for an image field and create an object-URL preview.
   * Pass null to clear.
   */
  const setFile = (name, file) => {
    setFilesMap((prev) => ({ ...prev, [name]: file || null }));
    setPreviewsMap((prev) => ({
      ...prev,
      [name]: file ? URL.createObjectURL(file) : null,
    }));
  };

  /**
   * Reset form to default values (with optional overrides).
   */
  const reset = (overrides = {}) => {
    setValues(buildDefaults(overrides));
    setFilesMap({});
    setPreviewsMap({});
  };

  /**
   * Populate form from an existing item (for Edit mode).
   * Image files are cleared – the existing URL is read from the item by
   * FieldRenderer at render time.
   */
  const populate = (item) => {
    const vals = {};
    fields.forEach((f) => {
      if (f.type !== 'image') {
        const raw = item[f.populateKey ?? f.name] ?? getDefaultValue(f);
        // Selects need string values to match <option value="…">
        vals[f.name] = f.type === 'select' ? String(raw ?? '') : raw;
        if (f.type === 'checkbox') vals[f.name] = raw === true || raw === 1 || raw === '1';
      }
    });
    setValues(vals);
    setFilesMap({});
    setPreviewsMap({});
  };

  return { values, files, previews, setField, setFile, reset, populate };
};
