import "./imageUploader.scss";
import { db, storage } from "../firebaseConfig";
import firebase from "firebase";
import { useState } from "react";
import { useUser } from "../context/UserProvider";

export default function ImageUploader({ dismissModal, activateInlineMessage }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [uploadingPost, setUploadingPost] = useState(false);
  const {
    user: { uid, displayName, photoURL },
  } = useUser();

  const addPost = () => {
    setUploadingPost(true);
    const imageRef = storage.ref(`images/${image.name}`);
    const uploadTask = imageRef.put(image);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (err) {
        // Handle unsuccessful uploads
        console.log(err);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          db.collection("posts")
            .add({
              displayName,
              photoURL,
              uid,
              caption,
              likes: 0,
              image: url,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              setUploadingPost(false);
              dismissModal();
              activateInlineMessage();
            })
            .catch((err) => console.log("ocurrio un error", err));
        });
      }
    );
  };

  return (
    <div className="image-uploader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="image-uploader__icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <h3 className="image-uploader__title">Make a new post</h3>
      <form className="image-uploader__form">
        <label htmlFor="caption">Write a caption:</label>
        <input
          type="text"
          className="image-uploader__input"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className=" image-uploader__input--custom-btn"
        />
        {uploadingPost ? (
          <button
            aria-label="uploading post"
            type="button"
            className="image-uploader__button image-uploader__button--spinner"
          >
            <span></span>
          </button>
        ) : (
          <>
            <button
              type="button"
              disabled={caption && image ? false : true}
              onClick={addPost}
              className="image-uploader__button"
            >
              Add post
            </button>
            <button
              type="button"
              onClick={dismissModal}
              className="image-uploader__button image-uploader__button--cancel"
            >
              Cancel
            </button>
          </>
        )}
      </form>
    </div>
  );
}
