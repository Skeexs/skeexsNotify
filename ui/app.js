const notification_types = {
  ['success']: {
    ['icon']: 'bi bi-check2-circle',
  },
  ['error']: {
    ['icon']: 'bi bi-exclamation-circle',
    prefix: '~r~',
  },
  ['info']: {
    ['icon']: 'bi bi-bell',
    prefix: '~lb~',
  },
  ['bag']: {
    ['icon']: 'bi bi-bag',
    prefix: '~lg~',
  },
  ['message']: {
    ['icon']: 'bi bi-chat-square-text',
    prefix: '~w~',
  },
  ['phone']: {
    ['icon']: 'bi bi-telephone-inbound',
    prefix: '~w~',
  },
}

const color_map = {
  red: 'red',
  blue: 'blue',
  green: 'green',
  yellow: 'yellow',
  purple: 'purple',
  pink: 'pink',
  orange: 'orange',
  grey: 'grey',
  darkerGrey: 'darkgrey',
  black: 'black',
  newLine: '\n',
  defaultWhite: 'white',
  white: 'white',
  boldText: 'bold',
}

const color_codes = {
  '~r~': color_map.red,
  '~b~': color_map.blue,
  '~g~': color_map.green,
  '~y~': color_map.yellow,
  '~p~': color_map.purple,
  '~q~': color_map.pink,
  '~o~': color_map.orange,
  '~c~': color_map.grey,
  '~m~': color_map.darkerGrey,
  '~u~': color_map.black,
  '~n~': color_map.newLine,
  '~s~': color_map.defaultWhite,
  '~w~': color_map.white,
  '~h~': color_map.boldText,
}

function applyFancyHighlighting(message) {
  let parts = message.split('~h~')

  let highlightedMessage = parts
    .map((part, index) => {
      if (index % 2 !== 0) {
        let color = colors[index % colors.length]
        let style =
          index % 4 === 1 ? 'font-weight: bold;' : 'font-style: italic;'
        return `<span style="${style} color: ${color}">${part}</span>`
      }
      return part
    })
    .join('')

  return highlightedMessage
}

function replace_colorMappings(message, stringModifiers) {
  Object.entries(stringModifiers).forEach(([key, value]) => {
    message = message.split(key).join(value)
  })
  return message
}

function createNotification(data = {}) {
  let id = Math.floor(Math.random() * 1000000)

  Object.entries(color_codes).forEach(([color, value]) => {
    if (!data.message.includes(color)) return console.log('No color found')

    let stringModifiers = {}

    if (data.message.includes(color_codes['~h~'])) {
      stringModifiers[
        color
      ] = `<span style="font-weight: bold; color: ${value}">`
    }

    // stringModifiers[color] = `<span style="color: ${value}">`
    // stringModifiers['~s~'] = `</span>`

    data.message = replace_colorMappings(data.message, stringModifiers)
  })

  let notification_template = $(
    `<div class="notification unfold" id="${id}">
        <div class="type">
            <i
                class="${$TYPES[data.TYPE]['icon']}"
                style="font-size: 35px;"
            ></i>
        </div>

        <div class="message">
            <small class="title" style="font-size: 12px;">
                ${data.title ?? 'Notification'}
            </small>
            <span>${data.message ?? 'You have a new notification'}</span>
        </div>
    </div>`,
  ).appendTo(`.main`)

  setTimeout(() => {
    notification_template.addClass('fold').fadeOut(700)
  }, data.timeout ?? 5000)

  return notification_template
}

$(function () {
  window.addEventListener('message', function (event) {
    const { createNew, data } = event.data

    if (createNew) {
      createNotification(data)
    }
  })
})
