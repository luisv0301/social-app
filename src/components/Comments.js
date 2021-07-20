import firebase from "firebase";
import { useState } from "react";
import { db } from "../firebaseConfig";

import "./comments.scss";

export default function Comments({ displayName, id }) {
  const [comment, setComment] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          comment,
          user: displayName,
        }),
      })
      .then(() => {
        console.log("comentario añadido con exito");
        setComment("");
      })
      .catch((err) => console.log("error al añadir comentario", err));
  };

  return (
    <form className="comments">
      <input
        type="text"
        placeholder="add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comments__input"
      />
      <button
        aria-label="add comment"
        disabled={comment ? false : true}
        className="comments__button"
        onClick={addComment}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
