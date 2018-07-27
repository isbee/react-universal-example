import React from 'react'
import { hydrate } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from '../route'
import Reducers from '../reducer'

const store = createStore(Reducers, window.__PRELOADED_STATE__, applyMiddleware(thunk))
delete window.__PRELOADED_STATE__

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            { renderRoutes(routes) }
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
)