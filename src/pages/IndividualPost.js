import { useParams } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import useUniquePost from "../hooks/useUniquePost";

import Nav from "../components/Nav";
import HorizontalPostSkeleton from "../components/skeletons/HorizontalPostSkeleton";
import HorizontalPost from "../components/HorizontalPost";
import PostDeleted from "../components/PostDeleted";

export default function IndividualPost() {
  const { id: postID } = useParams();
  const {
    user: { uid },
  } = useUser();
  const { individualPost, isPostDeleted, isLoading, deletePost } =
    useUniquePost(postID);

  let mainContent;
  if (isPostDeleted) {
    mainContent = <PostDeleted />;
  }
  if (isLoading) {
    mainContent = <HorizontalPostSkeleton />;
  }
  if (!isPostDeleted && !isLoading) {
    mainContent = (
      <HorizontalPost
        individualPost={individualPost}
        uid={uid}
        deletePost={deletePost}
        postID={postID}
      />
    );
  }

  return (
    <>
      <Nav />
      {mainContent}
    </>
  );
}
