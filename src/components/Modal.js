import reactDom from "react-dom";
import "./modal.scss";

export default function Modal({ children, isModalActive }) {
  if (!isModalActive) return null;
  return reactDom.createPortal(
    <>
      <div className="modal__overlay">{children}</div>
    </>,
    document.getElementById("portal")
  );
}
