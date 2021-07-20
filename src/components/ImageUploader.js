import "./imageUploader.scss";
import { db, storage } from "../firebaseConfig";
import firebase from "firebase";
import { useState } from "react";
import { useUser } from "../context/UserProvider";

export default function ImageUploader({ cancelPost }) {
  const [caption, setCaption] = useState(null);
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
              image: url,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              setUploadingPost(false);
              cancelPost();
            })
            .catch((err) => console.log("ocurrio un error", err));
        });
      }
    );
  };

  return (
    <div className="image-uploader">
      <h3 className="image-uploader__tittle">Make a new post</h3>
      <form className="image-uploader__form">
        <label htmlFor="caption">Write a caption</label>
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
              onClick={cancelPost}
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
