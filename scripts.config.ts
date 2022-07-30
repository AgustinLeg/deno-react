import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";
import { config as env } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    // same as json configuration
    start: {
      cmd: "deno run --allow-env --allow-net app.tsx",
      desc: "run my app.tsx file",
      env: env(),
    },
  },
};

export default config;
