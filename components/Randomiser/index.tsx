import React, { useEffect, useState } from "react";
import { BasicGame, GameData, User } from "@types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDebounce } from "../../hooks/useDebounce";

//TODO:
/*
Debounce the onClick randomiser
Fix the background image / Image cmp smoothness (quality?)
*/

type LibraryProps = {
  user: User;
  games: BasicGame[];
};

export default function Randomiser({ user, games }: LibraryProps) {
  const [chosenGame, setChosenGame] = useState<BasicGame | null>(null);
  const [imgBg, setImgBg] = useState<string>("");
  const router = useRouter();

  const selectGame = () => {
    // get random game from games array
    const randomGame = games[Math.floor(Math.random() * games.length)];
    setChosenGame(randomGame);
  };

  return (
    <>
      {imgBg && (
        <Image
          src={imgBg}
          alt="bg"
          priority
          layout="fill"
          objectFit="cover"
          className="-z-10"
          quality={100}
          objectPosition="center"
        />
      )}
      <div
      // style={{
      //   backgroundImage: imgBg ? `url(${imgBg})` : "",
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   transition: "0.5s linear",
      // }}
      >
        <button onClick={() => router.push("/")}>Search again?</button>
        <div>
          <h1>Hey, {user?.personaname}</h1>
          <p>You have {games.length} games.</p>
          <p>Not sure what to play?</p>
          <button onClick={selectGame}>Randomise!</button>
        </div>
        {chosenGame ? (
          <ChosenGame game={chosenGame} setImgBg={setImgBg} />
        ) : null}
      </div>
    </>
  );
}

type ChosenGameProps = {
  game: BasicGame;
  setImgBg: (img: string) => void;
};

function ChosenGame({ game, setImgBg }: ChosenGameProps) {
  const [data, setData] = useState<GameData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGameInfo = async () => {
      try {
        const res = await fetch(`/api/game/${game.appid}`);
        const data = await res.json();
        setData(data);
        setImgBg(data?.background || "");
      } catch (error) {
        setError("You're going too fast bucko...");
        setTimeout(() => setError(null), 3000);
        console.error(error);
      }
    };
    getGameInfo();
  }, [game, setImgBg]);
  return (
    <>
      <div>
        <img src={data?.header_image} width={400} />
        {error ? <p>{error}</p> : null}
      </div>
    </>
  );
}
