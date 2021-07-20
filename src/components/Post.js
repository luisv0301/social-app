import "./post.scss";
import { Link } from "react-router-dom";
import Comments from "./Comments";

export default function Post({
  displayName,
  photoURL,
  caption,
  image,
  id,
  comments,
}) {
  return (
    <div className="post">
      <img src={image} alt={caption} className="post__img" />
      <div className="post__wrapper">
        <div className="post__text">
          <img src={photoURL} alt={displayName} className="post__profile-img" />
          <h4 className="post__user">{displayName}</h4>
          <p className="post__caption">{caption}</p>
          <Link to={`/post/${id}`} className="post__comments">
            {comments?.length > 0
              ? `${comments?.length} comments...`
              : "No comments yet"}
          </Link>
        </div>
        <Comments id={id} displayName={displayName} />
      </div>
    </div>
  );
}
