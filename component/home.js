import React from 'react'

import Header from './header'
import Footer from './footer'

class Home extends React.Component{
    constructor(props){
        super(props)
        console.log("Home, ", this.props)
    }
    render(){
        return (
            <div>
                <Header />
                <div className="jumbotron">
                    <h1>Blah Blah</h1>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home