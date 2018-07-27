import React from 'react'
import request from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from './header'
import Footer from './footer'

import * as actions from '../action'

const PRODUCT_API = 'http://localhost:3000/product'

class ProductList extends React.Component {

  render() {
    return (
      <div>
          <div className="row">
            {this.props.products.map((product)=>{
              return (
                <div className="col-sm-6 col-md-4" key={product._id}>
                  <div className="thumbnail" role="button">
                    <div className="caption">
                      <div className="page-header">
                        <h2>{product.name}</h2>
                      </div>
                      <p>description</p>
                      <Link to={`/list/${product.name}`} className="btn btn-default" role="button">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
      </div>
    )
  }
}

class ProductBoard extends React.Component {
  constructor(props) {
    super(props)
    this.addProduct = this.addProduct.bind(this)
    console.log("board constructor", this.props)
  }
  componentDidMount() {
    console.log("Board Did mount!")
    
      this.props.handleGetProduct()
      .then(() => {
        console.log("product load complete")
      })
    
  }
  componentWillReceiveProps(){
    console.log("Board will Receive")

  }

  componentDidUpdate(){
    console.log("Board Did update")
  }
  addProduct(product) {
    let products = this.state.products
    request.post(PRODUCT_API, product)
      .then(result => result.data)
      .then((data) =>{
        if(!data){
          return console.error('Failed to save')
        }
        products.unshift(data)
        this.setState({products: products})
    })
  }
  render() {
    return (
      <div>
        <Header />
        <ProductList products={this.props.products} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      login: state.loginReducer.login,
      ID: state.loginReducer.ID,
      products: state.productReducer.products
  }
}

const mapDispatchProps = (dispatch) => {
  return {
      handleLogin: (isSuccess, ID) => { dispatch(actions.login(isSuccess, ID)) },
      handleLogout: () => { dispatch(actions.logout())},
      handleGetProduct: () => { 
        return new Promise(resolve =>
          resolve(dispatch(actions.getProductListFromServer()))
        )
      }
  }
}

const isClientOrServer = () => {
  return (typeof window !== 'undefined' && window.document) ? 'client' : 'server'
}

export default connect(mapStateToProps, mapDispatchProps)(ProductBoard)