import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Login from './login'
import * as actions from '../action'

class Header extends React.Component {
  render(){
    return (
      <div>
        <div className="page-header">
          <h1>Simple Shopping Mall <small>with Universal JavaScript</small>
            {this.props.login? <a style={{float:'right'}} data-toggle="modal" data-target="#infoModal">{this.props.ID}</a> : ""}
          </h1>
        </div>
        <div id="infoModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 className="modal-title">{this.props.ID}</h4>
              </div>
                <div className="modal-body">
                  <p>Balance : ${this.props.balance}</p>
                </div>
              </div>
            </div>
          </div>
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
      
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link to="/" className="navbar-brand">Home </Link>
              </div>

              <div className="collapse navbar-collapse" id="navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/list" >
                    Product
                    </Link>
                  </li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#">나중에</a></li>
                      <li><a href="#">구현할 것</a></li>
                      <li><a href="#">.</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">무언가</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">의미있는</a></li>
                    </ul>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                <li><Link to="/cart">Cart</Link></li>
                { this.props.login ? <li><a onClick={this.props.handleLogout}>Logout</a></li> :<li><a data-toggle="modal" data-target="#loginModal">Login</a></li> }
                  <div id="loginModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Simple Shopping Mall</h4>
                            </div>
                            <div className="modal-body">
                                <Login />
                            </div>
                        </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
      login: state.loginReducer.login,
      logout: state.loginReducer.logout,
      ID: state.loginReducer.ID,
      balance: state.loginReducer.balance
  }
}

const mapDispatchProps = (dispatch) => {
  return {
      handleLogout: () => { dispatch(actions.logout()) }
  }
}

export default connect(mapStateToProps, mapDispatchProps)(Header)

