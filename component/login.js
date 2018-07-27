import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../action'
import request from 'axios'


const LOGIN_API = 'http://localhost:3000/login'

class Login extends React.Component{
    
    constructor(props){
        super(props)
        this.onLogin = this.onLogin.bind(this)
        this.id = React.createRef()
        this.password = React.createRef()
        this.state = {loginFail: false}
    }
    componentWillReceiveProps(){
        this.setState({loginFail: false})
    }
    onLogin(){
        request({
            method: 'POST',
            data: {
                name : this.id.current.value,
                password : this.password.current.value
            },
            url: LOGIN_API
        })
        .then(result => result.data)
        .then((data) =>{
            if(!data){
                this.props.handleLogin(false, null)
                this.setState({loginFail: true})
            }
            else{
                console.log('Login success!')
                console.log('data : ', data)
                this.props.handleLogin(true, this.id.current.value)
                this.props.handleSetBalance(data.balance)
                $('.close').click()
                this.id.current.value = ""
                this.password.current.value = ""
            }
        })
    }
    
    render(){
        return (
        <div >
            <h3>Login Page</h3>
            <br/>
            <label>ID
                <input type="text" ref={this.id} placeholder="isbee" className="form-control"></input>
            </label>
            <label>PASSWORD
                <input type="password" ref={this.password} placeholder="1234" className="form-control"></input>
            </label>
            <button className="btn btn-primary" onClick={this.onLogin}>login</button>
            <p style={{color: "red"}}>{this.state.loginFail ? "Incorrect ID or PASSWORD" : ""}</p>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        balance: state.loginReducer.balance
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        handleLogin: (isSuccess, ID) => { dispatch(actions.login(isSuccess, ID)) },
        handleSetBalance: (balance) => { dispatch(actions.setBalance(balance)) }
    }
}

const isClientOrServer = () => {
    return (typeof window !== 'undefined' && window.document) ? 'client' : 'server'
}

// shouldComponentUpdate에 의해 re-rendering이 막힐 경우 withRouter 사용할 것
// https://reacttraining.com/react-router/web/guides/redux-integration
export default connect(mapStateToProps, mapDispatchProps)(Login)