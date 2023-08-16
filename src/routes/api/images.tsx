import { HandlerContext } from "$fresh/server.ts";

const IMAGES = [
  "https://source.unsplash.com/random/740x300",
  // "https://www.dmoe.cc/random.php",
];

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const randomIndex = Math.floor(Math.random() * IMAGES.length);
  const imageUrl = IMAGES[randomIndex];

  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();

  const headers = {
    "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
  };

  return new Response(imageBlob, { headers });
};
