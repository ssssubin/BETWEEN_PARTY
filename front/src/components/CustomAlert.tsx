import "./CustomAlert.css";

export default function CustomAlert({ open, title, message, onClose }: { open: boolean; title: string; message: string; onClose: any }) {
  if (!open) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <h2>{title}</h2>
        <p>{message}</p>
        <button id="alert-ok" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}
