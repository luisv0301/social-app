import "./horizontalPostSkeleton.scss";

export default function HorizontalPostSkeleton() {
  return (
    <div className="horizontal-post-skeleton">
      <div className="horizontal-post-skeleton__img"></div>
      <div className="horizontal-post-skeleton__wrapper">
        <div className="horizontal-post-skeleton__text">
          <div className="horizontal-post-skeleton__profile-img"></div>
          <div className="horizontal-post-skeleton__user"></div>
          <div className="horizontal-post-skeleton__comments"></div>
        </div>
      </div>
    </div>
  );
}
