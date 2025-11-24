import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { actions as usersActions } from "./usersSlice.js";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: postsAdapter.addMany,
    addPost: postsAdapter.addOne,
    updatePost: postsAdapter.updateOne,
    // При удалении поста передается весь пост
    removePost: (state, { payload }) =>
      postsAdapter.removeOne(state, payload.id),
  },
  // BEGIN (write your solution here)
  extraReducers: (builder) => {
    builder.addCase(usersActions.removeUser, (state, { payload }) => {
      const userId = payload.id || payload;
      const postsToRemove = Object.values(state.entities)
        .filter(post => post.author === userId)
        .map(post => post.id);
      if (postsToRemove.length > 0) {
        postsAdapter.removeMany(state, postsToRemove);
      }
    });
  }
  // END
});

export const { actions } = postsSlice;
export const selectors = postsAdapter.getSelectors((state) => state.posts);
export default postsSlice.reducer;
