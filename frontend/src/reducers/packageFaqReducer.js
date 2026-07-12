import {
    GET_PACKAGE_FAQS_REQUEST, GET_PACKAGE_FAQS_SUCCESS, GET_PACKAGE_FAQS_FAIL,
    GET_PACKAGE_FAQ_DETAIL_REQUEST, GET_PACKAGE_FAQ_DETAIL_SUCCESS, GET_PACKAGE_FAQ_DETAIL_FAIL,
    CREATE_PACKAGE_FAQ_REQUEST, CREATE_PACKAGE_FAQ_SUCCESS, CREATE_PACKAGE_FAQ_FAIL,
    UPDATE_PACKAGE_FAQ_REQUEST, UPDATE_PACKAGE_FAQ_SUCCESS, UPDATE_PACKAGE_FAQ_FAIL,
    DELETE_PACKAGE_FAQ_REQUEST, DELETE_PACKAGE_FAQ_SUCCESS, DELETE_PACKAGE_FAQ_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/packageFaqConstant";

const initialPackageFaqsState = {
    loading: false,
    faqs: [],
    error: null,
};

export const packageFaqsReducer = (state = initialPackageFaqsState, action) => {
    switch (action.type) {
        case GET_PACKAGE_FAQS_REQUEST:
            return { ...state, loading: true };

        case GET_PACKAGE_FAQS_SUCCESS:
            return { ...state, loading: false, faqs: action.payload, error: null };

        case GET_PACKAGE_FAQS_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

const initialPackageFaqDetailState = {
    loading: false,
    faq: null,
    error: null,
};

export const packageFaqDetailReducer = (state = initialPackageFaqDetailState, action) => {
    switch (action.type) {
        case GET_PACKAGE_FAQ_DETAIL_REQUEST:
            return { ...state, loading: true };

        case GET_PACKAGE_FAQ_DETAIL_SUCCESS:
            return { ...state, loading: false, faq: action.payload, error: null };

        case GET_PACKAGE_FAQ_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

const initialPackageFaqActionState = {
    loading: false,
    success: false,
    message: null,
    error: null,
};

export const packageFaqActionReducer = (state = initialPackageFaqActionState, action) => {
    switch (action.type) {
        case CREATE_PACKAGE_FAQ_REQUEST:
        case UPDATE_PACKAGE_FAQ_REQUEST:
        case DELETE_PACKAGE_FAQ_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        case CREATE_PACKAGE_FAQ_SUCCESS:
        case UPDATE_PACKAGE_FAQ_SUCCESS:
        case DELETE_PACKAGE_FAQ_SUCCESS:
            return { ...state, loading: false, success: true, message: action.payload, error: null };

        case CREATE_PACKAGE_FAQ_FAIL:
        case UPDATE_PACKAGE_FAQ_FAIL:
        case DELETE_PACKAGE_FAQ_FAIL:
            return { ...state, loading: false, success: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        case CLEAR_MESSAGE:
            return { ...state, message: null, success: false };

        default:
            return state;
    }
};
