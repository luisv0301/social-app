import React, { useState } from "react";
import { useUser } from "../context/UserProvider";
import { Link } from "react-router-dom";

import Modal from "./Modal";
import ImageUploader from "./ImageUploader";

import "./nav.scss";
import InlineMessage from "./InlineMessage";

export default function Nav() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isInlineMessageActive, setIsInlineMessageActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user: { displayName, photoURL, signOutWithGoogle },
  } = useUser();

  return (
    <>
      <nav className="nav">
        <h4 className="nav__logo"> Instagram </h4>
        <div className="nav__items">
          <button
            className="nav__button"
            onClick={() => setIsModalActive(true)}
          >
            Add post
          </button>
          <div className="nav__menu">
            <button
              aria-haspopup="true"
              className="nav__profile"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <img
                src={photoURL}
                alt={displayName}
                className="nav__profile-img"
              />
            </button>
            <ul className={`nav__list ${isMenuOpen ? "open" : ""}`}>
              <li>
                <Link to={`/profile/${displayName}`} className="nav__item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={signOutWithGoogle}
                  aria-label="logout"
                  className="nav__item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Modal isModalActive={isModalActive}>
        <ImageUploader
          dismissModal={() => setIsModalActive(false)}
          activateInlineMessage={() => setIsInlineMessageActive(true)}
        />
      </Modal>
      {isInlineMessageActive && (
        <InlineMessage
          dismissInlineMessage={() => setIsInlineMessageActive(false)}
        />
      )}
    </>
  );
}
