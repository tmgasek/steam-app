import React, { useEffect, useState } from "react";
import { BasicGame, GameData, User } from "@types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type LibraryProps = {
  user: User;
  games: BasicGame[];
  setMode: (mode: "search" | "randomiser") => void;
};

export default function Randomiser({ user, games, setMode }: LibraryProps) {
  const [chosenGame, setChosenGame] = useState<BasicGame | null>(null);
  const [imgBg, setImgBg] = useState<string>("");

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
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col items-center h-screen w-screen relative `}
        style={{
          backgroundImage: imgBg ? `url(${imgBg})` : "",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transition: "0.5s linear",
        }}
      >
        <button
          className="absolute left-50% top-4 border p-2"
          onClick={() => setMode("search")}
        >
          Search again?
        </button>
        <div className="mt-44 flex flex-col items-center">
          <h1 className="text-8xl m-4">Hey, {user?.personaname}</h1>
          <p className="text-2xl m-4">You have {games.length} games.</p>
          <p>Not sure what to play?</p>
          <button
            className="bg-red-600 text-3xl rounded-2xl m-4 px-8 py-6 hover:contrast-75"
            onClick={selectGame}
          >
            Randomise!
          </button>
        </div>
        {chosenGame ? (
          <ChosenGame game={chosenGame} setImgBg={setImgBg} />
        ) : null}
      </motion.div>
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
        console.log(error);
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
