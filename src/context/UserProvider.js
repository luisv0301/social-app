import { useState, useContext, createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const history = useHistory();
  console.log("se esta renderizando el provider...", user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user desde el listener provider", user);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/");
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
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
