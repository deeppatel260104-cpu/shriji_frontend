import {
    GET_HERO_REQUEST, GET_HERO_SUCCESS, GET_HERO_FAIL,
    UPLOAD_HERO_REQUEST, UPLOAD_HERO_SUCCESS, UPLOAD_HERO_FAIL,
    UPDATE_HERO_REQUEST, UPDATE_HERO_SUCCESS, UPDATE_HERO_FAIL,
    TOGGLE_HERO_REQUEST, TOGGLE_HERO_SUCCESS, TOGGLE_HERO_FAIL,
    DELETE_HERO_REQUEST, DELETE_HERO_SUCCESS, DELETE_HERO_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/heroConstant";

// ─── HERO LIST REDUCER (get) ──────────────────────────────────────────────────
const initialHeroState = {
    loading : false,
    heroes  : [],
    error   : null,
};

export const heroReducer = (state = initialHeroState, action) => {
    switch (action.type) {

        case GET_HERO_REQUEST:
            return { ...state, loading: true };

        case GET_HERO_SUCCESS:
            return { ...state, loading: false, heroes: action.payload, error: null };

        case GET_HERO_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

// ─── HERO ACTION REDUCER (upload / update / toggle / delete) ──────────────────
const initialHeroActionState = {
    loading : false,
    success : false,
    message : null,
    error   : null,
};

export const heroActionReducer = (state = initialHeroActionState, action) => {
    switch (action.type) {

        // ── Pending ──────────────────────────────────────────────────────────
        case UPLOAD_HERO_REQUEST:
        case UPDATE_HERO_REQUEST:
        case TOGGLE_HERO_REQUEST:
        case DELETE_HERO_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        // ── Success ──────────────────────────────────────────────────────────
        case UPLOAD_HERO_SUCCESS:
        case UPDATE_HERO_SUCCESS:
        case TOGGLE_HERO_SUCCESS:
        case DELETE_HERO_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                message : action.payload,
                error   : null,
            };

        // ── Failures ─────────────────────────────────────────────────────────
        case UPLOAD_HERO_FAIL:
        case UPDATE_HERO_FAIL:
        case TOGGLE_HERO_FAIL:
        case DELETE_HERO_FAIL:
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