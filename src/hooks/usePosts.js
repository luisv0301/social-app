import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((post) => {
        const data = post.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
        setIsLoading(false);
      });
    return () => unsubscribe();
  }, []);

  return { posts, isLoading };
}
