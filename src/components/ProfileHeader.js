import "./profileHeader.scss";

export default function ProfileHeader({ displayName, photoURL, email }) {
  return (
    <header className="profile-header">
      <img src={photoURL} alt={displayName} className="profile-header__img" />
      <div className="profile-header__text">
        <h3 className="profile-header__user">{displayName}</h3>
        <p className="profile-header__email">{email}</p>
      </div>
    </header>
  );
}
