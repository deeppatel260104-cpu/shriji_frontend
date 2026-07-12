import API from "../services/api";
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/userConstant";

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await API.post(
            "/auth/login",
            { email, password },
            { withCredentials: true }
        );  

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── LOGOUT ───────────────────────────────────────────────────────────────────
export const logout = () => async (dispatch) => {
    try {
        await API.post("/auth/logout", { withCredentials: true });
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── GET CURRENT USER (getMe) ─────────────────────────────────────────────────
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await API.get("/auth/me", { withCredentials: true });

        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const { data } = await API.post(
            "/auth/forgot-password",
            { email },
            { headers: { "Content-Type": "application/json" } }
        );

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response?.data?.message || error.response?.data?.error || error.message,
        });
    }
};

// ─── RESET PASSWORD ───────────────────────────────────────────────────────────
export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const { data } = await API.post(
            `/auth/reset-password/${token}`,
            { password },
            { headers: { "Content-Type": "application/json" } }
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response?.data?.message || error.response?.data?.error || error.message,
        });
    }
};

// ─── CLEAR ERRORS & MESSAGES ──────────────────────────────────────────────────
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });
