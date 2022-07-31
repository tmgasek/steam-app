import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { vanityUrl } = req.query;

  const resp = await fetch(
    `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API_KEY}&vanityurl=${vanityUrl}`
  );

  const data = await resp.json();

  if (data.response?.success === 1) {
    res.status(200).json(data.response.steamid);
  } else if (data.response?.success === 42) {
    res.status(404).json("user not found");
  } else {
    res.status(500);
  }
}
