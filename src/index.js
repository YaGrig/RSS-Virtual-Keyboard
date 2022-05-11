import { languageChange, pressButtons } from './components/button'
import './styles.css'

export const createIconHTML = (iconName) => {
  return `<i class = 'material-icons'>${iconName}</i>`
}

export const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    input: null,
    keys: [],
    explanation: null
  },

  properties: {
    value: '',
    capslock: false,
    language: 'english',
    funcButtons: [],
    keyLayoutEng: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      '↔', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑',
      'ctrl', 'win', 'alt', 'space', '←', '↕', '→'
    ],
    // keyLayoutRu: [
    //   'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
    //   'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
    //   'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'
    // ]
    keyLayoutRu: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      '↔', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑',
      'space', '←', '↕', '→'
    ]
  },

  addInteraction (key) {
    key.classList.add('key-activated')
    setTimeout(() => {
      key.classList.remove('key-activated')
    }, 500)
  },

  init () {
    this.elements.main = document.createElement('div')
    this.elements.keysContainer = document.createElement('div')
    this.elements.input = document.createElement('textarea')
    this.elements.input.classList.add('text-area')
    this.elements.explanation = document.createElement('div')
    const explanationText = document.createElement('p')

    this.elements.main.classList.add('keyboard')
    this.elements.keysContainer.classList.add('keyboard__wrapper')
    this.elements.keysContainer.appendChild(this.createKeys())
    this.elements.explanation.classList.add('exlanation_wrapper')
    this.elements.explanation.appendChild(explanationText)
    explanationText.classList.add('explanation_text')
    explanationText.innerHTML = 'Windows <br> shift + alt to change language'

    this.elements.main.appendChild(this.elements.keysContainer)
    this.elements.main.appendChild(this.elements.input)
    this.elements.main.appendChild(this.elements.explanation)
    document.body.appendChild(this.elements.main)
    this.elements.input.value = this.properties.value
  },
  toggleCapsLock () {
    if (this.properties.capslock === false) {
      this.elements.keys.forEach(item => {
        if (!this.properties.funcButtons.includes(item)) {
          item.textContent = item.textContent.toUpperCase()
        }
      })
      this.properties.capslock = true
    } else if (this.properties.capslock === true) {
      this.elements.keys.forEach(item => {
        if (!this.properties.funcButtons.includes(item)) {
          item.textContent = item.textContent.toLowerCase()
        }
      })
      this.properties.capslock = false
    }
  },
  refrechValue () {
    this.elements.input.value = this.properties.value
  },

  createKeys () {
    const fragment = document.createDocumentFragment()
    const keyLayout = this.properties.keyLayoutEng

    keyLayout.forEach(key => {
      const keyElement = document.createElement('button')
      const lineBreaker = ['backspace', ']', 'enter', '↑'].indexOf(key) !== -1
      const extraKeysCode = ['BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Backslash', 'Comma', 'Period', 'Slash', 'Backquote', 'Minus', 'Equal', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'Tab']
      const extraKeys = ['[', ']', ';', '\'', '\\', ',', '.', '/', '`', '-', '=', '↑', '←', '→', '↕', '↔']

      keyElement.setAttribute('type', 'button')
      keyElement.classList.add('key')
      keyElement.dataset.key = `Key${key.toUpperCase()}`
      keyElement.dataset.Ru = this.properties.keyLayoutRu[keyLayout.indexOf(key)]
      keyElement.dataset.Eng = this.properties.keyLayoutEng[keyLayout.indexOf(key)]
      if (extraKeys.includes(key)) {
        keyElement.dataset.Extra = extraKeysCode[extraKeys.indexOf(key)]
      }

      switch (key) {
        case 'backspace':
          keyElement.classList.add('wider')
          keyElement.innerHTML = createIconHTML('backspace')
          this.properties.funcButtons.push(keyElement)

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
            this.refrechValue()
            this.addInteraction(keyElement)
          })
          break

        case '↔':
          keyElement.classList.add('wider')
          this.properties.funcButtons.push(keyElement)
          keyElement.textContent = key.toLowerCase()
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
            this.refrechValue()
            this.addInteraction(keyElement)
          })
          break
        case 'del':
          keyElement.classList.add('wider')
          this.properties.funcButtons.push(keyElement)
          keyElement.textContent = key.toLowerCase()
          keyElement.addEventListener('click', () => {
            this.properties.value += '    '
            this.refrechValue()
            this.addInteraction(keyElement)
          })
          break
        case 'shift':
          keyElement.classList.add('shift')
          this.properties.funcButtons.push(keyElement)
          keyElement.textContent = key.toLowerCase()
          keyElement.addEventListener('click', () => {
            this.addInteraction(keyElement)
          })
          break
        case 'caps':
          keyElement.classList.add('wider')
          keyElement.innerHTML = createIconHTML('keyboard_capslock')
          this.properties.funcButtons.push(keyElement)

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock()
            this.addInteraction(keyElement)
          })
          break

        case 'enter':
          keyElement.classList.add('wider')
          keyElement.innerHTML = createIconHTML('subdirectory_arrow_right')
          this.properties.funcButtons.push(keyElement)

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n'
            this.refrechValue()
            this.addInteraction(keyElement)
          })
          break

        case 'space':
          keyElement.classList.add('extra-wider', 'space')
          keyElement.innerHTML = createIconHTML('space_bar')
          this.properties.funcButtons.push(keyElement)

          keyElement.addEventListener('click', () => {
            this.properties.value += ' '
            this.refrechValue()
            this.addInteraction(keyElement)
          })
          break
        case 'ctrl':
          keyElement.classList.add('wider')
          keyElement.textContent = key.toLowerCase()
          this.properties.funcButtons.push(keyElement)
          break
        case 'alt':
          keyElement.classList.add('wider')
          keyElement.textContent = key.toLowerCase()
          this.properties.funcButtons.push(keyElement)
          keyElement.addEventListener('click', () => {
            this.addInteraction(keyElement)
          })
          break
        case 'win':
          keyElement.textContent = key.toLowerCase()
          this.properties.funcButtons.push(keyElement)
          keyElement.addEventListener('click', () => {
            this.addInteraction(keyElement)
          })
          break
        case '↑':
          keyElement.classList.add('wider')
          keyElement.textContent = key.toLowerCase()
          this.properties.funcButtons.push(keyElement)
          keyElement.addEventListener('click', () => {
            this.addInteraction(keyElement)
          })
          break
        case '←':
          keyElement.classList.add('wider')
          keyElement.textContent = key.toLowerCase()
          this.properties.funcButtons.push(keyElement)
          keyElement.addEventListener('click', () => {
            this.properties.value += '←'
            this.refrechValue()
            this.addInteraction(keyElement)
          })
          break
        case '↕':
          keyElement.classList.add('wider')
          keyElement.textContent = key.toLowerCase()
          this.properties.funcButtons.push(keyElement)
          keyElement.addEventListener('click', () => {
            this.properties.value += '↕'
            this.refrechValue()
            this.addInteraction(keyElement)
          })
          break
        case '→':
          keyElement.classList.add('wider')
          keyElement.textContent = key.toLowerCase()
          this.properties.funcButtons.push(keyElement)
          keyElement.addEventListener('click', () => {
            this.properties.value += '→'
            this.refrechValue()
            this.addInteraction(keyElement)
          })
          break
        default:
          keyElement.textContent = key.toLowerCase()
          keyElement.addEventListener('click', () => {
            if (this.properties.language === 'english') {
              this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase()
              this.refrechValue()
            } else {
              this.properties.value += this.properties.capslock ? keyElement.dataset.Ru.toUpperCase() : keyElement.dataset.Ru.toLowerCase()
              this.refrechValue()
            }
            this.addInteraction(keyElement)
          })
          break
      }
      this.elements.keys.push(keyElement)
      fragment.appendChild(keyElement)

      if (lineBreaker) {
        fragment.appendChild(document.createElement('br'))
      }
    })

    return fragment
  }
}

window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init()
  if (localStorage.getItem('language') === 'russian') {
    languageChange()
  }
})

let keyPressed = []
let pressedButton = []

document.addEventListener('keydown', (event) => {
  keyPressed.push(event)
  keyPressed.forEach(item => {
    // pressButtons(item, item.code, item.key)
    pressedButton.push(pressButtons(item, item.code, item.key))
    pressedButton.map(item => item.classList.add('key-activated'))
  })
})

document.addEventListener('keyup', (event) => {
  keyPressed = []
  pressedButton.map(item => item.classList.remove('key-activated'))
  pressedButton = []
})
