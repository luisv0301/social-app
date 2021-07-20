import SignInForm from "../components/SignInForm";
import ship from "../assets/ship2png.png";
import firebase from "firebase";
import { auth } from "../firebaseConfig";

import "./login.scss";

export default function LogIn() {
  console.log("se esta renderizando el compónente login...");

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => {
        console.log("sesion iniciada con exitó");
      })
      .catch((err) => console.log("el error", err.message));
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <img src={ship} alt="ship" />
        <SignInForm signInWithGoogle={signInWithGoogle} />
      </div>
    </div>
  );
}
