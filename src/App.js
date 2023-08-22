import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'red']

class passwordManager extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  addContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({
      latestList: newList,
      isTrue: caseOf,
    })
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.WebsiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="passwordManager-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo-img"
        />

        <div className="password-container">
          <form className="password-card" onSubmit={this.addContent}>
            <h1 className="new-password-heading">Add New Password</h1>
            <form className="new-password-form">
              <div className="website-input-card">
                <button className="website-button" type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="website-logo"
                  />
                </button>
                <hr />
                <input
                  className="website-input"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
            </form>

            <div className="username-input-card">
              <button className="username-button" type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="username-logo"
                />
              </button>
              <hr />
              <input
                className="username-input"
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUserName}
                value={username}
              />
            </div>

            <div className="password-input-card">
              <button className="password-button" type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="password-logo"
                />
              </button>
              <hr />
              <input
                className="password-input"
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>

            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-logo"
          />
        </div>

        <div className="your-password-container">
          <div className="your-password-card">
            <div className="your-password-heading-card">
              <h1 className="your-password-heading">Your Passwords</h1>
              <p className="no-of-passwords">{newList.length}</p>
            </div>
            <div className="password-search-container">
              <button className="search-button" type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-logo"
                />
              </button>{' '}
              <hr />
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-password-card">
            <input
              type="checkbox"
              className="show-password-input"
              id="show-password"
            />
            <label className="password-check-label" htmlFor="show-password">
              show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="empty-image"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.amp(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.WebsiteName}</p>
                    <p className="website">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
                        alt="stars"
                        className="stars-image"
                      />
                    )}
                    {isShow && <p className="website">{eachValue.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                      alt="delete"
                      className="delete-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default passwordManager
