const React = require('react')
const ReactDOM = require('react-dom')
const NoVNC = require('react-novnc').default

class ConnectionName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: ''}
    this.onNameChange = this.onNameChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onNameChange(e) {
    const name = e.target.value
    this.setState(() => ({name}))
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.state.name) this.props.onSubmit(this.state.name)
  }

  render() {
    return (
      <div className='w3-display-middle'>
        <form id='connect-form' onSubmit={this.onSubmit}>
          <label htmlFor='connectionString'>
            URL
          </label>
          <input type='text' name='connectionString' value={this.state.name} onChange={this.onNameChange} />
          <label>&nbsp;</label>
          <input type='submit' value='Connect' />
        </form>
      </div>
    )
  }
}

class Password extends React.Component {
  constructor(props) {
    super(props)
    this.state = {password: ''}
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onPasswordChange(e) {
    const password = e.target.value
    this.setState(() => ({password}))
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.state.password) this.props.onSubmit(this.state.password)
  }

  render() {
    return (
      <div className='w3-display-middle'>
        <form id='connect-password' onSubmit={this.onSubmit}>
          <label htmlFor='password'>
            Password
          </label>
          <input type='password' name='password' value={this.state.password} onChange={this.onPasswordChange} />
          <label>&nbsp;</label>
          <input type='submit' value='Connect' />
        </form>
      </div>
    )
  }
}

const Actions = (props) => {
  return (
    <div id='disconnect'>
      <button id='disconnect-btn' onClick={props.onDisconnect}>Disconnect</button>
    </div>
  )
}

class VncController extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      connectionName: null,
      needsPassword: false
    }

    this.onStart = this.onStart.bind(this)
    this.onDisconnected = this.onDisconnected.bind(this)
  }

  onStart(connectionName) {
    this.setState(() => ({connectionName}))
  }

  onDisconnected() {
    this.setState(() => ({connectionName: null}))
  }

  render() {
    if (!this.state.connectionName) return <ConnectionName onSubmit={this.onStart} />

    return (
      <div id='react-noVNC-demo'>
        <NoVNC connectionName={this.state.connectionName} onDisconnected={this.onDisconnected}
          actionsBar={(props) => <Actions onDisconnect={props.onDisconnect} />}
          passwordPrompt={(props) => <Password onSubmit={props.onSubmit} />}/>
      </div>
    );
  }
}

const Demo = (props) => {
  return (
    <div className='bgimg w3-display-container w3-animate-opacity w3-text-white'>
      <div className='w3-display-topleft w3-padding-large w3-xlarge'>
        VNC Demo (React)
      </div>
      <VncController />
    </div>
  )
}

ReactDOM.render(<Demo />,  document.getElementById('root'))
