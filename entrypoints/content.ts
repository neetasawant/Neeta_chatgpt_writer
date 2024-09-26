export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    // Define a function to create and insert the AI button
    function insertAIButton(messageBox: HTMLElement) {
      // Check if the AI button already exists to prevent duplicates
      if (messageBox.querySelector('.ai-button')) {
        return;
      }

      // Create the AI button
      const aiButton = document.createElement('button');
      aiButton.className = 'ai-button';
      aiButton.innerText = 'AI';
      aiButton.style.position = 'absolute';
      aiButton.style.right = '10px';
      aiButton.style.top = '10px';
      aiButton.style.background = '#0a66c2'; // LinkedIn blue color
      aiButton.style.color = 'white';
      aiButton.style.border = 'none';
      aiButton.style.borderRadius = '5px';
      aiButton.style.padding = '5px';
      aiButton.style.cursor = 'pointer';
      aiButton.style.zIndex = '1000';

      // Attach event listener to the button
      aiButton.addEventListener('click', () => {
        console.log('AI Button Clicked');
        // Add your AI-related functionality here
      });

      // Ensure the container has `position: relative` to position the button correctly
      const container = messageBox.parentElement;
      if (container) {
        container.style.position = 'relative';
        container.appendChild(aiButton);
      }
    }

    // Create a MutationObserver to detect when new message boxes are added
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            // Check if the added node is the LinkedIn message box
            if (node instanceof HTMLElement && node.matches('.msg-form__contenteditable')) {
              console.log('Message box detected by MutationObserver!');
              insertAIButton(node);
            }
          });
        }
      }
    });

    // Start observing the document body for child additions
    observer.observe(document.body, { childList: true, subtree: true });

    // Optional: Insert AI button for message boxes already present in the DOM (if any)
    const existingMessageBoxes = document.querySelectorAll('.msg-form__contenteditable');
    existingMessageBoxes.forEach((box) => {
      insertAIButton(box as HTMLElement);
    });
  }
});
