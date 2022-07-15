// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const resp = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${id}&include_appinfo=true`
  );
  const data = await resp.json();
  const libraryData = data?.response?.games;

  // const mappedGames = libraryData.map(async (game: any) => {
  //   const response = await fetch(
  //     `https://store.steampowered.com/api/appdetails?appids=${game.appid}`
  //   );
  //   const gameData = await response.json();
  //   const curr = gameData[game.appid].data;

  //   return { name: curr.name };
  // });

  res.status(200).json(libraryData);
}
