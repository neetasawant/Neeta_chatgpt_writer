import * as React from 'react';
import { createRoot } from 'react-dom/client'; 
import ModalComponent from './components/ModalComponent';
import AiIcon from '@/assets/ai-icon.svg';

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    let isModalOpen = false;
    let activeMessageBox: HTMLElement | null = null; 
    let modalRoot: ReturnType<typeof createRoot> | null = null; 

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

      // Hide placeholder if applicable
      const placeholder = activeMessageBox.nextElementSibling;
      if (placeholder instanceof HTMLElement && placeholder.classList.contains('msg-form__placeholder')) {
        placeholder.style.display = 'none'; 
      }

      focusMessageBox(activeMessageBox);
      closeModal(); 
    };

    const focusMessageBox = (messageBox: HTMLElement) => {
      messageBox.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      
      if (selection) {
        range.selectNodeContents(messageBox);
        range.collapse(false); 
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };

    const closeModal = () => {
      isModalOpen = false;
      renderModal(); 
    };

    const insertAIButton = (messageBox: HTMLElement) => {
      if (messageBox.querySelector('.ai-button')) return;

      const aiButton = createAIButton(messageBox);
      const container = messageBox.parentElement;
      if (container) {
        container.classList.add('relative'); 
        container.appendChild(aiButton);
      }
    };

    const createAIButton = (messageBox: HTMLElement) => {
      const aiButton = document.createElement('img');
      aiButton.src = AiIcon;
      aiButton.className = 'absolute right-2 bottom-2 w-12 h-12 cursor-pointer z-50 ai-button'; 

      aiButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up
        activeMessageBox = messageBox; 
        console.log('AI button clicked'); // Debugging log
        toggleModal(); 
      });

      setupButtonVisibility(aiButton, messageBox);
      return aiButton;
    };

    const setupButtonVisibility = (aiButton: HTMLImageElement, messageBox: HTMLElement) => {
      messageBox.addEventListener('focus', () => {
        aiButton.style.display = 'block'; 
      });

      messageBox.addEventListener('blur', () => {
        setTimeout(() => {
          if (document.activeElement !== aiButton) { 
            aiButton.style.display = 'none'; 
          }
        }, 1000); 
      });
    };

    const renderModal = () => {
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
    };

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.matches('.msg-form__contenteditable')) {
              insertAIButton(node);
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Add AI buttons to existing message boxes
    document.querySelectorAll('.msg-form__contenteditable').forEach((box) => {
      insertAIButton(box as HTMLElement);
    });

    renderModal(); // Initial render
  },
});
