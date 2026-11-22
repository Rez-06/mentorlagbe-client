"use client";

export default function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", danger = false, busy = false, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-base-content/70">{message}</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className={`btn ${danger ? "btn-error" : "btn-primary"}`} onClick={onConfirm} disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : confirmLabel}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onCancel} />
    </div>
  );
}