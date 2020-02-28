import { wsComponent } from "../";

wsComponent.connect("url_ws", "topic");

wsComponent.disconnect();

wsComponent.onMessageReceived();

wsComponent.send("topic", "data");
