import React, { useState } from "react";
import { useUser } from "../context/UserProvider";
import { auth } from "../firebaseConfig";

import Modal from "./Modal";
import ImageUploader from "./ImageUploader";
import "./nav.scss";
import { Link } from "react-router-dom";

export default function Nav() {
  const [modal, setModal] = useState(false);
  const {
    user: { displayName },
  } = useUser();

  const signOutWithGoogle = () => {
    auth
      .signOut()
      .then(() => console.log("se cerro la sesion"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav className="nav">
        <h4 className="nav__logo"> Instagram </h4>
        <div className="nav__items">
          <button className="nav__button" onClick={() => setModal(true)}>
            Add post
          </button>
          <div className="nav__user">
            <ul className="nav__list">
              <li className="nav__link">
                <Link to={`/profile/${displayName}`}>{displayName}</Link>
              </li>
              <li className="nav__link">
                <button onClick={signOutWithGoogle} aria-label="logout">
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
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Modal modal={modal}>
        <ImageUploader modalState={modal} cancelPost={() => setModal(false)} />
      </Modal>
    </>
  );
}
