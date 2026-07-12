import {
  getAllAddOnPackages,
  createAddOnPackage,
  updateAddOnPackage,
  deleteAddOnPackageById,
  clearErrors,
  clearMessage,
} from '../../../actions/addOnPackageAction';

export const addOnPackageConfig = {
  name: 'Package Add-on',
  namePlural: 'Package Add-ons',
  subtitle: 'Manage package add-on names and prices',

  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'e.g. Pre-Wedding Shoot',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      placeholder: 'e.g. Rs. 25,000',
      required: true,
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
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'price', label: 'Price', type: 'text' },
    { key: 'order_index', label: 'Order', type: 'text' },
  ],
  gridTemplate: '60px 1fr 180px 100px 130px',

  selectors: {
    list: (s) => s.addOnPackagesReducer || {},
    action: (s) => s.addOnPackageActionReducer || {},
  },
  itemsKey: 'addOns',

  actions: {
    fetch: getAllAddOnPackages,
    create: createAddOnPackage,
    update: updateAddOnPackage,
    delete: deleteAddOnPackageById,
    clearErrors,
    clearMessage,
  },

  validate: (values) => {
    if (!values.name?.trim()) return 'Add-on name is required.';
    if (!values.price?.trim()) return 'Add-on price is required.';
    return null;
  },

  buildPayload: (values) => ({
    name: values.name,
    price: values.price,
    order_index: values.order_index ?? 0,
  }),

  getItemLabel: (item) => item?.name || 'this add-on',
};
