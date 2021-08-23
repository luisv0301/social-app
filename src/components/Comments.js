import { useUser } from "../context/UserProvider";
import useComment from "../hooks/useComment";
import "./comments.scss";

export default function Comments({ postID }) {
  const {
    user: { displayName },
  } = useUser();
  const { comment, setComment, addComment } = useComment(postID, displayName);

  return (
    <form className="comments">
      <input
        type="text"
        placeholder="add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comments__input"
      />
      <button
        aria-label="add comment"
        disabled={comment ? false : true}
        className="comments__button"
        onClick={addComment}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
