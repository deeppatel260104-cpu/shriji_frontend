import API from "../services/api";
import {
      UPDATE_IMAGE_REQUEST, UPDATE_IMAGE_SUCCESS, UPDATE_IMAGE_FAIL, GET_ALL_IMAGES_REQUEST, GET_ALL_IMAGES_SUCCESS, GET_ALL_IMAGES_FAIL, GET_IMAGES_BY_CATEGORY_REQUEST, GET_IMAGES_BY_CATEGORY_SUCCESS, GET_IMAGES_BY_CATEGORY_FAIL,
    UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAIL,
    UPDATE_IMAGE_LAYOUT_REQUEST, UPDATE_IMAGE_LAYOUT_SUCCESS, UPDATE_IMAGE_LAYOUT_FAIL,
    REORDER_IMAGES_REQUEST, REORDER_IMAGES_SUCCESS, REORDER_IMAGES_FAIL,
    DELETE_IMAGE_REQUEST, DELETE_IMAGE_SUCCESS, DELETE_IMAGE_FAIL,
    CLEAR_ERRORS, CLEAR_MESSAGE,
} from "../constants/imageConstant";

// ─── GET ALL IMAGES ───────────────────────────────────────────────────────────
export const getAllImages = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_IMAGES_REQUEST });

        const { data } = await API.get("/images");
        dispatch({ type: GET_ALL_IMAGES_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_ALL_IMAGES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── GET IMAGES BY CATEGORY ───────────────────────────────────────────────────
export const getImagesByCategory = (categoryId) => async (dispatch) => {
    try {
       dispatch({ type: GET_IMAGES_BY_CATEGORY_REQUEST, payload: { categoryId } });
       const { data } = await API.get(`/images/category/${categoryId}`);
       const images = Array.isArray(data?.data) ? data.data : []
       console.log("[images API]",
         images
       );
       dispatch({
           type: GET_IMAGES_BY_CATEGORY_SUCCESS,
           payload: {
               categoryId,
               images
           },
       });



    } catch (error) {
                   console.log("[images API FAIL]", categoryId, error.message);





        dispatch({
            type: GET_IMAGES_BY_CATEGORY_FAIL,
            payload: {categoryId, error: error.response?.data?.message || error.message,},
        });
    }
};

// ─── UPLOAD IMAGE ─────────────────────────────────────────────────────────────
export const uploadImage = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPLOAD_IMAGE_REQUEST });

        const { data } = await API.post("/images", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPLOAD_IMAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
// ─── UPDATE IMAGE ─────────────────────────────────────────────────────────────
export const updateImage = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_IMAGE_REQUEST });

        const { data } = await API.put(`/images/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch({ type: UPDATE_IMAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPDATE_IMAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
// ─── UPDATE IMAGE LAYOUT ──────────────────────────────────────────────────────
export const updateImageLayout = (id, layoutData) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_IMAGE_LAYOUT_REQUEST });

        const { data } = await API.patch(`/images/${id}/layout`, layoutData, {
            headers: { "Content-Type": "application/json" },
        });

        const state = getState();
        const patchItem = (item) => (
            String(item.id ?? item._id) === String(id)
                ? { ...item, ...layoutData }
                : item
        );

        if (Array.isArray(state.allImagesReducer?.images)) {
            dispatch({
                type: GET_ALL_IMAGES_SUCCESS,
                payload: state.allImagesReducer.images.map(patchItem),
            });
        }

        const imagesByCategory = state.imageReducer?.imagesByCategory;
        if(imagesByCategory && typeof imagesByCategory === "object"){
            Object.entries(imagesByCategory).forEach(([categoryId, list]) => {
                if(!Array.isArray(list)) return;
                dispatch({
                    type: GET_IMAGES_BY_CATEGORY_SUCCESS,
                    payload: {categoryId, images: list.map(patchItem)}
                });
            });
        }

        dispatch({ type: UPDATE_IMAGE_LAYOUT_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: UPDATE_IMAGE_LAYOUT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const toggleImageSlideshow = (id, item = {}) => async (dispatch) => {
    const current = item.show_in_slideshow === true || item.show_in_slideshow === 1 || item.show_in_slideshow === "1";
    return dispatch(updateImageLayout(id, { show_in_slideshow: current ? 0 : 1 }));
};

// ─── REORDER IMAGES ───────────────────────────────────────────────────────────
export const reorderImages = (updates) => async (dispatch) => {
    try {
        dispatch({ type: REORDER_IMAGES_REQUEST });

        // updates = [{ id, order_index }, ...]
        const { data } = await API.patch("/images/reorder", updates, {
            headers: { "Content-Type": "application/json" },
        });

        dispatch({ type: REORDER_IMAGES_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: REORDER_IMAGES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── DELETE IMAGE ─────────────────────────────────────────────────────────────
export const deleteImageById = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_IMAGE_REQUEST });

        const { data } = await API.delete(`/images/${id}`);

        dispatch({ type: DELETE_IMAGE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: DELETE_IMAGE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// ─── CLEAR ERRORS & MESSAGES ──────────────────────────────────────────────────
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });

export const toggleImageMobileSlideshow = (id, item = {}) => async (dispatch) => {
    const current = item.show_in_mobile_slideshow === true || item.show_in_mobile_slideshow === 1 || item.show_in_mobile_slideshow === "1";
    return dispatch(updateImageLayout(id, { show_in_mobile_slideshow: current ? 0 : 1 }));
};
