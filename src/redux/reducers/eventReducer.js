import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isEventsLoading: true,
  eventsError: null,
  events: [],
};

export const eventReducer = createReducer(initialState, {
  LoadingEvents: (state) => {
    state.isEventsLoading = true;
  },
  EventsLoadedSucc: (state, action) => {
    state.isEventsLoading = false;
    state.events = action.payload;
  },
  ProdsLoadedFailed: (state, action) => {
    state.isEventsLoading = false;
    state.eventsError = action.payload;
  },

  CreateEvent: (state, action) => {
    state.events.push(action.payload);
  },
  DeleteEvent: (state, action) => {
    state.events = state.events.filter((event) => {
      return event._id !== action.payload._id;
    });
  },
  UpdateEvent: (state, action) => {
    const index = state.events.findIndex(
      (event) => event.id === action.payload._id
    );
    if (index !== -1) state.events[index] = action.payload;
  },
});
