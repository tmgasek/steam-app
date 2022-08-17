import { BasicGame, User } from "@types";
import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props {
  setUser: (user: User | null) => void;
  setGames: (games: BasicGame[] | null) => void;
}

export default function Search() {
  const userInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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

    router.push("/randomise?steamId=" + steamId);
    setLoading(false);
    return;
  };

  return (
    <motion.div>
      {/* https://steamcommunity.com/profiles/76561198053881733
      <br />
    https://steamcommunity.com/id/JEPZTEIN/ */}
      <h1>Too many steam games? Never know what to play?</h1>
      <h2>I got you.</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-input">Enter your steam profile URL</label>
        <input
          ref={userInputRef}
          id="user-input"
          placeholder="profile URL"
          type="text"
        />
        <motion.button whileTap={{ scale: 0.9 }} type="submit">
          Submit
        </motion.button>
      </form>
      {error ? <p>{error}</p> : null}
      {loading ? <p>LOADING...</p> : null}
    </motion.div>
  );
}
