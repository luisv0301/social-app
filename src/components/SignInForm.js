import "./signInForm.scss";

export default function SignInForm({ signInWithGoogle }) {
  return (
    <div className="form">
      <h3 className="form__tittle">Sign In</h3>
      <button onClick={signInWithGoogle} type="button" className="form__button">
        Sign in with Google
      </button>
    </div>
  );
}
