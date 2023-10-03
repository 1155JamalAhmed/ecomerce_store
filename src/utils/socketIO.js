import { connect } from "socket.io-client";

export const socketForUser = connect("http://localhost:8000");
export const ntfSocketForUser = connect("http://localhost:8000/notification");

export const socketForShop = connect("http://localhost:8000");
export const ntfSocketForShop = connect("http://localhost:8000/notification");
