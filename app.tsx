import { createApp, contentTypeFilter, ReactDOMServer, React } from "./deps.ts";

const port = Number(Deno.env.get("PORT"));

const app = createApp();

const colors: string[] = [];

app.post(
  "/form-urlencoded",
  contentTypeFilter("application/x-www-form-urlencoded"),
  async (req) => {
    const bodyForm = await req.formData();
    const color = bodyForm.value("color");

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

    await req.respond({
      status: 200,
      body: JSON.stringify(colors),
    });
  }
);

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                      body{
              font-family: system-ui;
              display: grid;
              place-content: center;
              min-height: 100vh;
              margin: 0;
            }
            form {
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 300px;
            }
          `,
            }}
          ></style>
        </head>
        <body>
          <form
            action="http://localhost:8080/form-urlencoded"
            method="post"
            encType="application/x-www-form-urlencoded"
          >
            <input type="text" placeholder="red" name="color" id="color" />
            <button type="submit">Send</button>
          </form>
          <ul>
            {colors.map((color) => (
              <li style={{ color }}>{color}</li>
            ))}
          </ul>
        </body>
      </html>
    ),
  });
});

app.listen({ port });
