const SockJS = require("sockjs-client");
const { over } = require("stompjs");

const stompEasy = {
  connect: null,
  disconnect: null,
  eventSend: null,
  eventReceived: null
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
      stompClient.subscribe(topic, sdkEvent => {
        received(sdkEvent);
      });
    },
    errorCallBack
  );
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

stompEasy.eventSend = send = (topic, message) => {
  console.log("calling logout api via web socket");
  stompClient.send(topic, {}, JSON.stringify(message));
};

stompEasy.eventReceived = received = message => {
  console.log("Message Recieved from Server :: " + message);
};

module.exports = { stompEasy };
