import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const appId = req.query.appid;
  const imgHash = req.query.imgHash;

  const resp = await fetch(
    `https://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${imgHash}.jpg`
  );

  res.status(200).send(resp.body);
}
