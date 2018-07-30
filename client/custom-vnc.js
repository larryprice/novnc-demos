const RFB = require('novnc-core').default
let rfb = null

const disconnect = () => {
  if (!rfb) return
  console.debug(`Disconnecting from ${rfb._url}`)
  document.getElementById('connect-setup').classList.remove('hidden')
  document.getElementById('noVNC-canvas').classList.add('hidden')
  rfb.disconnect()
  rfb = null
}

const connect = (address, password) => {

  try {
    rfb = new RFB(document.getElementById('noVNC-canvas'), `ws://${address}`,
      {credentials: {password: password}})
    rfb.addEventListener('connect', () => console.debug(`Connected to ${address}`))
    rfb.addEventListener('disconnect', disconnect)
    rfb.scaleViewport = true
    rfb.resizeSession = true
  } catch (err) {
    console.error('Unable to create RFB client -- ' + err)
  }
}
window.addEventListener('DOMContentLoaded', (e) => {
  document.getElementById('connect-form').addEventListener('submit', (e) => {
    e.preventDefault()
    connect(e.target[0].value, e.target[1].value)
    document.getElementById('connect-setup').classList.add('hidden')
    document.getElementById('noVNC-canvas').classList.remove('hidden')
    setTimeout(disconnect, 10000)
  })
})
