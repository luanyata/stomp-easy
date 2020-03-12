const SockJS = require("sockjs-client");
const { over } = require("stompjs");

const stompEasy = {
  connect: null,
  disconnect: null,
  eventSend: null,
  eventReceived: null,
  subscribe: null
};

let stompClient = null;

stompEasy.connect = connect = (webSocketEndPoint, topic, fnLoadToken) => {
  console.log("Initialize WebSocket Connection");

  let ws = new SockJS(webSocketEndPoint);
  stompClient = over(ws);

  stompClient.connect(
    {
      token: fnLoadToken
        ? fnLoadToken()
        : `Bearer ${sessionStorage.getItem("token")}`
    },
    () => {
      subscribe(topic);
    },
    errorCallBack
  );
};

stompEasy.subscribe = subscribe = topic => {
  return stompClient.subscribe(topic, message => received(message));
};

stompEasy.eventSend = send = (topic, message) => {
  console.log("calling logout api via web socket");
  stompClient.send(topic, {}, JSON.stringify(message));
};

stompEasy.eventReceived = received = message => {
  return message;
};

stompEasy.disconnect = disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  console.log("Disconnected");
};

const errorCallBack = error => {
  console.log("errorCallBack -> " + error);
  setTimeout(() => {
    connect();
  }, 5000);
};

module.exports = { stompEasy };
