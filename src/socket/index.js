import { Server } from "socket.io";

import chatNamespace from "./namespaces/chat.js";

/**
 * Initializes a WebSocket server with a chat namespace.
 *
 * @param {import("http").Server} httpServer - The HTTP server to attach the WebSocket server to.
 * @param {Object} [options] - Optional configuration options for the WebSocket server.
 * @returns {import("socket.io").Server} - The initialized WebSocket server instance.
 */
function listen(httpServer, options) {
  const wsServer = new Server(httpServer, {
    ...options,
    cors: { origin: "*" },
    pingInterval: 2000,
    pingTimeout: 1000,
  });

  const chatNS = wsServer.of("/conversation");
  
  chatNS.on("connection", chatNamespace(wsServer, chatNS));

  return wsServer;
}

export { listen };
