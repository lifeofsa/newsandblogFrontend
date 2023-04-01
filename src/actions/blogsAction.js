import axios from 'axios';
import {
  BLOGS_EXTRA_FAIL,
  BLOGS_EXTRA_REQUEST,
  BLOGS_EXTRA_SUCCESS,
  BLOGS_FAIL_BYID,
  BLOGS_FAIL_CREATE,
  BLOGS_FAIL_GET,
  BLOGS_FAIL_UPDATE,
  BLOGS_REQUEST_BYID,
  BLOGS_REQUEST_CREATE,
  BLOGS_REQUEST_GET,
  BLOGS_REQUEST_UPDATE,
  BLOGS_SUCCESS_BYID,
  BLOGS_SUCCESS_CREATE,
  BLOGS_SUCCESS_GET,
  BLOGS_SUCCESS_UPDATE,
  EXTRA_DELETE_FAIL,
  EXTRA_DELETE_REQUEST,
  EXTRA_DELETE_SUCCESS,
  EXTRA_PUT_FAIL,
  EXTRA_PUT_REQUEST,
  EXTRA_PUT_SUCCESS,
} from '../constants/BlogsConstants';

// export const blogsActionPost = (formBody) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: BLOGS_REQUEST_CREATE,
//     });
//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const data = await axios("/api/blogs/addBlog", {
//       method: "POST",
//       data: formBody,
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     });

//     dispatch({
//       type: BLOGS_SUCCESS_CREATE,
//       payload: data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: BLOGS_FAIL_CREATE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const getAllBlogsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: BLOGS_REQUEST_GET,
    });

    const { data } = await axios.get('/api/blogs');
    dispatch({
      type: BLOGS_SUCCESS_GET,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOGS_FAIL_GET,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const blogsActionPost = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOGS_REQUEST_CREATE,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios('/api/blogs/addBlog', {
      method: 'POST',
      data: {},
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: BLOGS_SUCCESS_CREATE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOGS_FAIL_CREATE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const blogActionUpdate =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOGS_REQUEST_UPDATE,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios(`/api/blogs/addBlog/edit/${id}`, {
        method: 'PUT',
        data: formData,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({
        type: BLOGS_SUCCESS_UPDATE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOGS_FAIL_UPDATE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const blogGetByIdAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOGS_REQUEST_BYID,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios(`/api/blogs/${id}`, {
      method: 'GET',
      // headers: {
      //   Authorization: `Bearer ${userInfo.token}`,
      // },
    });
    dispatch({
      type: BLOGS_SUCCESS_BYID,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOGS_FAIL_BYID,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const blogExtraGetByIdAction =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOGS_EXTRA_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios(`/api/blogs/addBlog/${id}`, {
        method: 'POST',
        data: formData,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({
        type: BLOGS_EXTRA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOGS_EXTRA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const extraPutAction = (formData, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXTRA_PUT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios(`/api/blogs/addBlog/extra/${id}`, {
      method: 'PUT',
      data: formData,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: EXTRA_PUT_SUCCESS,
      payload: data,
    });
    if (data) {
      blogGetByIdAction(id);
    }
  } catch (error) {
    dispatch({
      type: EXTRA_PUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const extraDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXTRA_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios(`/api/blogs/addBlog/extra/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: EXTRA_DELETE_SUCCESS,
      payload: data,
    });
    if (data) {
      blogGetByIdAction(id);
    }
  } catch (error) {
    dispatch({
      type: EXTRA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
