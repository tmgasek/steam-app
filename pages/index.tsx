import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const res = await fetch("/api/getLibrary");
      const data = await res.json();
      console.log(data);
      setGames(data.response.games);
    };
    getGames();
  }, []);

  useEffect(() => {
    const getName = async (id) => {
      // const resp = await fetch(`/api/getName`);
      // console.log(resp);
    };
    // const mapAllGames = async () => {
    //   let mappedGames = await Promise.all(
    //     games.map(async (item: any) => {
    //       return {
    //         appid: item.appid,
    //         title: await fetch(
    //           `https://store.steampowered.com/api/appdetails?appids=${item.appid}`
    //         ),
    //       };
    //     })
    //   );

    //   setAllGames(mappedGames);
    // };

    getName(10);
    // mapAllGames();
  }, [games]);

  // useEffect(() => {
  //   const getGameObjs = async () => {
  //     const namedGames = await Promise.all(
  //       games.map(async (game: any) => {
  //         console.log(game.appid);
  //         const gameName = await fetch(
  //           `https://store.steampowered.com/api/appdetails?appids=${game.appid}`
  //         );
  //         console.log(gameName);
  //       })
  //     );
  //   };
  //   if (games && games.length > 0) {
  //     getGameObjs();
  //   }
  // }, [games]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl">hi jonas u stupid fuck</h1>
        {JSON.stringify(games)}
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
