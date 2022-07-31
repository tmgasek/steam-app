import React, { useState } from "react";
import { BasicGame, User } from "@types";

type LibraryProps = {
  user: User;
  games: BasicGame[];
};

const Library = ({ user, games }: LibraryProps) => {
  const [chosen, setChosen] = useState<BasicGame | null>(null);

  const selectGame = () => {
    // get random game from games array
    const randomGame = games[Math.floor(Math.random() * games.length)];
    setChosen(randomGame);
  };

  return (
    <div>
      <h1 className="">{user?.personaname}</h1>
      <button
        className="bg-slate-500 rounded p-4 hover:contrast-75"
        onClick={selectGame}
      >
        Randomise!
      </button>
      <div></div>
      <div>
        {/* {games.map((game: any) => (
          <p key={game.appid}>{game.name}</p>
        ))} */}
        <p>You have {games.length} games</p>
      </div>
      {chosen ? <div>Your chosen game is: {chosen.name}</div> : null}
    </div>
  );
};

export default Library;
