import {
    GET_PACKAGES_REQUEST, GET_PACKAGES_SUCCESS, GET_PACKAGES_FAIL,
    GET_PACKAGE_DETAIL_REQUEST, GET_PACKAGE_DETAIL_SUCCESS, GET_PACKAGE_DETAIL_FAIL,
    CREATE_PACKAGE_REQUEST, CREATE_PACKAGE_SUCCESS, CREATE_PACKAGE_FAIL,
    UPDATE_PACKAGE_REQUEST, UPDATE_PACKAGE_SUCCESS, UPDATE_PACKAGE_FAIL,
    DELETE_PACKAGE_REQUEST, DELETE_PACKAGE_SUCCESS, DELETE_PACKAGE_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/packageConstant";

const initialPackagesState = {
    loading: false,
    packages: [],
    error: null,
};

export const packagesReducer = (state = initialPackagesState, action) => {
    switch (action.type) {
        case GET_PACKAGES_REQUEST:
            return { ...state, loading: true };

        case GET_PACKAGES_SUCCESS:
            return { ...state, loading: false, packages: action.payload, error: null };

        case GET_PACKAGES_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

const initialPackageDetailState = {
    loading: false,
    package: null,
    error: null,
};

export const packageDetailReducer = (state = initialPackageDetailState, action) => {
    switch (action.type) {
        case GET_PACKAGE_DETAIL_REQUEST:
            return { ...state, loading: true };

        case GET_PACKAGE_DETAIL_SUCCESS:
            return { ...state, loading: false, package: action.payload, error: null };

        case GET_PACKAGE_DETAIL_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        default:
            return state;
    }
};

const initialPackageActionState = {
    loading: false,
    success: false,
    message: null,
    error: null,
};

export const packageActionReducer = (state = initialPackageActionState, action) => {
    switch (action.type) {
        case CREATE_PACKAGE_REQUEST:
        case UPDATE_PACKAGE_REQUEST:
        case DELETE_PACKAGE_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        case CREATE_PACKAGE_SUCCESS:
        case UPDATE_PACKAGE_SUCCESS:
        case DELETE_PACKAGE_SUCCESS:
            return { ...state, loading: false, success: true, message: action.payload, error: null };

        case CREATE_PACKAGE_FAIL:
        case UPDATE_PACKAGE_FAIL:
        case DELETE_PACKAGE_FAIL:
            return { ...state, loading: false, success: false, error: action.payload };

        case CLEAR_ERRORS:
            return { ...state, error: null };

        case CLEAR_MESSAGE:
            return { ...state, message: null, success: false };

        default:
            return state;
    }
};
