import Randomiser from "@/components/Randomiser";
import { GetServerSideProps } from "next";
import React from "react";
import { User, BasicGame } from "../../types";

type PageProps = {
  user: User;
  games: BasicGame[];
};

export default function RandomisePage({ user, games }: PageProps) {
  return (
    <>
      <Randomiser games={games} user={user} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const steamId = context.query.steamId;

  try {
    // get the user
    const userRes = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`
    );
    const userData = await userRes.json();
    const user = userData.response?.players[0];

    // get the user's games
    const gamesRes = await fetch(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true`
    );
    const gamesData = await gamesRes.json();
    const games = gamesData.response?.games;

    if (!user || !games) {
      return { notFound: true };
    }

    return {
      props: {
        user,
        games,
      },
    };
  } catch {
    return { notFound: true };
  }
};
