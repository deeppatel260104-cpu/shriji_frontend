import API from "../services/api";
import {
    GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAIL,
    GET_CATEGORY_DETAIL_REQUEST, GET_CATEGORY_DETAIL_SUCCESS, GET_CATEGORY_DETAIL_FAIL,
    CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/categoryConstant";

// ─── GET ALL CATEGORIES ───────────────────────────────────────────────────────
export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CATEGORIES_REQUEST });

        const { data } = await API.get("/categories/");
        console.log("datacat", data);
        dispatch({ type: GET_CATEGORIES_SUCCESS, 
            payload: Array.isArray(data?.data) ? data.data : []
         });
    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── GET CATEGORY BY ID ───────────────────────────────────────────────────────
export const getCategoryById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_CATEGORY_DETAIL_REQUEST });

        const { data } = await API.get(`/categories/${id}`);

        dispatch({ type: GET_CATEGORY_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_CATEGORY_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── CREATE CATEGORY ──────────────────────────────────────────────────────────
export const createCategory = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST });

        const { data } = await API.post("/categories", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── UPDATE CATEGORY ──────────────────────────────────────────────────────────
export const updateCategory = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });

        const { data } = await API.put(`/categories/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── DELETE CATEGORY ──────────────────────────────────────────────────────────
export const deleteCategoryById = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { data } = await API.delete(`/categories/${id}`);

        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── CLEAR ERRORS & MESSAGES ──────────────────────────────────────────────────
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });