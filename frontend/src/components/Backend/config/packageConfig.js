import {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackageById,
  clearErrors,
  clearMessage,
} from '../../../actions/packageAction';

export const packageConfig = {
  name: 'Package',
  namePlural: 'Packages',
  subtitle: 'Manage package cards, pricing and features',

  fields: [
    {
      name: 'tier',
      label: 'Tier',
      type: 'text',
      placeholder: 'e.g. Standard',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      placeholder: 'e.g. 49,999',
      required: true,
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'text',
      placeholder: 'e.g. Best value · Most chosen',
    },
    {
      name: 'badge',
      label: 'Badge',
      type: 'text',
      placeholder: 'e.g. MOST POPULAR',
    },
    {
      name: 'features',
      label: 'Features',
      type: 'textarea',
      placeholder: 'Enter one feature per line',
      required: true,
      rows: 7,
    },
    {
      name: 'cta',
      label: 'Button Text',
      type: 'text',
      placeholder: 'e.g. Book Standard',
    },
    {
      name: 'highlight',
      label: 'Highlight Package',
      type: 'select',
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Yes' },
      ],
      default: '0',
    },
    {
      name: 'order_index',
      label: 'Order Index',
      type: 'number',
      hint: 'Lower = shown first.',
      default: 0,
    },
  ],

  columns: [
    { key: '_rowIndex', label: 'ID', type: 'index' },
    { key: 'tier', label: 'Tier', type: 'text' },
    { key: 'price', label: 'Price', type: 'text' },
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'highlight', label: 'Highlight', type: 'text' },
    { key: 'order_index', label: 'Order', type: 'text' },
  ],
  gridTemplate: '60px 1fr 140px 160px 120px 100px 130px',

  selectors: {
    list: (s) => s.packagesReducer || {},
    action: (s) => s.packageActionReducer || {},
  },
  itemsKey: 'packages',

  actions: {
    fetch: getAllPackages,
    create: createPackage,
    update: updatePackage,
    delete: deletePackageById,
    clearErrors,
    clearMessage,
  },

  validate: (values) => {
    if (!values.tier?.trim()) return 'Package tier is required.';
    if (!values.price?.trim()) return 'Package price is required.';
    if (!values.features?.trim()) return 'Package features are required.';
    return null;
  },

  buildPayload: (values) => ({
    tier: values.tier,
    price: values.price,
    tagline: values.tagline ?? '',
    badge: values.badge ?? '',
    features: values.features,
    cta: values.cta ?? '',
    highlight: values.highlight ?? 0,
    order_index: values.order_index ?? 0,
  }),

  getItemLabel: (item) => item?.tier || 'this package',
};
