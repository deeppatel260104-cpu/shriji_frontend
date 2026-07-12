import {
    GET_ADDON_PACKAGES_REQUEST, GET_ADDON_PACKAGES_SUCCESS, GET_ADDON_PACKAGES_FAIL,
    GET_ADDON_PACKAGE_DETAIL_REQUEST, GET_ADDON_PACKAGE_DETAIL_SUCCESS, GET_ADDON_PACKAGE_DETAIL_FAIL,
    CREATE_ADDON_PACKAGE_REQUEST, CREATE_ADDON_PACKAGE_SUCCESS, CREATE_ADDON_PACKAGE_FAIL,
    UPDATE_ADDON_PACKAGE_REQUEST, UPDATE_ADDON_PACKAGE_SUCCESS, UPDATE_ADDON_PACKAGE_FAIL,
    DELETE_ADDON_PACKAGE_REQUEST, DELETE_ADDON_PACKAGE_SUCCESS, DELETE_ADDON_PACKAGE_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/addOnPackageConstant";

const initialAddOnsState = {
    loading: false,
    addOns: [],
    error: null,
};

export const addOnPackagesReducer = (state = initialAddOnsState, action) => {
    switch (action.type) {
        case GET_ADDON_PACKAGES_REQUEST:
            return { ...state, loading: true };

        case GET_ADDON_PACKAGES_SUCCESS:
            return { ...state, loading: false, addOns: action.payload, error: null };

        case GET_ADDON_PACKAGES_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

const initialAddOnDetailState = {
    loading: false,
    addOn: null,
    error: null,
};

export const addOnPackageDetailReducer = (state = initialAddOnDetailState, action) => {
    switch (action.type) {
        case GET_ADDON_PACKAGE_DETAIL_REQUEST:
            return { ...state, loading: true };

        case GET_ADDON_PACKAGE_DETAIL_SUCCESS:
            return { ...state, loading: false, addOn: action.payload, error: null };

        case GET_ADDON_PACKAGE_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

const initialAddOnActionState = {
    loading: false,
    success: false,
    message: null,
    error: null,
};

export const addOnPackageActionReducer = (state = initialAddOnActionState, action) => {
    switch (action.type) {
        case CREATE_ADDON_PACKAGE_REQUEST:
        case UPDATE_ADDON_PACKAGE_REQUEST:
        case DELETE_ADDON_PACKAGE_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        case CREATE_ADDON_PACKAGE_SUCCESS:
        case UPDATE_ADDON_PACKAGE_SUCCESS:
        case DELETE_ADDON_PACKAGE_SUCCESS:
            return { ...state, loading: false, success: true, message: action.payload, error: null };

        case CREATE_ADDON_PACKAGE_FAIL:
        case UPDATE_ADDON_PACKAGE_FAIL:
        case DELETE_ADDON_PACKAGE_FAIL:
            return { ...state, loading: false, success: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        case CLEAR_MESSAGE:
            return { ...state, message: null, success: false };

        default:
            return state;
    }
};
