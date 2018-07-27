import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './home'
import ProductBoard from './board'
import NotFound from './notFound'

class App extends React.Component {

    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/' render={(props) => <Home {...props}/>} />
                    <Route path='/list' render={(props) => <ProductBoard {...props}/>}/>
                    <Route render={(props) => <NotFound {...props}/>}/>
                </Switch>
            </div>
        )
    }
}

export default (App)