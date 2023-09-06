import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const loadEventsByShop = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      `/events/get-all-events-shop/${shopId}`
    );
    dispatch({
      type: "EventsLoadedSucc",
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: "EventsLoadedFailed",
      payload: err.response.data.message,
    });
  }
};

export const createEvent = (eventData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/events/create-event", eventData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({
      type: "CreateEvent",
      payload: res.data.body,
    });
    toast.success("Event Created Successfully 😎");
  } catch (err) {
    toast.error(err.response.data.message);
    throw err;
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      "/events/delete-event",
      { eventId },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "DeleteEvent",
      payload: res.data.body,
    });
    toast.success("Event Deleted Successfully 😎");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};
