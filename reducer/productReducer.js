import { GET_PRODUCT, GET_SINGLE_PRODUCT, SET_CART } from '../action/actionType'

const initialState = {
    products: [],
    singleProduct: {},
    previousCart: {},
    cart: {}
}

export default function productReducer(state = initialState, action) {

    switch(action.type) {
        case GET_PRODUCT:
            return Object.assign({}, state, {
                products: action.products
            })
        case GET_SINGLE_PRODUCT:
            return Object.assign({}, state, {
                singleProduct: action.singleProduct
            })
        case SET_CART:
            let newCart = state.cart
            if (!state.cart[action.product.name]){
                newCart[action.product.name] = 0
            }
            newCart[action.product.name] += Number(action.count)
            return Object.assign({}, state, {
                cart: newCart
            })
        default:
            return state
    }
}