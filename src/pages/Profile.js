import { useUser } from "../context/UserProvider";
import useUserPosts from "../hooks/useUserPosts";

import Nav from "../components/Nav";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePosts from "../components/ProfilePosts";

import noPosts from "../assets/cart-is-empty.svg";

import "./profile.scss";

export default function Profile() {
  const {
    user: { uid, displayName, photoURL, email },
  } = useUser();
  const { userPosts, isLoading } = useUserPosts(uid);
  console.log("los post del usuario", userPosts);

  return (
    <>
      <Nav />
      <div className="profile">
        <ProfileHeader
          displayName={displayName}
          photoURL={photoURL}
          email={email}
        />
        {userPosts.length <= 0 && !isLoading && (
          <>
            <h1>
              It seems like if you do not have any post yet, try uploading a new
              post.
            </h1>
            <img src={noPosts} alt="no posts found" />
          </>
        )}
        <ProfilePosts isLoading={isLoading} userPosts={userPosts} />
      </div>
    </>
  );
}
