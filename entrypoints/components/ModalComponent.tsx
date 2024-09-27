import * as React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Generate response</h2>
        <input type="text"/>
        <button onClick={onClose} style={styles.closeButton}>
          Generate
        </button>
      </div>
    </div>,
    document.body
  );
};

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    maxWidth: '100%',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  closeButton: {
    marginTop: '10px',
    backgroundColor: '#0a66c2',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

export default ModalComponent;
