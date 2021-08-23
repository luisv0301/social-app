import usePosts from "../hooks/usePosts";

import Post from "./Post";
import PostSkeleton from "./skeletons/PostSkeleton";

import "./posts.scss";

export default function Posts() {
  const { posts, isLoading } = usePosts();

  return (
    <main className="posts">
      {isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {posts && posts.map((post) => <Post {...post} key={post.id} />)}
    </main>
  );
}
