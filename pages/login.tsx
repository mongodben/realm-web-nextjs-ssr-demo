import { useEffect } from "react";
import realmApp from "../realm/app";
import * as Realm from "realm-web";
import { useCookies } from "react-cookie";
import Link from "next/link";

function LogIn() {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  useEffect(() => {
    realmApp
      .logIn(
        Realm.Credentials.emailPassword("benperlmutter94@gmail.com", "abc123")
      )
      .then((user) => {
        setCookie("accessToken", user.accessToken);
        console.log("accessToken", user.accessToken);
      });
  }, []);
  return (
    <div>
      <h1>Log In</h1>
      <p>test</p>
      <Link href="/data">
        <button>See GraphQL data</button>
      </Link>
    </div>
  );
}

export default LogIn;
