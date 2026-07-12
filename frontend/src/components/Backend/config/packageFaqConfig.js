import {
  getAllPackageFaqs,
  createPackageFaq,
  updatePackageFaq,
  deletePackageFaqById,
  clearErrors,
  clearMessage,
} from '../../../actions/packageFaqAction';

export const packageFaqConfig = {
  name: 'Package FAQ',
  namePlural: 'Package FAQs',
  subtitle: 'Manage package page questions and answers',

  fields: [
    {
      name: 'question',
      label: 'Question',
      type: 'text',
      placeholder: 'e.g. What is the standard delivery timeline?',
      required: true,
    },
    {
      name: 'answer',
      label: 'Answer',
      type: 'textarea',
      placeholder: 'Write the answer shown on the packages page.',
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
    { key: 'question', label: 'Question', type: 'text' },
    { key: 'answer', label: 'Answer', type: 'text' },
    { key: 'order_index', label: 'Order', type: 'text' },
  ],
  gridTemplate: '60px 1.2fr 1.6fr 100px 130px',

  selectors: {
    list: (s) => s.packageFaqsReducer || {},
    action: (s) => s.packageFaqActionReducer || {},
  },
  itemsKey: 'faqs',

  actions: {
    fetch: getAllPackageFaqs,
    create: createPackageFaq,
    update: updatePackageFaq,
    delete: deletePackageFaqById,
    clearErrors,
    clearMessage,
  },

  validate: (values) => {
    if (!values.question?.trim()) return 'FAQ question is required.';
    if (!values.answer?.trim()) return 'FAQ answer is required.';
    return null;
  },

  buildPayload: (values) => ({
    question: values.question,
    answer: values.answer,
    order_index: values.order_index ?? 0,
  }),

  getItemLabel: (item) => item?.question || 'this FAQ',
};
