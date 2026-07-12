/**
 * Config for the Image Manager CRUD module.
 *
 * Usage:
 *   import CrudManager from '../crud/CrudManager';
 *   import { imageConfig } from '../configs/imageConfig';
 *   const ImageManager = () => <CrudManager config={imageConfig} />;
 */

import {
  getAllImages,
  uploadImage,
  updateImage,
  toggleImageSlideshow,
  toggleImageMobileSlideshow,
  deleteImageById,
  clearMessage,
  clearErrors,
} from '../../../actions/imageAction';
import { getAllCategories } from '../../../actions/categoryAction';

export const imageConfig = {
  // ── Display ──────────────────────────────────────────────────────────────
  name:      'Image',
  namePlural:'Images',
  subtitle:  'Manage gallery images',

  // ── Form fields ──────────────────────────────────────────────────────────
  fields: [
    // Image
    {
      name:     'image_desktop',
      label:    '🖥️ Desktop',
      type:     'image',
      required: true,
    },
    // Category + Layout – side-by-side
    {
      name:        'category_id',
      label:       'Category',
      type:        'select',
      hint:        'Assign image to a category.',
      optionsKey:  'categories',   // key in extraData provided by extraSelector
      optionLabel: 'name',
      optionValue: 'id',
      size:        'half',
    },
    {
      name:    'layout_type',
      label:   'Layout Type',
      type:    'layout-toggle',
      hint:    'Full-width or half-width display.',
      options: ['full', 'half'],
      default: 'full',
      size:    'half',
    },
    // Order
    {
      name:    'order_index',
      label:   'Order Index',
      type:    'number',
      hint:    'Lower = shown first in the list.',
      default: 0,
    },
    {
      name:    'show_in_slideshow',
      label:   'Show in desktop slideshow',
      type:    'checkbox',
      hint:    'Shows on computer and tablet hero slideshow.',
      default: false,
    },
    {
      name:    'show_in_mobile_slideshow',
      label:   'Show in mobile slideshow',
      type:    'checkbox',
      hint:    'Shows only on mobile hero slideshow.',
      default: false,
    },
  ],

  // ── Table columns ─────────────────────────────────────────────────────────
  columns: [
    { key: '_rowIndex',     label: 'ID',       type: 'index' },
    { key: 'image_desktop', label: 'Desktop',  type: 'image', imageName: 'desktop.jpg' },
    {
      key:    'category_id',
      label:  'Category',
      type:   'custom',
      render: (value, _item, extraData) => {
        const cats = extraData?.categories ?? [];
        const cat  = cats.find((c) => c.id === value || c._id === value);
        return (
          <span className="text-sm font-medium" style={{ color: '#0d0b08' }}>
            {cat?.name || '—'}
          </span>
        );
      },
    },
    { key: 'layout_type',  label: 'Layout', type: 'badge' },
    { key: 'order_index',  label: 'Order',  type: 'text'  },
    { key: 'show_in_slideshow', label: 'Desktop Slide', type: 'toggle' },
    { key: 'show_in_mobile_slideshow', label: 'Mobile Slide', type: 'toggle' },
  ],
  gridTemplate: '60px 110px 1fr 110px 80px 120px 120px 130px',

  // ── Redux ──────────────────────────────────s───────────────────────────────
  selectors: {
    list:   (s) => s.allImagesReducer   || {},
    action: (s) => s.imageActionReducer || {},
  },
  itemsKey: 'images',

  // Extra selector: inject categories into extraData for the select field + custom cell
  extraSelector: (s) => ({
    categories: s.categoriesReducer?.categories ?? [],
  }),
  extraFetch: [getAllCategories],

  actions: {
    fetch:        getAllImages,
    create:       uploadImage,
    update:       updateImage,
    delete:       deleteImageById,
    clearErrors,
    clearMessage,
  },
  toggleConfig: [
    {
      field: 'show_in_slideshow',
      action: toggleImageSlideshow,
      optimistic: true,
    },
    {
      field: 'show_in_mobile_slideshow',
      action: toggleImageMobileSlideshow,
      optimistic: true,
    },
  ],

  // ── Validation ────────────────────────────────────────────────────────────
  validate: (values, files, isEdit) => {
    if (!isEdit && !files.image_desktop) return 'Desktop image is required.';
    if (!values.category_id)             return 'Please select a category.';
    return null;
  },

  // ── Payload builder ───────────────────────────────────────────────────────
  buildPayload: (values, files) => {
    const fd = new FormData();
    if (files.image_desktop) fd.append('image_desktop', files.image_desktop);
    fd.append('category_id', values.category_id);
    fd.append('layout_type', values.layout_type ?? 'full');
    fd.append('order_index', values.order_index ?? 0);
    fd.append('show_in_slideshow', values.show_in_slideshow ? 1 : 0);
    fd.append('show_in_mobile_slideshow', values.show_in_mobile_slideshow ? 1 : 0);
    return fd;
  },

  // ── Delete label ──────────────────────────────────────────────────────────
  getItemLabel: (item) => `Image #${item?.id ?? item?._id ?? ''}`,
};
