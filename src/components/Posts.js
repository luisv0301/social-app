import "./posts.scss";
import Post from "./Post";
import PostSkeleton from "./skeletons/PostSkeleton";
import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("se esta renderizando el componente home...", posts);

  useEffect(() => {
    console.log("data listener...");
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((post) => {
        console.log("el console desde posts listeners..");
        const data = post.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <main className="posts">
      {loading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {posts && posts.map((post) => <Post {...post} key={post.id} />)}
    </main>
  );
}
