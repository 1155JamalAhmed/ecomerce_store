import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isUserChatsLoading: true,
  userChatsHasError: null,
  userChats: null,
  selectedUserChat: null,
  userChatMessages: {},
};

export const userChatsReducer = createReducer(initialState, {
  LoadUserChats: (state) => (state.isUserChatsLoading = false),
  LoadUserChatsSuccess: (state, action) => {
    state.isUserChatsLoading = false;
    state.userChats = action.payload;
  },
  LoadUserChatError: (state, action) => {
    state.isUserChatsLoading = false;
    state.userChatsHasError = action.payload;
  },
  ChangeSelectedUserChat: (state, action) => {
    state.selectedUserChat = action.payload;
  },
  LoadMessagesForChat: (state, action) => {
    state.userChatMessages[action.payload[0].chat] = action.payload;
  },
});
