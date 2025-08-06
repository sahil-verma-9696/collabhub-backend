import chalk from "chalk";

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
      chalk.yellow(
        `New connection from ${socket.handshake.address} (${socket.id})`
      )
    );

    socket.on("test", (data) => {
      console.log("test event", data);

      socket.emit("test", { message: "acknowledgment" });
    });
  };
}
