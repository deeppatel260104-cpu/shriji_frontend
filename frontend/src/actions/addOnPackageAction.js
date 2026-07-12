import API from "../services/api";
import {
    GET_ADDON_PACKAGES_REQUEST, GET_ADDON_PACKAGES_SUCCESS, GET_ADDON_PACKAGES_FAIL,
    GET_ADDON_PACKAGE_DETAIL_REQUEST, GET_ADDON_PACKAGE_DETAIL_SUCCESS, GET_ADDON_PACKAGE_DETAIL_FAIL,
    CREATE_ADDON_PACKAGE_REQUEST, CREATE_ADDON_PACKAGE_SUCCESS, CREATE_ADDON_PACKAGE_FAIL,
    UPDATE_ADDON_PACKAGE_REQUEST, UPDATE_ADDON_PACKAGE_SUCCESS, UPDATE_ADDON_PACKAGE_FAIL,
    DELETE_ADDON_PACKAGE_REQUEST, DELETE_ADDON_PACKAGE_SUCCESS, DELETE_ADDON_PACKAGE_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/addOnPackageConstant";

export const getAllAddOnPackages = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ADDON_PACKAGES_REQUEST });

        const { data } = await API.get("/package-addons/");

        dispatch({ type: GET_ADDON_PACKAGES_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_ADDON_PACKAGES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getAddOnPackageById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADDON_PACKAGE_DETAIL_REQUEST });

        const { data } = await API.get(`/package-addons/${id}`);

        dispatch({ type: GET_ADDON_PACKAGE_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_ADDON_PACKAGE_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createAddOnPackage = (payload) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ADDON_PACKAGE_REQUEST });

        const { data } = await API.post("/package-addons", payload);

        dispatch({ type: CREATE_ADDON_PACKAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: CREATE_ADDON_PACKAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateAddOnPackage = (id, payload) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADDON_PACKAGE_REQUEST });

        const { data } = await API.put(`/package-addons/${id}`, payload);

        dispatch({ type: UPDATE_ADDON_PACKAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPDATE_ADDON_PACKAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const deleteAddOnPackageById = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ADDON_PACKAGE_REQUEST });

        const { data } = await API.delete(`/package-addons/${id}`);

        dispatch({ type: DELETE_ADDON_PACKAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: DELETE_ADDON_PACKAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });
