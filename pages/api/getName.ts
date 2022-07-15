import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mySteamId = "76561198012718791";

  const resp = await fetch(
    `https://api.steampowered.com/ISteamApps/GetAppList/v2/`
  );
  const data = await resp.json();

  res.status(200).json(data);
}
