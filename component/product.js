import React from 'react'
import request from 'axios'
import { connect } from 'react-redux'

import Header from './header'
import Footer from './footer'

import * as actions from '../action'

class Product extends React.Component{

    componentDidMount(){
        this.props.handleGetProduct(this.props.match)
        this.input = React.createRef()
        this.handleCart = this.handleCart.bind(this)
    }
    handleCart(){
        this.props.handleSetCart(this.props.singleProduct, this.input.current.value)
    }
    
    render(){
        return (
            <div>
                <Header />
                    <div className="container"> 
                        <div className="row">
                            <div className="col-md-5">
                            </div>
                            <div className="col-md-6">
                            {this.props.singleProduct ?
                                <div>
                                    <h1>{this.props.singleProduct.name}</h1>
                                    <h3>Price : ${this.props.singleProduct.price}</h3>
                                    <div style={{width: "100%", display: "flex"}}>
                                        <div style={{width: "50%"}}>
                                            <h3>Remain Quantity : {this.props.singleProduct.quantity}</h3>
                                        </div>
                                        <div className="input-group" style={{width: "50%"}}>
                                            <input defaultValue={1} ref={this.input} type="number" min={0} className="form-control" aria-label="..."/>
                                            <div className="input-group-btn">
                                                <button className="btn btn-default" type="button" onClick={this.handleCart}>Add to Cart</button>
                                                <button className="btn btn-primary" type="button">Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <h1>No such product</h1>
                            }
                            </div>
                            <div className="col-md-1">
                            </div>
                        </div>
                    </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singleProduct: state.productReducer.singleProduct,
        cart: state.productReducer.cart
    }
  }
  
  const mapDispatchProps = (dispatch) => {
    return {
      handleSetCart: (product, quantity) => { dispatch(actions.setCart(product, quantity)) },
      handleGetProduct: (match) => { dispatch(actions.getProductFromServer(match)) }
    }
  }

export default connect(mapStateToProps, mapDispatchProps)(Product)