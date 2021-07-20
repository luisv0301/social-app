import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import { db } from "../firebaseConfig";

import Post from "../components/Post";
import PostSkeleton from "../components/skeletons/PostSkeleton";

import "./profile.scss";

export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    user: { uid, displayName, photoURL, email },
  } = useUser();

  useEffect(() => {
    setLoading(true);
    db.collection("posts")
      .where("uid", "==", uid)
      .get()
      .then((results) => {
        const data = results.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("los post del usuario", data);
        setUserPosts(data);
        setLoading(false);
      });
  }, [uid]);

  return (
    <div className="profile">
      <div className="profile__description">
        <img src={photoURL} alt={displayName} className="profile__img" />
        <div className="profile__text">
          <h3 className="profile__user">{displayName}</h3>
          <p className="profile__email">{email}</p>
        </div>
      </div>
      <h3 className="profile__subtittle">Latest posts</h3>
      <div className="profile__posts">
        {loading && (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}
        {userPosts && userPosts.map((post) => <Post {...post} key={post.id} />)}
      </div>
    </div>
  );
}
