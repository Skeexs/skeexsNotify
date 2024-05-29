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
  newLine: '\n', // assuming this is meant to indicate a newline
  defaultWhite: 'white', // assuming default white means white
  white: 'white',
  boldText: 'bold', // assuming this means text should be bold
}
const color_codes = {
  '~r~': colorMappings.red,
  '~b~': colorMappings.blue,
  '~g~': colorMappings.green,
  '~y~': colorMappings.yellow,
  '~p~': colorMappings.purple,
  '~q~': colorMappings.pink,
  '~o~': colorMappings.orange,
  '~c~': colorMappings.grey,
  '~m~': colorMappings.darkerGrey,
  '~u~': colorMappings.black,
  '~n~': colorMappings.newLine,
  '~s~': colorMappings.defaultWhite,
  '~w~': colorMappings.white,
  '~h~': colorMappings.boldText,
}

function replace_colorMappings(string, obj) {
  let stringToReplace = string

  for (let id in obj) {
    stringToReplace = stringToReplace.replace(new RegExp(id, 'g'), obj[id])
  }

  return stringToReplace
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
    } else {
      stringModifiers[color] = `<span style="color: ${value}">`
    }

    stringModifiers['~s~'] = `</span>`
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
