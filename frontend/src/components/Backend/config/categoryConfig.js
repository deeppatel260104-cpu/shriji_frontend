/**
 * Config for the Categories CRUD module.
 *
 * Usage:
 *   import CrudManager from '../crud/CrudManager';
 *   import { categoryConfig } from '../configs/categoryConfig';
 *   const Category = () => <CrudManager config={categoryConfig} />;
 */

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategoryById,
  clearErrors,    // ✅ category action ma thi
  clearMessage,  
} from '../../../actions/categoryAction';
// Note: clearErrors / clearMessage are shared from heroAction in the original code

export const categoryConfig = {
  // ── Display ──────────────────────────────────────────────────────────────
  name:      'Category',
  namePlural:'Categories',
  subtitle:  'Manage product categories',

  // ── Form fields ──────────────────────────────────────────────────────────
  fields: [
    {
      name:  'thumbnail_image',
      label: 'Category Image',
      type:  'image',
      // Not required – category can exist without a thumbnail
    },
    {
      name:        'name',
      label:       'Name',
      type:        'text',
      placeholder: 'e.g. Electronics',
      required:    true,
    },
    {
      name:        'slug',
      label:       'Slug',
      type:        'text',
      placeholder: 'e.g. electronics',
      // Auto-derived from 'name'
      derivedFrom: 'name',
      deriveValue: (v) =>
        v.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    },
    {
      name:    'order_index',
      label:   'Order Index',
      type:    'number',
      hint:    'Lower = shown first.',
      default: 0,
    },
    {
      name:        'pinterest_link',
      label:       'Pinterest Link',
      type:        'text',
      placeholder: 'https://in.pinterest.com/shrijistudio99/...',
    },
  ],

  // ── Table columns ─────────────────────────────────────────────────────────
  // gridTemplate must account for ALL columns including the trailing Actions slot
  columns: [
    { key: '_rowIndex',        label: 'ID',    type: 'index' },
    { key: 'thumbnail_image',  label: 'Image', type: 'image', imageName: 'image.jpg' },
    { key: 'name',             label: 'Name',  type: 'text'  },
    { key: 'slug',             label: 'Slug',  type: 'mono'  },
    { key: 'order_index',      label: 'Order', type: 'text'  },
    { key: 'pinterest_link',   label: 'Pinterest', type: 'text'  },
  ],
  gridTemplate: '60px 80px 1fr 1fr 100px 1.2fr 130px',

  // ── Redux ─────────────────────────────────────────────────────────────────
  selectors: {
    list:   (s) => s.categoriesReducer      || {},
    action: (s) => s.categoryActionReducer  || {},
  },
  itemsKey: 'categories',

  actions: {
    fetch:        getAllCategories,
    create:       createCategory,
    update:       updateCategory,
    delete:       deleteCategoryById,
    clearErrors,
    clearMessage,
  },

  // ── Validation ────────────────────────────────────────────────────────────
  validate: (values /*, files, isEdit */) => {
    if (!values.name?.trim()) return 'Category name is required.';
    return null;
  },

  // ── Payload builder ───────────────────────────────────────────────────────
  buildPayload: (values, files) => {
    const fd = new FormData();
    if (files.thumbnail_image) fd.append('thumbnail_image', files.thumbnail_image);
    fd.append('name',        values.name);
    fd.append('slug',        values.slug        ?? '');
    fd.append('order_index', values.order_index ?? 0);
    fd.append('pinterest_link', values.pinterest_link ?? '');
    return fd;
  },

  // ── Delete label ──────────────────────────────────────────────────────────
  getItemLabel: (item) => item?.name || 'this category',
};
