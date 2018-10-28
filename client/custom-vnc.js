const RFB = require('novnc-core').default
let rfb = null

const disconnect = (e) => {
  if (!rfb) return

  if (e.type === 'click' || !e.detail || e.detail.clean) {
    console.debug(`Disconnecting from ${rfb._url}`)
    rfb.disconnect()
  }

  document.getElementById('connect-setup').classList.remove('hidden')
  document.getElementById('connect-form').classList.remove('hidden')
  document.getElementById('connect-password').classList.add('hidden')
  document.getElementById('connected-view').classList.add('hidden')

  rfb = null
}

const onConnected = () => {
  console.debug(`Connected to ${rfb._url}`)
  document.getElementById('connect-setup').classList.add('hidden')
  document.getElementById('connect-password').classList.remove('hidden')
  document.getElementById('connected-view').classList.remove('hidden')
}

const onPasswordPrompt = () => {
  document.getElementById('connect-form').classList.add('hidden')
  document.getElementById('connect-password').classList.remove('hidden')
}

const connect = (address, password) => {
  try {
    rfb = new RFB(document.getElementById('noVNC-canvas'), `ws://${address}`)
    rfb.addEventListener('connect', onConnected)
    rfb.addEventListener('disconnect', disconnect)
    rfb.addEventListener('credentialsrequired', onPasswordPrompt)
    rfb.scaleViewport = rfb.resizeSession = true
  } catch (err) {
    console.error('Unable to create RFB client:', err)
  }
}

window.addEventListener('DOMContentLoaded', e => {
  document.getElementById('disconnect-btn').addEventListener('click', disconnect)
  document.getElementById('connect-password').addEventListener('submit', e => {
    e.preventDefault()
    rfb.sendCredentials({password: e.target[0].value})
  })
  document.getElementById('connect-form').addEventListener('submit', e => {
    e.preventDefault()

    connect(e.target[0].value)
  })
})
