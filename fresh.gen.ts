// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/cells/[index].ts";
import * as $1 from "./routes/api/cells/events.ts";
import * as $2 from "./routes/api/cells/index.ts";
import * as $3 from "./routes/index.tsx";
import * as $$0 from "./islands/Cell.tsx";
import * as $$1 from "./islands/CellsGrid.tsx";

const manifest = {
  routes: {
    "./routes/api/cells/[index].ts": $0,
    "./routes/api/cells/events.ts": $1,
    "./routes/api/cells/index.ts": $2,
    "./routes/index.tsx": $3,
  },
  islands: {
    "./islands/Cell.tsx": $$0,
    "./islands/CellsGrid.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
