import "./postSkeleton.scss";

export default function PostSkeleton() {
  return (
    <div className="post-skeleton">
      <div className="post-skeleton__img"></div>
      <div className="post-skeleton__wrapper">
        <div className="post-skeleton__text">
          <div className="post-skeleton__profile-img"> </div>
          <div className="post-skeleton__caption"></div>
          <div className="post-skeleton__comments"></div>
        </div>
      </div>
    </div>
  );
}
