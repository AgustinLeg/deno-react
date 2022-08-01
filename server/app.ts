import { createApp, cors } from "./deps.ts";
import { ColorRouter } from "./routes/colors.route.ts";
import { IndexRouter } from "./routes/index.route.ts";

const port = Number(Deno.env.get("PORT"));

const app = createApp();

export const colors: string[] = [];


app.use(
  cors({
    origin: "*",
  })
);

app.route("/api/colors", ColorRouter);
app.route("/", IndexRouter);

app.listen({ port });
