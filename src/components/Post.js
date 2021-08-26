import "./post.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Comments from "./Comments";
import Likes from "./Likes";

export default function Post({
  displayName,
  photoURL,
  caption,
  likes,
  image,
  id,
  comments,
}) {
  return (
    <article className="post">
      <LazyLoadImage
        className="post__img"
        alt={caption}
        height="400px"
        width="100%"
        src={image}
        effect="blur"
      />
      <div className="post__wrapper">
        <div className="post__text">
          <div className="post__description">
            <img
              src={photoURL}
              alt={displayName}
              className="post__profile-img"
            />
            <h4 className="post__user">{displayName}</h4>
            <p className="post__caption">{caption}</p>
          </div>
          <div className="post__likes">
            <p>{likes}</p>
            <Likes postID={id} likesValue={likes} />
          </div>
        </div>
        <Link to={`/post/${id}`} className="post__comments">
          {comments?.length > 0
            ? `${comments?.length} comments...`
            : "No comments yet"}
        </Link>
        <Comments postID={id} />
      </div>
    </article>
  );
}
