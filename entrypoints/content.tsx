import * as React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'; 
import ModalComponent from './components/ModalComponent';

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    let isModalOpen = false;
    let activeMessageBox: HTMLElement | null = null; 
    let modalRoot: any = null; 

    const toggleModal = () => {
      isModalOpen = !isModalOpen;
      console.log(isModalOpen, 'is modal open');
      renderModal(); 
    };

    
    const handleInsertText = (text: string) => {
      if (!activeMessageBox) {
        console.warn("activeMessageBox is null. Cannot insert text.");
        return; 
      }

      activeMessageBox.innerHTML = ''; 

      const p = document.createElement('p');
      p.textContent = text; 

      activeMessageBox.appendChild(p); 

      const placeholder = activeMessageBox.nextElementSibling;
      if (placeholder instanceof HTMLElement && placeholder.classList.contains('msg-form__placeholder')) {
        placeholder.style.display = 'none'; 
      }

      activeMessageBox.focus();

      const range = document.createRange();
      const selection = window.getSelection();
      
      if (selection) {
        range.selectNodeContents(activeMessageBox);
        range.collapse(false); 
        selection.removeAllRanges();
        selection.addRange(range);
      }

      closeModal(); 
    };

    const closeModal = () => {
      isModalOpen = false;
      renderModal(); 
    };

    function insertAIButton(messageBox: HTMLElement) {
      if (messageBox.querySelector('.ai-button')) return;

      const aiButton = document.createElement('img');
      aiButton.src = browser.runtime.getURL('/icon/ai-icon.png');  
      aiButton.style.position = 'absolute';
      aiButton.style.right = '5px';
      aiButton.style.bottom = '5px';  
      aiButton.style.width = '30px';
      aiButton.style.height = '30px';  
      aiButton.style.cursor = 'pointer';
      aiButton.style.zIndex = '1000';
      aiButton.addEventListener('click', () => {
        activeMessageBox = messageBox; 
        toggleModal(); 
      });

      const container = messageBox.parentElement;
      if (container) {
        container.style.position = 'relative';
        container.appendChild(aiButton);
      }
    }

    function renderModal() {
      const modalContainerId = 'ai-modal-container';
      let modalContainer = document.getElementById(modalContainerId);

      if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = modalContainerId;
        document.body.appendChild(modalContainer);
      }

      if (!modalRoot) {
        modalRoot = createRoot(modalContainer); 
      }

      modalRoot.render(
        <ModalComponent
          isOpen={isModalOpen}
          onClose={closeModal} 
          onInsert={handleInsertText} 
        />
      );
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.matches('.msg-form__contenteditable')) {
              insertAIButton(node);
            }
          });
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Add AI buttons to any existing message boxes
    const existingMessageBoxes = document.querySelectorAll('.msg-form__contenteditable');
    existingMessageBoxes.forEach((box) => {
      insertAIButton(box as HTMLElement);
    });

    renderModal(); // Initial render
  },
});
