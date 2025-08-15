export default function listenMessageEvent(socket) {
  return (data) => {
    const userId = socket.handshake.query.userId;

    console.log("online", socket.id);
    console.log("userId", userId);

    console.log(data);
  };
}
