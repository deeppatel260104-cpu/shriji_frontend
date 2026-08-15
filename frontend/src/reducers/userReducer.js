import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/userConstant";

// ─── AUTH REDUCER (login / logout / loadUser) ─────────────────────────────────
const initialAuthState = {
    loading    : false,
    authChecked: false,
    isAuthenticated: false,
    user       : null,
    error      : null,
};

export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
            return { ...state, loading: true, isAuthenticated: false };

        case LOAD_USER_REQUEST:
            return { ...state, loading:true};

        // ── Success ──────────────────────────────────────────────────────────
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading        : false,
                authChecked: true,
                isAuthenticated: true,
                user           : action.payload,
                error          : null,
            };

        // ── Logout ───────────────────────────────────────────────────────────
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading        : false,
                authChecked: true,
                isAuthenticated: false,
                user           : null,
                error          : null,
            };

        // ── Failures ─────────────────────────────────────────────────────────
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading        : false,
                authChecked: true,
                isAuthenticated: false,
                user           : null,
                error          : action.payload,
            };

        case LOGOUT_FAIL:
            return { ...state, loading: false, error: action.payload };

        // ── Clear Error ───────────────────────────────────────────────────────
        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

// ─── FORGOT / RESET PASSWORD REDUCER ─────────────────────────────────────────
const initialPasswordState = {
    loading : false,
    message : null,
    success : false,
    error   : null,
};

export const passwordReducer = (state = initialPasswordState, action) => {
    switch (action.type) {

        // ── Pending ──────────────────────────────────────────────────────────
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        // ── Success ──────────────────────────────────────────────────────────
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                message : action.payload,
                error   : null,
            };

        // ── Failures ─────────────────────────────────────────────────────────
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading : false,
                success : false,
                error   : action.payload,
            };

        // ── Clear Errors / Messages ───────────────────────────────────────────
        case CLEAR_ERRORS:
            return { ...state, error: null };

        case CLEAR_MESSAGE:
            return { ...state, message: null, success: false };

        default:
            return state;
    }
};