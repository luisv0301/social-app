import { useState } from "react";
import firebase from "firebase";
import { db } from "../firebaseConfig";

export default function useComment(postID, displayName) {
  const [comment, setComment] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postID)
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

  return { comment, setComment, addComment };
}
