import { db } from "./firebaseConfig";
import firebase from "firebase";

const addLike = (postID) => {
  db.collection("posts")
    .doc(postID)
    .update({
      likes: firebase.firestore.FieldValue.increment(1),
    })
    .then(() => {
      console.log("Like añadido con exito");
    })
    .catch((err) => console.log("error al añadir like", err));
};

export { addLike };
