// ModalComponent.tsx

import * as React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string) => void;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, onInsert }) => {
  const [dummyText, setDummyText] = React.useState<string | null>(null);
  const [userText, setUserText] = React.useState<string>('');

  React.useEffect(() => {
    if (isOpen) {
      setDummyText(null);
      setUserText('');
    }
  }, [isOpen]);

  const handleGenerate = () => {
    const newText = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;
    setDummyText(newText);
  };

  const handleInsert = () => {
    if (dummyText) {
      onInsert(dummyText);
      onClose();
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        {dummyText ? (
          <>
            <div style={styles.chatContainer}>
            <div style={styles.userMessage}>{userText || "User's input message"}</div>
              <div style={styles.botMessage}>{dummyText}</div>
            </div>
            <div style={styles.buttonContainer}>
              <button onClick={handleGenerate} style={{ ...styles.button, backgroundColor: '#6c757d' }}>
                Regenerate
              </button>
              <button onClick={handleInsert} style={styles.insertButton}>
                Insert
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter your message..."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleGenerate} style={styles.button}>
              Generate
            </button>
          </>
        )}
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
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '450px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center' as 'center',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'flex-start' as 'flex-start',
    marginBottom: '20px',
    borderRadius: '8px',
    backgroundColor: '#f1f1f1',
    padding: '15px',
    width: '100%',
  },
  userMessage: {
    backgroundColor: '#e1f7d5',
    padding: '10px',
    borderRadius: '15px',
    marginTop: '10px',
    maxWidth: '80%',
    alignSelf: 'flex-end', // Align to the right
    textAlign: 'right' as 'right',
  },
  botMessage: {
    backgroundColor: '#c8e6ff',
    padding: '10px',
    borderRadius: '15px',
    marginTop: '10px',
    maxWidth: '80%',
    alignSelf: 'flex-start', // Align to the left
    textAlign: 'left' as 'left',
  },
  buttonContainer: {
    display: 'flex' as 'flex',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#0a66c2',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  insertButton: {
    marginTop: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  input: {
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box' as 'border-box',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
};

export default ModalComponent;
