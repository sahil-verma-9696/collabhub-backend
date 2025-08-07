import chalk from "chalk";

import listenOnlineEvent from "./listeners/online.js";
import listenTypingEvent from "./listeners/typing.js";
import listenTypingStopEvent from "./listeners/typing-stop.js";
import listenMessageEvent from "./listeners/message.js";

/**
 * Handles socket connections for the chat namespace.
 *
 * @param {import("socket.io").Server} _ - The main Socket.IO server instance.
 * @param {import("socket.io").Namespace} __ - The chat namespace instance.
 * @returns {(socket: import("socket.io").Socket) => void} - Socket connection handler.
 */
export default function chatNamespace(_, __) {
  return (socket) => {
    console.log(
      `${chalk.gray(
        "-" + new Date().toLocaleTimeString() + "-"
      )} ${chalk.yellow("[socket/conversation]")} ${chalk.gray(
        `New connection (${socket.id})`
      )}`
    );

    socket.on("online", listenOnlineEvent(socket));
    socket.on("typing", listenTypingEvent(socket));
    socket.on("typing-stop", listenTypingStopEvent(socket));
    socket.on("message", listenMessageEvent(socket));
    socket.on("disconnect", () => {
      console.log("disconnect", socket.id);
    });
  };
}
