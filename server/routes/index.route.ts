import { createRouter } from "../deps.ts";


const IndexRouter = createRouter();
IndexRouter.get("/", async (req) => {
  return await req.respond({
    status: 200,
    body: "Colors API",
  });
});

export { IndexRouter };
