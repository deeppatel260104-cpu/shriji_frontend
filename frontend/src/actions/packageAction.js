import API from "../services/api";
import {
    GET_PACKAGES_REQUEST, GET_PACKAGES_SUCCESS, GET_PACKAGES_FAIL,
    GET_PACKAGE_DETAIL_REQUEST, GET_PACKAGE_DETAIL_SUCCESS, GET_PACKAGE_DETAIL_FAIL,
    CREATE_PACKAGE_REQUEST, CREATE_PACKAGE_SUCCESS, CREATE_PACKAGE_FAIL,
    UPDATE_PACKAGE_REQUEST, UPDATE_PACKAGE_SUCCESS, UPDATE_PACKAGE_FAIL,
    DELETE_PACKAGE_REQUEST, DELETE_PACKAGE_SUCCESS, DELETE_PACKAGE_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/packageConstant";

export const getAllPackages = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PACKAGES_REQUEST });

        const { data } = await API.get("/packages/");

        dispatch({ type: GET_PACKAGES_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_PACKAGES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getPackageById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PACKAGE_DETAIL_REQUEST });

        const { data } = await API.get(`/packages/${id}`);

        dispatch({ type: GET_PACKAGE_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_PACKAGE_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createPackage = (payload) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PACKAGE_REQUEST });

        const { data } = await API.post("/packages", payload);

        dispatch({ type: CREATE_PACKAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: CREATE_PACKAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updatePackage = (id, payload) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PACKAGE_REQUEST });

        const { data } = await API.put(`/packages/${id}`, payload);

        dispatch({ type: UPDATE_PACKAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPDATE_PACKAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const deletePackageById = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PACKAGE_REQUEST });

        const { data } = await API.delete(`/packages/${id}`);

        dispatch({ type: DELETE_PACKAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: DELETE_PACKAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });
