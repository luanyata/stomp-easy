# Stomp Easy

Lib simplificada para trabalhar com Stomp e o Sockjs-Client

_Observação: Versão atual utiliza token para autenticação_

## Importação:

```js
const { stompEasy } = require("stomp-easy");
```

ou

```js
import { stompEasy } from "stomp-easy";
```

## Funções:

### **connect:**

Usada para estabelecer a conexão do socket. O mesmo pode receber 3 parametros sendo o ultimo opcional: Url do Websocket, Topico a ser registrado, e opcionalmente a função para recuperar o token (caso nenhuma função seja passada o mesmo tentará recuperar o token na sessionStorage onde a key se chama token)

```js
stompEasy.connetc(wsUrl, topic, fnOptional);
```

### **disconnect:**

Usada para encerrar uma conexão com o socket

```js
stompEasy.disconnect();
```

### **eventSend:**

Usada para um envio de evento ao socket, o mesmo recebo dois parametros: Tipico a ser mandado o evento, dado do evento

```js
stompEasy.eventSend(topic, dataEvent);
```

### **eventReceived:**

Usada para receber eventos do socket. O mesmo contem um parametros que é o evento e/ou dado passado pelo socket

```js
stompEasy.eventReceived(message);
```

## License

MIT
