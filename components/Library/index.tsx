import React from "react";

const Library = ({ user, games }) => {
  return (
    <div>
      <h1 className="">{user?.personaname}</h1>
      <div>
        {games.map((game: any) => (
          <p key={game.appid}>{game.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Library;
