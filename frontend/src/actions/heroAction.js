import API from "../services/api";
import {
    GET_HERO_REQUEST, GET_HERO_SUCCESS, GET_HERO_FAIL,
    UPLOAD_HERO_REQUEST, UPLOAD_HERO_SUCCESS, UPLOAD_HERO_FAIL,
    UPDATE_HERO_REQUEST, UPDATE_HERO_SUCCESS, UPDATE_HERO_FAIL,
    TOGGLE_HERO_REQUEST, TOGGLE_HERO_SUCCESS, TOGGLE_HERO_FAIL,
    DELETE_HERO_REQUEST, DELETE_HERO_SUCCESS, DELETE_HERO_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/heroConstant";

// ─── GET HERO IMAGES ──────────────────────────────────────────────────────────
export const getHeroImages = () => async (dispatch) => {
    try {
        dispatch({ type: GET_HERO_REQUEST });

        const { data } = await API.get("/hero/");

        dispatch({ type: GET_HERO_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_HERO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── UPLOAD HERO IMAGE ────────────────────────────────────────────────────────
export const uploadHeroImage = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_HERO_REQUEST });

        const { data } = await API.post("/hero", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch({ type: UPLOAD_HERO_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPLOAD_HERO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── UPDATE HERO IMAGE ────────────────────────────────────────────────────────
export const updateHeroImage = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_HERO_REQUEST });

        const { data } = await API.put(`/hero/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch({ type: UPDATE_HERO_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPDATE_HERO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── TOGGLE HERO STATUS ───────────────────────────────────────────────────────
export const toggleHeroStatus = (id) => async (dispatch) => {
    try {
        dispatch({ type: TOGGLE_HERO_REQUEST });

        const { data } = await API.patch(`/hero/${id}/status`);

        dispatch({ type: TOGGLE_HERO_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TOGGLE_HERO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── DELETE HERO IMAGE ────────────────────────────────────────────────────────
export const deleteHeroImage = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_HERO_REQUEST });

        const { data } = await API.delete(`/hero/${id}`);

        dispatch({ type: DELETE_HERO_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: DELETE_HERO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── CLEAR ERRORS & MESSAGES ──────────────────────────────────────────────────
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });