import { Keyboard } from '..'

export const pressButtons = (event, keyCode, key) => {
  console.log(keyCode)
  const extraKeys = ['BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Backslash', 'Comma', 'Period', 'Slash', 'Backquote', 'Minus', 'Equal']
  if (event.shiftKey && event.altKey) {
    if (Keyboard.properties.language === 'english') {
      localStorage.setItem('language', 'russian')
      Keyboard.properties.language = 'russian'
      for (key of Keyboard.elements.keys) {
        if (key.dataset.Ru && Keyboard.properties.capslock === true && !Keyboard.properties.funcButtons.includes(key)) {
          key.textContent = key.dataset.Ru.toUpperCase()
        } else if (key.dataset.Ru && Keyboard.properties.capslock === false && !Keyboard.properties.funcButtons.includes(key)) {
          key.textContent = key.dataset.Ru.toLowerCase()
        }
      }
    } else {
      localStorage.clear()
      Keyboard.properties.language = 'english'
      for (key of Keyboard.elements.keys) {
        console.log(key, Keyboard.properties.capslock)
        if (Keyboard.properties.capslock === true && !Keyboard.properties.funcButtons.includes(key)) {
          key.textContent = key.dataset.Eng.toUpperCase()
        } else if (Keyboard.properties.capslock === false && !Keyboard.properties.funcButtons.includes(key)) {
          key.textContent = key.dataset.Eng.toLowerCase()
        }
      }
    }
  }
  if (keyCode === 'Backspace') {
    const button = document.querySelector('[data-key="KeyBACKSPACE"]')
    Keyboard.properties.value = Keyboard.properties.value.substring(0, Keyboard.properties.value.length - 1)
    event.preventDefault()
    Keyboard.refrechValue()
    return button
  } else if (keyCode === 'CapsLock') {
    const button = document.querySelector('[data-key="KeyCAPS"]')
    Keyboard.toggleCapsLock()
    event.preventDefault()
    Keyboard.refrechValue()
    return button
  } else if (keyCode === 'Enter') {
    const button = document.querySelector('[data-key="KeyENTER"]')
    Keyboard.properties.value += '\n'
    event.preventDefault()
    Keyboard.refrechValue()
    return button
  } else if (keyCode === 'Space') {
    const button = document.querySelector('[data-key="KeySPACE"]')
    Keyboard.properties.value += ' '
    event.preventDefault()
    Keyboard.refrechValue()
    return button
  } else if (keyCode === 'Tab') {
    const button = document.querySelector('[data--extra="Tab"]')
    Keyboard.properties.value += '    '
    event.preventDefault()
    Keyboard.refrechValue()
    return button
  } else if (keyCode.includes('Key')) {
    const button = document.querySelector(`[data-key="${keyCode}"]`)
    if (Keyboard.properties.language === 'english') {
      Keyboard.properties.value += button.textContent
    } else {
      Keyboard.properties.value += button.dataset.Ru
    }
    Keyboard.refrechValue()
    return button
  } else if (keyCode.includes('Digit')) {
    const button = document.querySelector(`[data-key="Key${keyCode.substring(keyCode.length, keyCode.length - 1)}"]`)
    Keyboard.properties.value += button.textContent
    Keyboard.refrechValue()
    return button
  } else if (keyCode.includes('Arrow')) {
    const button = document.querySelector(`[data--extra="${keyCode}"]`)
    Keyboard.properties.value += button.textContent
    Keyboard.refrechValue()
    const range = new Range()
    const a = document.querySelector('.text-area')
    range.setStart(a.firstChild, 1)
    range.setEnd(a.firstChild, 3)
    alert(range)
    return button
  } else if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    const button = document.querySelector('[data-key="KeySHIFT"]')
    event.preventDefault()
    return button
  } else if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
    const button = document.querySelector('[data-key="KeyCTRL"]')
    button.classList.add('key-activated')
    event.preventDefault()
    Keyboard.refrechValue()
    return button
  } else if (extraKeys.includes(keyCode)) {
    const button = document.querySelector(`[data--extra="${keyCode}"]`)
    if (Keyboard.properties.language === 'english') {
      Keyboard.properties.value += button.textContent
    } else {
      Keyboard.properties.value += button.dataset.Ru
    }
    Keyboard.refrechValue()
    return button
  } else if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
    const button = document.querySelector('[data-key="KeyALT"]')
    event.preventDefault()
    return button
  }
}

export const languageChange = () => {
  if (localStorage.getItem('language') === 'russian') {
    Keyboard.properties.language = 'russian'
    const keys = Keyboard.elements.keys
    for (let key = 0; key < keys.length; key++) {
      console.log(key)
      if (keys[key].dataset.Ru && !Keyboard.properties.funcButtons.includes(keys[key])) {
        keys[key].textContent = keys[key].dataset.Ru
      }
    }
  }
}
