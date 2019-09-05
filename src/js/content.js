/* content.js */
chrome.runtime.onMessage.addListener(({ message, isActive }) => {
  if (message === 'set-focused-reader-mode') {
    if (isActive) {
      document.body.classList.add('focused-reader-mode')
    } else {
      document.body.classList.remove('focused-reader-mode')
    }
  }
})
