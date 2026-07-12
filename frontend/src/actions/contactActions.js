import API from "../services/api";

import {
    CONTACT_FAIL,
    CONTACT_SUCCESS,
    CONTACT_REQUEST
} from '../constants/contactConstants'
import { CLEAR_ERRORS } from "../constants/contactConstants";
import { CLEAR_MESSAGE } from "../constants/contactConstants";


export const submitContactForm = (contactData) => async (dispatch) => {
    try {
        dispatch({ type: CONTACT_REQUEST });

        const { data } = await API.post("/contact", contactData);

        dispatch({
            type: CONTACT_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: CONTACT_FAIL,
            payload: error.response?.data?.error || "Something went wrong",
        })

    }
}

// ─── CLEAR ERRORS & MESSAGES ──────────────────────────────────────────────────
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });