import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";

export default function useUserPosts(uid) {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    db.collection("posts")
      .where("uid", "==", uid)
      .get()
      .then((results) => {
        const data = results.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserPosts(data);
        setIsLoading(false);
      });
  }, [uid]);
  return { userPosts, isLoading };
}
