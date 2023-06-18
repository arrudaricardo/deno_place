import { Handlers } from "$fresh/server.ts";
import { CellChannel } from "../../../server/message.ts";

export const handler: Handlers = {
  GET(_req, _ctx) {
    const channel = new CellChannel();

    const stream = new ReadableStream({
      start(controller) {
        channel.onMessage((message) => {
          const encodedMessage = new TextEncoder().encode(
            `data: ${JSON.stringify(message)} \r\n\r\n`
          );
          controller.enqueue(encodedMessage);
        });
      },
      cancel() {
        channel.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  },
};
