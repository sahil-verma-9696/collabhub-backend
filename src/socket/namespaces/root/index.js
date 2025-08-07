import chalk from "chalk";

/**
 * Handles socket connections for the chat namespace.
 *
 * @param {import("socket.io").Server} _ - The main Socket.IO server instance.
 * @param {import("socket.io").Namespace} __ - The chat namespace instance.
 * @returns {(socket: import("socket.io").Socket) => void} - Socket connection handler.
 */
export default function rootNamespace(_, __) {
  return (socket) => {
    console.log(
      `${chalk.gray(
        "-" + new Date().toLocaleTimeString() + "-"
      )} ${chalk.yellow("[socket/]")} ${chalk.gray(
        `New connection (${socket.id})`
      )}`
    );
  };
}
