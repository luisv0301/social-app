import Comments from "./Comments";

import "./horizontalPost.scss";

export default function HorizontalPost({
  individualPost,
  deletePost,
  postID,
  uid,
}) {
  return (
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
          <div className="horizontal-post__description">
            <p className="horizontal-post__caption">
              {individualPost?.caption}
            </p>
            {individualPost?.uid === uid ? (
              <button
                aria-label="delete post"
                onClick={deletePost}
                className="horizontal-post__button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            ) : null}
          </div>

          <ul className="horizontal-post__comments">
            {individualPost?.comments?.map(({ comment, user }, index) => (
              <li className="horizontal-post__comment" key={index}>
                <h5>{user}</h5>
                <p>{comment}</p>
              </li>
            ))}
          </ul>
        </div>
        <Comments postID={postID} />
      </div>
    </div>
  );
}
