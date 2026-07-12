import {
    CONTACT_REQUEST,
    CONTACT_SUCCESS,
    CONTACT_FAIL,
    CONTACT_RESET,
    CLEAR_ERRORS,
    CLEAR_MESSAGE,
} from "../constants/contactConstants";

export const contactFormReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return { loading: true };

        case CONTACT_SUCCESS:
            return { loading: false, success: true, message: action.payload };

        case CONTACT_FAIL:
            return { loading: false, error: action.payload };

        case CONTACT_RESET:
            return {};

        case CLEAR_ERRORS:
            return { ...state, error: null };

        case CLEAR_MESSAGE:
            return { ...state, message: null };

        default:
            return state;
    }
};