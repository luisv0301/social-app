import { useUser } from "../context/UserProvider";
import useUserPosts from "../hooks/useUserPosts";

import Post from "../components/Post";
import Nav from "../components/Nav";
import PostSkeleton from "../components/skeletons/PostSkeleton";

import "./profile.scss";

export default function Profile() {
  const {
    user: { uid, displayName, photoURL, email },
  } = useUser();
  const { userPosts, isLoading } = useUserPosts(uid);

  return (
    <>
      <Nav />
      <div className="profile">
        <div className="profile__description">
          <img src={photoURL} alt={displayName} className="profile__img" />
          <div className="profile__text">
            <h3 className="profile__user">{displayName}</h3>
            <p className="profile__email">{email}</p>
          </div>
        </div>
        <h3 className="profile__subtitle">Latest posts</h3>
        <div className="profile__posts">
          {isLoading && (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
          {userPosts &&
            userPosts.map((post) => <Post {...post} key={post.id} />)}
        </div>
      </div>
    </>
  );
}
