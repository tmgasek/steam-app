import { BasicGame, User } from "@types";
import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  setUser: (user: User | null) => void;
  setGames: (games: BasicGame[] | null) => void;
  setMode: (mode: "search" | "randomiser") => void;
}

export default function Search({ setUser, setGames, setMode }: Props) {
  const userInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [error, setError] = useState<string | null>(null);
  const [showFull, setShowFull] = useState(true);
  const [loading, setLoading] = useState(false);
  /*
  https://steamcommunity.com/profiles/76561198008087615/
  https://steamcommunity.com/id/JEPZTEIN/
  https://steamcommunity.com/id/mirko2828/
  https://steamcommunity.com/profiles/76561198053881733
  */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUser(null);
    setGames(null);
    setError(null);
    setLoading(true);

    const input = userInputRef.current?.value;
    if (
      !input.match(
        /(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/
      )
    ) {
      console.error("Wrong URL format");
      setError(
        `Wrong URL format. Enter the full URL of your steam profile: https://steamcommunity.com/profiles/XXXXXXXXXXXXXXXXX/ or https://steamcommunity.com/id/SteamName/`
      );
      setLoading(false);
      return;
    }

    let steamId: string;
    // HANDLE /PROFILES/STEAMID type of url
    if (input.includes("profiles")) {
      steamId = input.split("/")[4];
    } else {
      // HANDLE /ID/ type of url
      try {
        const urlName = input.split("/")[4];
        const vanityUrlRes = await fetch(`/api/user/vanity/${urlName}`);
        steamId = await vanityUrlRes.json();
      } catch (error) {
        console.error(error);
        setError("Error fetching the user vanity URL");
        return;
      }
    }

    try {
      const [gamesRes, userRes] = await Promise.all([
        fetch(`/api/games/${steamId}`),
        fetch(`/api/user/${steamId}`),
      ]);
      const [gamesData, userData] = await Promise.all([
        gamesRes.json(),
        userRes.json(),
      ]);
      setUser(userData);
      setGames(gamesData);
      setMode("randomiser");
    } catch (error) {
      console.error(error);
      setError("Your profile is private or doesn't exist");
    }

    setLoading(false);
  };

  return (
    <motion.div className="flex flex-col justify-center items-center py-4">
      https://steamcommunity.com/profiles/76561198053881733
      <br />
      https://steamcommunity.com/id/JEPZTEIN/
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="user-input">Enter your steam profile URL</label>
        <input
          className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-700 text-center w-96 
          `}
          ref={userInputRef}
          id="user-input"
          placeholder="profile URL"
          type="text"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="my-4 bg-transparent hover:bg-red-700 text-red-40 font-semibold hover:text-black py-2 px-4 border border-red-700 w-min  hover:border-transparent rounded"
          type="submit"
        >
          Submit
        </motion.button>
      </form>
      {error ? (
        <p className="max-w-md text-center text-red-400">{error}</p>
      ) : null}
      {loading ? <p>LOADING...</p> : null}
    </motion.div>
  );
}
