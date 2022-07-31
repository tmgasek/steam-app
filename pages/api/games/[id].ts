import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const resp = await fetch(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${id}&include_appinfo=true`
    );
    const data = await resp.json();
    const libraryData = data?.response?.games;
    res.status(200).json(libraryData);
  } catch (error) {
    console.error(error);
  }
}
