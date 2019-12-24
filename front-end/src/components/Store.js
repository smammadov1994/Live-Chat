import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

// {
//     from:'user'
//     msg:'hi'
//     topic:'general'

// }

const initState = {
  Family: [
    { from: "User 0.53", msg: "Dinner is ready!" },
    { from: "User 0.27", msg: "Did you take our son to school?" },
    { from: "User 0.54", msg: "Want to go to the gym?" }
  ],
  Friends: [
    { from: "User 0.23", msg: "Lets program!" },
    { from: "User 0.12", msg: "Want to play soccer?" },
    { from: "User 0.23", msg: "Want to grab a drink?" }
  ],
  Work: [
    { from: "User 0.76", msg: "Did you finish those files?" },
    { from: "User 0.36", msg: "Are you going to Happy Hour?" },
    { from: "User 0.86", msg: "What is the deadline for this project?" }
  ],
  Private: [
    { from: "User 0.35", msg: "Get ready to rage!" },
    { from: "User 0.43", msg: "Wyd?" },
    { from: "User 0.65", msg: "Did you do your chores?" }
  ]
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [action.payload.topic]: [...state[action.payload.topic], { from, msg }]
      };
    default:
      return state;
  }
}
let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

const user = "User" + " " + Math.random(100).toFixed(2);
export default function Store(props: React.PropsWithChildren<MyProps>) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
