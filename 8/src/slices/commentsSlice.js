import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { actions as usersActions } from "./usersSlice.js";
import { actions as postsActions } from "./postsSlice.js";

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComments: commentsAdapter.addMany,
    addComment: commentsAdapter.addOne,
  },
  // BEGIN (write your solution here)
  extraReducers: (builder) => {
    builder
      .addCase(usersActions.removeUser, (state, { payload }) => {
        const userId = payload.id || payload;
        const commentsToRemove = Object.values(state.entities)
          .filter(comment => comment.author === userId)
          .map(comment => comment.id);
        if (commentsToRemove.length > 0) {
          commentsAdapter.removeMany(state, commentsToRemove);
        }
      })
      .addCase(postsActions.removePost, (state, { payload }) => {
        const post = payload;
        if (post && post.comments && Array.isArray(post.comments)) {
          commentsAdapter.removeMany(state, post.comments);
        }
      });
  }
  // END
});

export const { actions } = commentsSlice;
export const selectors = commentsAdapter.getSelectors(
  (state) => state.comments
);
export default commentsSlice.reducer;
