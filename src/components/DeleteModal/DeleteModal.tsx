import './DeleteModal.css';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ onConfirm, onCancel }: Props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p className="modal-text">ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?</p>
        <div className="modal-actions">
          <button className="modal-btn yes-btn" onClick={onConfirm}>Yes</button>
          <button className="modal-btn no-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;