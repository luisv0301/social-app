import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";

export default function useUniquePost(postID) {
  const [individualPost, setIndividualPost] = useState({});
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const deletePost = () => {
    db.collection("posts")
      .doc(postID)
      .delete()
      .then(() => setIsPostDeleted(true))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(postID)
      .onSnapshot((post) => {
        const data = post.data();
        setIndividualPost(data);
        setIsLoading(false);
      });
    return () => unsubscribe();
  }, [postID]);
  return { individualPost, isPostDeleted, isLoading, deletePost };
}
