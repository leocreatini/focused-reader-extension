/* background.js */
import { compose } from 'ramda'

function getIsActive() {
  return new Promise((resolve, reject) => {
    try {
      return chrome.storage.local.get(['isActive'], result =>
        resolve(result.isActive)
      )
    } catch (error) {
      return reject(error)
    }
  })
}

function setIsActive(isActive) {
  try {
    chrome.storage.local.set({ isActive })
    return isActive
  } catch (error) {
    console.log(error)
  }
}

function setIcon(isActive) {
  try {
    const iconName = isActive ? 'on' : 'off'
    chrome.browserAction.setIcon({ path: `${iconName}.png` })
    return isActive
  } catch (error) {
    console.log(error)
  }
}

function setFocusModeInTabs(isActive) {
  try {
    chrome.tabs.query({ currentWindow: true }, tabs =>
      tabs.map(tab =>
        chrome.tabs.sendMessage(tab.id, {
          message: 'set-focused-reader-mode',
          isActive,
        })
      )
    )
    return isActive
  } catch (error) {
    console.log(error)
  }
}

const flipBoolean = isActive => !isActive

async function toggleActive() {
  try {
    return compose(
      setIcon,
      setFocusModeInTabs,
      setIsActive,
      flipBoolean
    )(await getIsActive())
  } catch (error) {
    console.log(error)
  }
}

async function useCurrentIsActiveToTab() {
  compose(
    setIcon,
    setFocusModeInTabs
  )(await getIsActive())
}

/* When user clicks Icon */
chrome.browserAction.onClicked.addListener(toggleActive)
/* When tab changes (focused, created, etc) */
chrome.tabs.onUpdated.addListener(useCurrentIsActiveToTab)
