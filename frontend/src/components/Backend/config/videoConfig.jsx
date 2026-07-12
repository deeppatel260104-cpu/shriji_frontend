/**
 * Config for the Video Manager CRUD module.
 *
 * Usage:
 *   import CrudManager from '../crud/CrudManager';
 *   import { videoConfig } from '../configs/videoConfig';
 *   const VideoManager = () => <CrudManager config={videoConfig} />;
 */

import {
  getAllVideos,
  getVideosByCategory,
  uploadVideo,
  updateVideo,
  deleteVideo,
  clearErrors,
  clearMessage,
} from '../../../actions/videoAction';
import { getAllCategories } from '../../../actions/categoryAction';

export const videoConfig = {
  // ── Display ──────────────────────────────────────────────────────────────
  name:      'Video',
  namePlural:'Videos',
  subtitle:  'Manage category videos',

  // ── Form fields ──────────────────────────────────────────────────────────
  fields: [
    {
      name:  'youtube_url',
      label: '🎬 YouTube URL',
      type:  'youtube',
    },
    {
      name:        'title',
      label:       'Title',
      type:        'text',
      card:        true,            // renders inside a card
      optional:    true,
      placeholder: 'Enter video title…',
    },
    {
      name:        'category_id',
      label:       'Category',
      type:        'select',
      hint:        'Assign this video to a category.',
      optionsKey:  'categories',
      optionLabel: 'name',
      optionValue: 'id',
    },
  ],

  // ── Table columns ─────────────────────────────────────────────────────────
  columns: [
    { key: '_rowIndex',   label: '#',         type: 'index' },
    { key: 'youtube_url', label: 'Thumbnail', type: 'youtube-thumb' },
    { key: 'title',       label: 'Title',     type: 'text' },
    {
      key:    'category_id',
      label:  'Category',
      type:   'custom',
      render: (value, _item, extraData) => {
        const cats = extraData?.categories ?? [];
        const cat  = cats.find((c) => c.id === value || c._id === value);
        return (
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase"
            style={{
              backgroundColor: 'rgba(44,36,32,0.1)',
              border: '1px solid rgba(44,36,32,0.15)',
              color: '#2c2420',
            }}
          >
            {cat?.name || '—'}
          </span>
        );
      },
    },
    { key: 'youtube_url', label: 'YouTube URL', type: 'youtube-link' },
  ],
  gridTemplate: '50px 110px 1fr 150px 1fr 130px',

  // ── Redux ─────────────────────────────────────────────────────────────────
  selectors: {
    list:   (s) => s.allVideosReducer    || {},
    action: (s) => s.videoActionReducer  || {},
  },
  itemsKey: 'videos',

  extraSelector: (s) => ({
    categories: s.categoriesReducer?.categories ?? [],
  }),
  extraFetch: [getAllCategories],

  actions: {
    fetch:        getAllVideos,
    create:       uploadVideo,
    update:       updateVideo,
    delete:       deleteVideo,
    clearErrors,
    clearMessage,
  },

  // ── Header filter (by category) ───────────────────────────────────────────
  filterConfig: {
    label:        'Categories',
    optionsKey:   'categories',   // key in extraData
    optionLabel:  'name',
    onFilter: (value, dispatch) => {
      if (value) dispatch(getVideosByCategory(value));
      else       dispatch(getAllVideos());
    },
  },

  // ── Validation ────────────────────────────────────────────────────────────
  validate: (values /*, files, isEdit */) => {
    if (!values.youtube_url?.trim()) return 'YouTube URL is required.';
    if (!values.category_id)         return 'Please select a category.';
    return null;
  },

  // ── Payload builder (plain JSON — no FormData needed for videos) ──────────
  buildPayload: (values /*, files */) => ({
    youtube_url: values.youtube_url?.trim(),
    title:       values.title?.trim() || null,
    category_id: values.category_id,
  }),

  // ── Delete label ──────────────────────────────────────────────────────────
  getItemLabel: (item) => item?.title || `Video #${item?.id ?? ''}`,
};
