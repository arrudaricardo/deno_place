import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { getCells, setCell, CELLS_MAX_SIZE } from "../../../utils/db.ts";
import { CellChannel } from "../../../server/message.ts";

export const handler: Handlers = {
  async GET(_req) {
    try {
      const cells = await getCells();
      return new Response(JSON.stringify(cells));
    } catch (error) {
      return new Response(error.message, { status: 400 });
    }
  },
  async POST(req, ctx) {
    const channel = new CellChannel();

    const body: unknown = await req.json();
    const jsonParseResult = z
      .object({
        index: z.coerce
          .number()
          .min(0)
          .max(CELLS_MAX_SIZE - 1),
        hexColor: z.string().startsWith("#").length(7),
      })
      .safeParse(body);
    if (!jsonParseResult.success) {
      return new Response(jsonParseResult.error.message, { status: 400 });
    }

    const hostname = (ctx.localAddr as any).hostname;
    const { index, hexColor } = jsonParseResult.data;
    try {
      await setCell(index, {
        hexColor,
        editor: {
          hostname: hostname ?? null,
        },
        timestamp: Date.now().valueOf(),
      });
      channel.sendMessage({ index });
      return new Response(null, { status: 201 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  },
};
