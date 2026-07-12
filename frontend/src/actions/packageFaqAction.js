import API from "../services/api";
import {
    GET_PACKAGE_FAQS_REQUEST, GET_PACKAGE_FAQS_SUCCESS, GET_PACKAGE_FAQS_FAIL,
    GET_PACKAGE_FAQ_DETAIL_REQUEST, GET_PACKAGE_FAQ_DETAIL_SUCCESS, GET_PACKAGE_FAQ_DETAIL_FAIL,
    CREATE_PACKAGE_FAQ_REQUEST, CREATE_PACKAGE_FAQ_SUCCESS, CREATE_PACKAGE_FAQ_FAIL,
    UPDATE_PACKAGE_FAQ_REQUEST, UPDATE_PACKAGE_FAQ_SUCCESS, UPDATE_PACKAGE_FAQ_FAIL,
    DELETE_PACKAGE_FAQ_REQUEST, DELETE_PACKAGE_FAQ_SUCCESS, DELETE_PACKAGE_FAQ_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/packageFaqConstant";

export const getAllPackageFaqs = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PACKAGE_FAQS_REQUEST });

        const { data } = await API.get("/package-faqs/");

        dispatch({ type: GET_PACKAGE_FAQS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_PACKAGE_FAQS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getPackageFaqById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PACKAGE_FAQ_DETAIL_REQUEST });

        const { data } = await API.get(`/package-faqs/${id}`);

        dispatch({ type: GET_PACKAGE_FAQ_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_PACKAGE_FAQ_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createPackageFaq = (payload) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PACKAGE_FAQ_REQUEST });

        const { data } = await API.post("/package-faqs", payload);

        dispatch({ type: CREATE_PACKAGE_FAQ_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: CREATE_PACKAGE_FAQ_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updatePackageFaq = (id, payload) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PACKAGE_FAQ_REQUEST });

        const { data } = await API.put(`/package-faqs/${id}`, payload);

        dispatch({ type: UPDATE_PACKAGE_FAQ_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPDATE_PACKAGE_FAQ_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const deletePackageFaqById = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PACKAGE_FAQ_REQUEST });

        const { data } = await API.delete(`/package-faqs/${id}`);

        dispatch({ type: DELETE_PACKAGE_FAQ_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: DELETE_PACKAGE_FAQ_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });
