import request from 'axios'

import * as types from './actionType' 

const url = 'http://localhost:3000'

export function login(isSuccess, ID) {
    return {
        type: types.LOG_IN,
        isSuccess: isSuccess,
        ID: ID
    }
}

export function logout() {
    return {
        type: types.LOG_OUT
    }
}

export function getProductList(products) {
    return {
        type: types.GET_PRODUCT,
        products: products
    }
}

export function getProduct(product) {
    return {
        type: types.GET_SINGLE_PRODUCT,
        singleProduct: product
    }
}

export function getProductListFromServer(){
    
    return (dispatch, getState) => {
        return  request.get(url + '/products')
                        .then(response => response.data)
                        .then(products => {
                            dispatch(getProductList(products))
                        })
    }
}

export function getProductFromServer(match){
    
    return (dispatch, getState) => {
        return  request.get(url + `/products/${match.params.id}`)
                        .then(response => response.data)
                        .then(product => {
                            dispatch(getProduct(product))
                        })
    }
}

export function setBalance(balance){
    return {
        type: types.SET_BALANCE,
        balance: balance
    }
}

export function setCart(product, count){
    return {
        type: types.SET_CART,
        product: product,
        count: count
    }
}