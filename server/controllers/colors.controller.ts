import { ServerRequest } from "../deps.ts";

import { colors } from "../app.ts";

export const getAllColors = async (req: ServerRequest) => {
  req.set("Access-Control-Allow-Origin", "*");
  return await req.respond({
    status: 200,
    headers: new Headers({
      "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
      "content-type": "application/json; charset=utf-8",
    }),
    body: JSON.stringify(colors),
  });
};

export const addColor = async (req: ServerRequest) => {
  const { color } = await req.json();

  if (!color) {
    return await req.respond({
      status: 400,
      body: "bad request, color is required",
    });
  }

  if (colors.some((c) => c === color)) {
    return await req.respond({
      status: 400,
      body: "this color already exists",
    });
  }

  colors.push(color);

  return await req.respond({
    status: 200,
    headers: new Headers({
      "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
      "content-type": "application/json; charset=utf-8",
    }),
    body: JSON.stringify(colors),
  });
};
