export const socketToUserIdMap = new Map();
export const userIdToSocketMap = new Map();

export default function listenOnlineEvent(socket) {
  return (data) => {
    const userId = socket.handshake.query.userId;

    // store the mapping
    socketToUserIdMap.set(socket.id, userId);
    userIdToSocketMap.set(userId, socket);

    console.log("online", socket.id);
    console.log("userId", userId);

    socket.broadcast.emit("online", { sender: userId });

    console.log(data);

  };
}
