import {
    GET_ALL_IMAGES_REQUEST, GET_ALL_IMAGES_SUCCESS, GET_ALL_IMAGES_FAIL,

    GET_IMAGES_BY_CATEGORY_REQUEST, GET_IMAGES_BY_CATEGORY_SUCCESS, GET_IMAGES_BY_CATEGORY_FAIL,
    UPDATE_IMAGE_REQUEST, UPDATE_IMAGE_SUCCESS, UPDATE_IMAGE_FAIL, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAIL,
    UPDATE_IMAGE_LAYOUT_REQUEST, UPDATE_IMAGE_LAYOUT_SUCCESS, UPDATE_IMAGE_LAYOUT_FAIL,
    REORDER_IMAGES_REQUEST, REORDER_IMAGES_SUCCESS, REORDER_IMAGES_FAIL,
    DELETE_IMAGE_REQUEST, DELETE_IMAGE_SUCCESS, DELETE_IMAGE_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/imageConstant";



// ─── ALL IMAGES REDUCER ───────────────────────────────────────────────────────
const initialAllImagesState = {
    loadingByCategory: {},
    imagesByCategory: {},
    error: null,
};

export const allImagesReducer = (state = initialAllImagesState, action) => {
    switch (action.type) {

        case GET_ALL_IMAGES_REQUEST:
            return { ...state, loading: true };

        case GET_ALL_IMAGES_SUCCESS:
            return { ...state, loading: false, images: action.payload, error: null };

        case GET_ALL_IMAGES_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

// ─── IMAGES LIST REDUCER (getByCategory) ──────────────────────────────────────
const initialImagesState = {
    loading: false,
    images: [],
    error: null,
};

export const imagesReducer = (state = initialImagesState, action) => {
    switch (action.type) {

        case GET_IMAGES_BY_CATEGORY_REQUEST:
            return { ...state, loading: true };

        case GET_IMAGES_BY_CATEGORY_SUCCESS:
            return { ...state, loading: false, images: action.payload, error: null };

        case GET_IMAGES_BY_CATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

// ─── IMAGE ACTION REDUCER (upload / update / reorder / delete) ─────────────────
const initialImageActionState = {
    loading: false,
    success: false,
    message: null,
    error: null,
};

export const imageActionReducer = (state = initialImageActionState, action) => {
    switch (action.type) {

        // ── Pending ──────────────────────────────────────────────────────────
        case UPLOAD_IMAGE_REQUEST:
        case UPDATE_IMAGE_REQUEST:
        case UPDATE_IMAGE_LAYOUT_REQUEST:
        case REORDER_IMAGES_REQUEST:
        case DELETE_IMAGE_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        // ── Success ──────────────────────────────────────────────────────────
        case UPLOAD_IMAGE_SUCCESS:
        case UPDATE_IMAGE_SUCCESS:
        case UPDATE_IMAGE_LAYOUT_SUCCESS:
        case REORDER_IMAGES_SUCCESS:
        case DELETE_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
                error: null,
            };

        // ── Failures ─────────────────────────────────────────────────────────
        case UPLOAD_IMAGE_FAIL:
        case UPDATE_IMAGE_FAIL:
        case UPDATE_IMAGE_LAYOUT_FAIL:
        case REORDER_IMAGES_FAIL:
        case DELETE_IMAGE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
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