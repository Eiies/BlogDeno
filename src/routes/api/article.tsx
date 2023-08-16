import { HandlerContext } from "$fresh/server.ts";

const Article = [
  "这是一篇文章",
  "这是第二篇文章",
  "这是第三篇文章",
];

export const handler = (
  _req: Request,
  ctx: HandlerContext,
) => {
  if (_req.url === "/api/articles") {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
  }

  return;
};
