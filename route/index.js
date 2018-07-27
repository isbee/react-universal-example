import Home from '../component/home'
import ProductBoard from '../component/board'
import Product from '../component/product'
import Cart from '../component/cart'
import NotFound from '../component/notFound'

import { getProductFromServer, getProductListFromServer } from '../action'

export default [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/list",
        component: ProductBoard,
        exact: true,
        loadData: () => getProductListFromServer()
    },
    {
        path: "/list/:id",
        component: Product,
        loadData: (match) => getProductFromServer(match)
    },
    {
        path: "/cart",
        exact: true,
        component: Cart
    },
    {
        component: NotFound
    }
]