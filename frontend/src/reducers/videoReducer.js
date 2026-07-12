import {
        GET_ALL_VIDEOS_REQUEST, GET_ALL_VIDEOS_SUCCESS, GET_ALL_VIDEOS_FAIL,

    GET_VIDEOS_BY_CATEGORY_REQUEST, GET_VIDEOS_BY_CATEGORY_SUCCESS, GET_VIDEOS_BY_CATEGORY_FAIL,
    UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS, UPLOAD_VIDEO_FAIL,
    UPDATE_VIDEO_REQUEST, UPDATE_VIDEO_SUCCESS, UPDATE_VIDEO_FAIL,
    DELETE_VIDEO_REQUEST, DELETE_VIDEO_SUCCESS, DELETE_VIDEO_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/videoConstant";

// ─── ALL VIDEOS REDUCER ───────────────────────────────────────────────────────
const initialAllVideosState = {
    loading: false,
    videos: [],
    error: null,
};

export const allVideosReducer = (state = initialAllVideosState, action) => {
    switch (action.type) {

        case GET_ALL_VIDEOS_REQUEST:
            return { ...state, loading: true };

        case GET_ALL_VIDEOS_SUCCESS:
            return { ...state, loading: false, videos: action.payload, error: null };

        case GET_ALL_VIDEOS_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

// ─── VIDEOS BY CATEGORY REDUCER ───────────────────────────────────────────────
const initialVideosByCategoryState = {
    loading: false,
    videos: [],
    error: null,
};

export const videosByCategoryReducer = (state = initialVideosByCategoryState, action) => {
    switch (action.type) {

        case GET_VIDEOS_BY_CATEGORY_REQUEST:
            return { ...state, loading: true };

        case GET_VIDEOS_BY_CATEGORY_SUCCESS:
            return { ...state, loading: false, videos: action.payload, error: null };

        case GET_VIDEOS_BY_CATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};




// ─── VIDEO ACTION REDUCER (upload / update / delete) ──────────────────────────
const initialVideoActionState = {
    loading: false,
    success: false,
    message: null,
    error: null,
};

export const videoActionReducer = (state = initialVideoActionState, action) => {
    switch (action.type) {

        // ── Pending ──────────────────────────────────────────────────────────
        case UPLOAD_VIDEO_REQUEST:
        case UPDATE_VIDEO_REQUEST:
        case DELETE_VIDEO_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        // ── Success ──────────────────────────────────────────────────────────
        case UPLOAD_VIDEO_SUCCESS:
        case UPDATE_VIDEO_SUCCESS:
        case DELETE_VIDEO_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
                error: null,
            };

        // ── Failures ─────────────────────────────────────────────────────────
        case UPLOAD_VIDEO_FAIL:
        case UPDATE_VIDEO_FAIL:
        case DELETE_VIDEO_FAIL:
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