import { Link, useHistory } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { auth } from "../firebaseConfig";
import "./drawer.scss";

export default function Drawer() {
  const history = useHistory();
  const {
    user: { photoURL, displayName, email },
  } = useUser();

  const signOutWithGoogle = () => {
    auth
      .signOut()
      .then(() => console.log("se cerro la sesion"))
      .catch((err) => console.log(err));
  };

  return (
    <aside className="aside">
      <div className="aside__header">
        <img src={photoURL} alt={displayName} className="aside__profile-pic" />
        <h3 className="aside__username">{displayName}</h3>
        <p className="aside__email">{email}</p>
      </div>
      <ul className="aside__menu">
        <li className="aside__item">
          <Link to="/" className="aside__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
        </li>
        <li className="aside__item">
          <Link to={`/${displayName}`} className="aside__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Profile
          </Link>
        </li>
      </ul>
      <button
        onClick={signOutWithGoogle}
        className="aside__link aside__link--bottom"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Settings
      </button>
    </aside>
  );
}
