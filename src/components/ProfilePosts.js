import PostSkeleton from "./skeletons/PostSkeleton";
import Post from "./Post";

import "./profilePosts.scss";

export default function ProfilePosts({ isLoading, userPosts }) {
  return (
    <div className="profile-posts">
      {isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {userPosts && userPosts.map((post) => <Post {...post} key={post.id} />)}
    </div>
  );
}
