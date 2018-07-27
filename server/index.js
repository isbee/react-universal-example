import express from 'express'
import mongodb from 'mongodb'

import React from 'react'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import webpackDevMiddleware from './webpackDevMiddleware'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import reducers from '../reducer'
import routes from '../route'

import Html from './html'

const app = express()
const port = 3000
const url = 'mongodb://localhost:27017/web_app_ex'

const LOGIN_API = '/login'
const PRODUCT_LIST_API = '/products'
const PRODUCT_API = '/products/*'
const ACCOUNT_API = '/account'

app.use(webpackDevMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongodb.MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    const db = client.db('web_app_ex')

    app.use((req, res, next) => {
        req.users = db.collection('user')
        req.products = db.collection('product')
        return next()
    })

    app.post(LOGIN_API, (req, res) => {
        req.users.findOne({name: req.body.name, password: Number(req.body.password)})
                  .then(result => res.json(result))
                  .catch(err=> next(err))
        
    })
    
    app.get(PRODUCT_LIST_API, (req, res, next) => {
        req.products.find().toArray()
                    .then(result => res.json(result))
                    .catch(err => next(err))
    })

    app.get(PRODUCT_API, (req, res, next) => {
      let productName = req.url.substr(10)
      productName = productName.replace(/%20/g, " ")
      req.products.findOne({name: productName})
                  .then(result => res.json(result))
                  .catch(err=> next(err))
    })
    
    app.post(ACCOUNT_API, (req, res, next) => {
        let newUser = {
          name: req.body.id,
          password: Number(req.body.password),
          balance: 10000
        }
        req.users.insert(newUser, (err, result) => {
          if (err) 
            return next(err)
          return res.json(result.ops[0])
        })
    })

    // app.get('/*', (req, res, next) => {
    //     handleRender(req, res, products)
    //       
    // })
    // 어떤 방식이 더 좋은지는 아직 모르겠다
    app.use((req, res, next)=>{

        handleRender(req, res)
    })
    
    app.listen(port)
})

function handleRender(req, res) {
    const store = createStore(reducers, applyMiddleware(thunk))
    const context = {}

    const promises = matchRoutes(routes, req.url).map(({route, match}) => {
      console.log("ALL : ", route)
      return route.loadData ? 
        store.dispatch(route.loadData(match)) : Promise.resolve(null)
    })

    Promise.all(promises).then(()=>{
      // react v16에 추가된 renderToNodeStream을 client의 hydrate와 같이 쓰면
      // 2018.07 기준으로 크롬 브라우저에서 warning 발생. production 시에는 문제가 없다고 하나
      // 일단 이전의 renderToString 으로 썼다
      const layout = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
              { renderRoutes(routes) }
          </StaticRouter>
        </Provider>
      )
      // Send the rendered page back to the client
      res.send(Html(layout, store.getState()))
    })    
}