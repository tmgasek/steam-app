import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const appid = req.query.appid as string;

  const resp = await fetch(
    `https://store.steampowered.com/api/appdetails/?key=${process.env.STEAM_API_KEY}&appids=${appid}`
  );
  const data = await resp.json();
  const gameData = data[appid].data;

  res.status(200).json(gameData);
}
