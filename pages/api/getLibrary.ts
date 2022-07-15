// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mySteamId = "76561198012718791";

  const resp = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${mySteamId}`
  );
  const data = await resp.json();

  const games = data?.response?.games.splice(0, 3);

  const mapped = games.map(async (game: any) => {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${game.appid}`
    );
    const gameData = await response.json();
    console.log(gameData);

    return { game: gameData[game.appid].data };
  });

  const gameData = await Promise.all(mapped);

  res.status(200).json(gameData);
}
