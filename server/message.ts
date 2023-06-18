export interface ApiMessage {
  index: number;
}

export class CellChannel {
  #channel: BroadcastChannel;

  constructor() {
    this.#channel = new BroadcastChannel("cell");
  }

  onMessage(handler: (message: ApiMessage) => void) {
    const listener = (e: MessageEvent) => {
      handler(e.data);
    };
    this.#channel.addEventListener("message", listener);
    return {
      unsubscribe: () => {
        this.#channel.removeEventListener("message", listener);
      },
    };
  }

  close() {
    this.#channel.close();
  }

  sendMessage(message: ApiMessage) {
    this.#channel.postMessage(message);
  }
}
