import {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ThemeContext} from '../ThemeContext'
import './index.css'

const Login = () => {
  const {theme, toggleTheme} = useContext(ThemeContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const history = useHistory()

  const onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 7})
    history.replace('/')
  }

  const submitForm = async e => {
    e.preventDefault()
    const data = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const responseData = await fetch('https://apis.ccbp.in/login', options)
    const dataResponse = await responseData.json()

    if (responseData.ok) {
      onSubmitSuccess(dataResponse.jwt_token)
    } else {
      setFormStatus(dataResponse.error_msg)
    }
  }

  return (
    <div
      className={`${theme === 'Dark' ? 'darkLoginPage' : ''} loginContainer`}
    >
      <form
        className={`${
          theme === 'Dark' ? 'darkSubContainer' : ''
        } subLoginContainer`}
      >
        <img
          className="loginPageLogo"
          src={`${
            theme === 'Dark'
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }`}
        />
        <div className="loginFormContainer">
          <label
            className={`${theme === 'Dark' ? 'darkLabel' : ''} labelLogin`}
            htmlFor="username"
          >
            USERNAME
          </label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="inputStylingLogin"
            placeholder="Username"
            id="username"
          />
          <label
            className={`${theme === 'Dark' ? 'darkLabel' : ''} labelLogin`}
            htmlFor="password"
          >
            PASSWORD
          </label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="inputStylingLogin"
            id="password"
            placeholder="Password"
            type={`${showPassword ? 'text' : 'password'}`}
          />
          <div>
            <input
              id="password"
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="password"
              className={`${theme === 'Dark' ? 'darkLabel' : ''}`}
            >
              Show Password
            </label>
          </div>
          <button onClick={submitForm} className="loginButtonStyling">
            Login
          </button>
          {formStatus !== '' ? (
            <p className={`${theme === 'Dark' ? 'loginFormErrorMessage' : ''}`}>
              *{formStatus}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export default Login
