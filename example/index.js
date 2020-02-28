import { wsComponent } from "../";

wsComponent.connect("url_ws", "topic", "fnOptional");

wsComponent.disconnect();

wsComponent.onMessageReceived();

wsComponent.send("topic", "data");
