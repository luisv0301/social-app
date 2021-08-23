import { useState, useContext, createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";
import firebase from "firebase";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const history = useHistory();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
        console.log("usuario despues de inciar sesion", result.user);
        history.push("/");
      })
      .catch((err) => console.log("el error", err.message));
  };

  const signOutWithGoogle = () => {
    auth
      .signOut()
      .then(() => console.log("se cerro la sesion"))
      .catch((err) => console.log(err));
  };

  console.log("se esta renderizando el provider...", user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user desde el listener provider", user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.log("no hay usuario desde el listener provider");
        history.push("/login");
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, signInWithGoogle, signOutWithGoogle }}>
      {children}
    </UserContext.Provider>
  );
}
