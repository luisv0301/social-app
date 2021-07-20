import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";

import Comments from "../components/Comments";
import Nav from "../components/Nav";
import HorizontalPostSkeleton from "../components/skeletons/HorizontalPostSkeleton";

import "./horizontalPost.scss";

export default function HorizontalPost() {
  const [individualPost, setIndividualPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(id)
      .onSnapshot((post) => {
        console.log("el console desde individual post listener...");
        const data = post.data();
        setIndividualPost(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [id]);

  return (
    <>
      <Nav />
      {loading && <HorizontalPostSkeleton />}
      {!loading && (
        <div className="horizontal-post">
          <img
            src={individualPost?.image}
            alt={individualPost?.displayName}
            className="horizontal-post__img"
          />

          <div className="horizontal-post__wrapper">
            <div className="horizontal-post__text">
              <img
                src={individualPost?.photoURL}
                alt={individualPost?.displayName}
                className="horizontal-post__profile-img"
              />
              <h4 className="horizontal-post__user">
                {individualPost?.displayName}
              </h4>
              <p className="horizontal-post__caption">
                {individualPost?.caption}
              </p>
              <ul className="horizontal-post__comments">
                {individualPost?.comments?.map(({ comment, user }) => (
                  <li className="post__comment">
                    <h5>{user}</h5>
                    <p>{comment}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Comments id={id} displayName={individualPost?.displayName} />
          </div>
        </div>
      )}
    </>
  );
}
