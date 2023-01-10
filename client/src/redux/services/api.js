import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
  reducerPath: "myApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5174",
    prepareHeaders: (headers) => {
      if (localStorage.getItem("profile")) {
        headers.set(
          "Authorisation",
          `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
        );
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    fetchPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"],
      keepUnusedDataFor: 1,
    }),
    fetchPosts: builder.query({
      query: (page) => `/posts?page=${page}`,
      providesTags: ["Post"],
      keepUnusedDataFor: 1,
    }),
    fetchPostsBySearch: builder.query({
      query: (searchQuery) =>
        `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
          searchQuery.tags
        }`,
      providesTags: ["Post"],
      keepUnusedDataFor: 1,
    }),

    createNewPost: builder.mutation({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createComment: builder.mutation({
      query: ({ value, id }) => ({
        url: `/posts/${id}/commentPost`,
        method: "POST",
        body: { value },
      }),
    }),
    updatePost: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `/posts/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `/posts/${id}`,
          method: "DELETE",
          //credentials: "include",
        };
      },
    }),
    likePost: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `/posts/${id}/likePost`,
          method: "PATCH",
          body,
        };
      },
    }),

    signIn: builder.mutation({
      query: (formData) => {
        return {
          url: `/user/signin`,
          method: "POST",
          body: formData,
        };
      },
    }),
    signUp: builder.mutation({
      query: (formData) => {
        return {
          url: `/user/signup`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});
export const {
  useFetchPostQuery,
  useFetchPostsQuery,
  useFetchPostsBySearchQuery,
  useCreateNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useSignInMutation,
  useSignUpMutation,
  useCreateCommentMutation,
} = myApi;
