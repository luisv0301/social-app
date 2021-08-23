import "./postDeleted.scss";
import { Link } from "react-router-dom";

export default function PostDeleted() {
  return (
    <div className="post-deleted">
      <h2>Your post have been deleted</h2>
      <p>
        Go back to
        <Link to="/" className="post-deleted__link">
          Home
        </Link>
      </p>
    </div>
  );
}
