import {
    GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAIL,
    GET_CATEGORY_DETAIL_REQUEST, GET_CATEGORY_DETAIL_SUCCESS, GET_CATEGORY_DETAIL_FAIL,
    CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/categoryConstant";

// ─── CATEGORIES LIST REDUCER (getAll) ────────────────────────────────────────
const initialCategoriesState = {
    loading    : false,
    categories : [],
    error      : null,
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
    switch (action.type) {

        case GET_CATEGORIES_REQUEST:
            return { ...state, loading: true };

        case GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload, error: null };

        case GET_CATEGORIES_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

// ─── CATEGORY DETAIL REDUCER (getById) ───────────────────────────────────────
const initialCategoryDetailState = {
    loading  : false,
    category : null,
    error    : null,
};

export const categoryDetailReducer = (state = initialCategoryDetailState, action) => {
    switch (action.type) {

        case GET_CATEGORY_DETAIL_REQUEST:
            return { ...state, loading: true };

        case GET_CATEGORY_DETAIL_SUCCESS:
            return { ...state, loading: false, category: action.payload, error: null };

        case GET_CATEGORY_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

// ─── CATEGORY ACTION REDUCER (create / update / delete) ──────────────────────
const initialCategoryActionState = {
    loading : false,
    success : false,
    message : null,
    error   : null,
};

export const categoryActionReducer = (state = initialCategoryActionState, action) => {
    switch (action.type) {

        // ── Pending ──────────────────────────────────────────────────────────
        case CREATE_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        // ── Success ──────────────────────────────────────────────────────────
        case CREATE_CATEGORY_SUCCESS:
        case UPDATE_CATEGORY_SUCCESS:
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                message : action.payload,
                error   : null,
            };

        // ── Failures ─────────────────────────────────────────────────────────
        case CREATE_CATEGORY_FAIL:
        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading : false,
                success : false,
                error   : action.payload,
            };

        // ── Clear ─────────────────────────────────────────────────────────────
        case CLEAR_ERRORS:
            return { ...state, error: null };

        case CLEAR_MESSAGE:
            return { ...state, message: null, success: false };

        default:
            return state;
    }
};