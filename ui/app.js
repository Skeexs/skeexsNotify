const $TYPES = {
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

const COLOR_CODES = {
  '~g~': 'green',
  '~r~': 'red',
  '~y~': 'yellow',
  '~b~': 'blue',
  '~lb~': 'lightblue',
  '~lg~': 'lightgreen',
  '~w~': 'white',
}

const REPLACE_COLORCODES = (string, obj) => {
  let stringToReplace = string

  for (let id in obj) {
    stringToReplace = stringToReplace.replace(new RegExp(id, 'g'), obj[id])
  }

  return stringToReplace
}

$NOTIFICATION = function (data = {}) {
  let id = $(`.notification`).length + 1

  for (color in COLOR_CODES) {
    if (data.Message.includes(color)) {
      let objArray = {}
      objArray[color] = `<span style="color: ${COLOR_CODES[color]}">`
      objArray['~s~'] = `</span>`

      let newString = REPLACE_COLORCODES(data.Message, objArray)

      data.Message = newString
    }
  }

  let $notification = $(
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
            <span>${data.Message ?? 'You have a new notification'}</span>
        </div>
    </div>`,
  ).appendTo(`.main`)

  setTimeout(() => {
    $notification.addClass('fold').fadeOut(700)
  }, data.Timeout ?? 5000)

  return $notification
}

$(function () {
  window.addEventListener('message', function (event) {
    if (event.data.createNew) {
      $NOTIFICATION({
        TYPE: event.data.TYPE,
        Message: event.data.Message,
        title: event.data.title,
        Timeout: event.data.Timeout,
      })
    }
  })
})
