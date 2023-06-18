import { Handlers } from "$fresh/server.ts";
import { getCell } from "../../../utils/db.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    try {
      const index = Number(_ctx.params.index);
      const cells = await getCell(index);
      return new Response(JSON.stringify(cells));
    } catch (error) {
      return new Response(error.message, { status: 400 });
    }
  },
};
