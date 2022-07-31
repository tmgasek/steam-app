import { BasicGame, User } from "@types";
import React, { FormEvent } from "react";

interface Props {
  setUser: (user: User) => void;
  setGames: (games: BasicGame[]) => void;
}

const Search = ({ setUser, setGames }: Props) => {
  const userInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  /*
https://steamcommunity.com/profiles/76561198008087615/
https://steamcommunity.com/id/JEPZTEIN/
https://steamcommunity.com/id/mirko2828/
*/
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const input = userInputRef.current?.value;
    if (
      !input.match(
        /(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/
      )
    ) {
      console.error("wrong url");
      return;
    }

    let steamId: string;
    // HANDLE /PROFILES/STEAMID type of url
    if (input.includes("profiles")) {
      steamId = input.split("/")[4];
    } else {
      // HANDLE /ID/ type of url
      const urlName = input.split("/")[4];
      const vanityUrlRes = await fetch(`/api/user/vanity/${urlName}`);
      steamId = await vanityUrlRes.json();
    }

    const userResp = await fetch(`/api/user/${steamId}`);
    const userData = await userResp.json();
    setUser(userData);

    const gamesRes = await fetch(`/api/games/${steamId}`);
    const gamesData = await gamesRes.json();
    setGames(gamesData);
  };

  return (
    <div className="">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="user-input">Enter your steam profile URL</label>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-700 text-center w-96"
          ref={userInputRef}
          id="user-input"
          placeholder="profile URL"
          type="text"
        />
        <button
          className="my-4 bg-transparent hover:bg-red-700 text-red-40 font-semibold hover:text-black py-2 px-4 border border-red-700 w-min  hover:border-transparent rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
