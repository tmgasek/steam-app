import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Library from "../components/Library";
import Search from "../components/Search";

const Home: NextPage = () => {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState(null);

  console.log({ user });
  console.log({ games });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Search setGames={setGames} setUser={setUser} />
        {user ? <Library user={user} games={games} /> : null}
      </main>

      {/* <footer></footer> */}
    </>
  );
};

export default Home;
