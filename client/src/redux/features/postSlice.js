import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      return {
        posts: action.payload?.data,
        currentPage: action.payload?.currentPage,
        numberOfPages: action.payload?.numberOfPages,
      };
    },
    getPost: (state, action) => {
      return {
        ...state,
        post: action.payload,
      };
    },
    getSearchedPosts: (state, action) => {
      return {
        ...state,
        posts: action.payload?.data,
      };
    },
    addPost: (state, action) => {
      localStorage.setItem("addedId", action.payload._id);
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    },
    postWithComment: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };
    },
    editPost: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((el) =>
          el._id === action.payload.id ? { ...action.payload } : el
        ),
      };
    },
    removePost: (state, action) => {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id != action.payload),
      };
    },
    likeAnyPost: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((el) => {
          const user = el.likes.find((like) => like === action.payload.userId);
          return el._id === action.payload._id
            ? {
                ...el,
                likes: user
                  ? el.likes.filter((like) => like != user)
                  : [...el.likes, action.payload.userId],
              }
            : el;
        }),
      };
    },
  },
});
export const {
  getPost,
  getPosts,
  getSearchedPosts,
  addPost,
  editPost,
  removePost,
  likeAnyPost,
  postWithComment,
} = postSlice.actions;
export default postSlice.reducer;
