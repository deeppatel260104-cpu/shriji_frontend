/**
 * Config for the Hero Banners CRUD module.
 *
 * Usage:
 *   import CrudManager from '../crud/CrudManager';
 *   import { heroConfig } from '../configs/heroConfig';
 *   const HeroSection = () => <CrudManager config={heroConfig} />;
 */

import {
  getHeroImages,
  uploadHeroImage,
  updateHeroImage,
  deleteHeroImage,
  toggleHeroStatus,
  clearErrors,
  clearMessage,
} from '../../../actions/heroAction';

export const heroConfig = {
  // ── Display ──────────────────────────────────────────────────────────────
  name:      'Hero Banner',
  namePlural:'Hero Section',
  subtitle:  'Manage homepage hero banners',

  // ── Form fields ──────────────────────────────────────────────────────────
  // mobile_image & desktop_image both have size:'half' → rendered side-by-side
  fields: [
    {
      name:     'mobile_image',
      label:    '📱 Mobile',
      type:     'image',
      size:     'half',
      required: false,
    },
    {
      name:     'desktop_image',
      label:    '🖥️ Desktop',
      type:     'image',
      size:     'half',
      required: false,
    },
   
  ],

  // ── Table columns ─────────────────────────────────────────────────────────
  columns: [
    { key: '_rowIndex',     label: 'ID',             type: 'index' },
    { key: 'mobile_image',  label: 'Mobile Image',   type: 'image', imageName: 'mobile.jpg'  },
    { key: 'desktop_image', label: 'Desktop Image',  type: 'image', imageName: 'desktop.jpg' },
    { key: 'is_active',     label: 'is_active',      type: 'toggle'},
  ],
  gridTemplate: '80px 2fr 2fr 120px 140px',

  // ── Redux ─────────────────────────────────────────────────────────────────
  selectors: {
    list:   (s) => s.heroReducer       || {},
    action: (s) => s.heroActionReducer || {},
  },
  itemsKey: 'heroes',

  actions: {
    fetch:        getHeroImages,
    create:       uploadHeroImage,
    update:       updateHeroImage,
    delete:       deleteHeroImage,
    clearErrors,
    clearMessage,
  },

  // ── Toggle (is_active) ────────────────────────────────────────────────────
  toggleConfig: {
    field:  'is_active',
    action: toggleHeroStatus,
  },

  // ── Validation ────────────────────────────────────────────────────────────
  validate: (values, files, isEdit) => {
    if (!isEdit && !files.mobile_image && !files.desktop_image) {
      return 'Please upload at least one image.';
    }
    return null;
  },

  // ── Payload builder ───────────────────────────────────────────────────────
  buildPayload: (values, files) => {
    const fd = new FormData();
    if (files.mobile_image)  fd.append('mobile_image',  files.mobile_image);
    if (files.desktop_image) fd.append('desktop_image', files.desktop_image);
    return fd;
  },

  // ── Delete label ──────────────────────────────────────────────────────────
getItemLabel: (item) => `Banner #${item?.id ?? item?._id ?? ''}`,

};
