import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

// 使用 Twind v1
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

await start(manifest, {
  plugins: [twindPlugin(twindConfig)],
  render: (ctx, render) => {
    ctx.lang = "zh-CN";
    render();
  },
});
