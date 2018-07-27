import React from 'react'
import { connect } from 'react-redux'

import Header from './header'
import Footer from './footer'
import * as actions from '../action'

class Cart extends React.Component{
    render(){
        let products = this.props.products
        let cart = this.props.cart
        console.log("Cart : ", cart)
        let total_price = 0
        Object.keys(cart).map((product, index) => 
            total_price += cart[product] 
            * products.find(_product =>  _product.name === product).price
        )
        return (
            <div>
                <Header />
                <h1 style={{textAlign:"center"}}>My Cart</h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Product name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Order price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(cart).map((product, index) =>
                        (
                            <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{product}</td>
                            <td>${products.find(_product => 
                                _product.name === product
                            ).price}</td>
                            <td>{cart[product]}</td>
                            <td className="order_price">${products.find(_product => 
                                _product.name === product
                            ).price * cart[product]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h1>Total Price : ${total_price}</h1>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products,
        cart: state.productReducer.cart,
        balance: state.loginReducer.balance
    }
  }
  
  const mapDispatchProps = (dispatch) => {
    return {
      handleSetCart: (product, quantity) => { dispatch(actions.setCart(product, quantity)) }
    }
  }

export default connect(mapStateToProps, mapDispatchProps)(Cart)