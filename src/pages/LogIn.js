import { useUser } from "../context/UserProvider";
import SignInForm from "../components/SignInForm";
import ship from "../assets/ship2png.png";

import "./login.scss";

export default function LogIn() {
  const { signInWithGoogle } = useUser();
  return (
    <div className="login">
      <div className="login__wrapper">
        <img src={ship} alt="ship" />
        <SignInForm signInWithGoogle={signInWithGoogle} />
      </div>
    </div>
  );
}
