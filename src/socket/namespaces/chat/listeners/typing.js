export default function listenTypingEvent(socket) {
  return (data) => {
    const userId = socket.handshake.query.userId;

    console.log("online", socket.id);
    console.log("userId", userId);

    console.log(data);
  };
}
