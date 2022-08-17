import Link from "next/link";

export default function FourOhFour() {
  return (
    <div>
      <h1>404</h1>
      <p>Did you forget to make your steam profile public?</p>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </div>
  );
}
