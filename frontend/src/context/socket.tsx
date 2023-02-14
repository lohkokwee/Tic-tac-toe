import React from "react";
import socketio from "socket.io-client";
import { ENDPOINT } from "../constants";

export const socket = socketio(`${ENDPOINT}`);
export const SocketContext = React.createContext<any>(socket);