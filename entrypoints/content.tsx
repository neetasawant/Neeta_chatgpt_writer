// contentScript.tsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import ModalComponent from './components/ModalComponent';

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    //modal visibility 
    let isModalOpen = false;
    const toggleModal = () => {
      isModalOpen = !isModalOpen;
      renderModal(); 
    };

    //button display
    function insertAIButton(messageBox: HTMLElement) {
      if (messageBox.querySelector('.ai-button')) return;

      const aiButton = document.createElement('button');
      aiButton.className = 'ai-button';
      aiButton.innerText = 'AI';
      aiButton.style.position = 'absolute';
      aiButton.style.right = '10px';
      aiButton.style.top = '10px';
      aiButton.style.background = '#0a66c2';
      aiButton.style.color = 'white';
      aiButton.style.border = 'none';
      aiButton.style.borderRadius = '5px';
      aiButton.style.padding = '5px';
      aiButton.style.cursor = 'pointer';
      aiButton.style.zIndex = '1000';

      aiButton.addEventListener('click', () => {
        console.log('AI button clicked');
        toggleModal(); 
      });

      const container = messageBox.parentElement;
      if (container) {
        container.style.position = 'relative';
        container.appendChild(aiButton);
      }
    }

    // render modal
    function renderModal() {
      const modalContainerId = 'ai-modal-container';
      let modalContainer = document.getElementById(modalContainerId);

      
      if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = modalContainerId;
        document.body.appendChild(modalContainer);
      }

      ReactDOM.render(
        <ModalComponent isOpen={isModalOpen} onClose={toggleModal} />,
        modalContainer
      );
    }

    //  track new LinkedIn message boxes
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

    // buttons to any existing message boxes
    const existingMessageBoxes = document.querySelectorAll('.msg-form__contenteditable');
    existingMessageBoxes.forEach((box) => {
      insertAIButton(box as HTMLElement);
    });

    renderModal();
  },
});
