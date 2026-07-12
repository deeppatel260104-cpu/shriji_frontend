import API from "../services/api";
import {
        GET_ALL_VIDEOS_REQUEST, GET_ALL_VIDEOS_SUCCESS, GET_ALL_VIDEOS_FAIL,

    GET_VIDEOS_BY_CATEGORY_REQUEST, GET_VIDEOS_BY_CATEGORY_SUCCESS, GET_VIDEOS_BY_CATEGORY_FAIL,
    UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS, UPLOAD_VIDEO_FAIL,
    UPDATE_VIDEO_REQUEST, UPDATE_VIDEO_SUCCESS, UPDATE_VIDEO_FAIL,
    DELETE_VIDEO_REQUEST, DELETE_VIDEO_SUCCESS, DELETE_VIDEO_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/videoConstant";

// ─── GET ALL VIDEOS ───────────────────────────────────────────────────────────
export const getAllVideos = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_VIDEOS_REQUEST });

        const { data } = await API.get("/videos");

        dispatch({ type: GET_ALL_VIDEOS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_ALL_VIDEOS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── GET VIDEOS BY CATEGORY ───────────────────────────────────────────────────
export const getVideosByCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({ type: GET_VIDEOS_BY_CATEGORY_REQUEST });

        const { data } = await API.get(`/videos/category/${categoryId}`);

        dispatch({ type: GET_VIDEOS_BY_CATEGORY_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_VIDEOS_BY_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── UPLOAD VIDEO ─────────────────────────────────────────────────────────────
export const uploadVideo = (videoData) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_VIDEO_REQUEST });

        const { data } = await API.post("/videos", videoData, {
            headers: { "Content-Type": "application/json" },
        });

        dispatch({ type: UPLOAD_VIDEO_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPLOAD_VIDEO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── UPDATE VIDEO ─────────────────────────────────────────────────────────────
export const updateVideo = (id, videoData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_VIDEO_REQUEST });

        const { data } = await API.put(`/videos/${id}`, videoData, {
            headers: { "Content-Type": "application/json" },
        });

        dispatch({ type: UPDATE_VIDEO_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPDATE_VIDEO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── DELETE VIDEO ─────────────────────────────────────────────────────────────
export const deleteVideo = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_VIDEO_REQUEST });

        const { data } = await API.delete(`/videos/${id}`);

        dispatch({ type: DELETE_VIDEO_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: DELETE_VIDEO_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── CLEAR ERRORS & MESSAGES ──────────────────────────────────────────────────
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });