import React, { Component } from 'react';

 import { NavBar } from '../../components';

class WeatherDemo extends Component {
    render(){
        return(
            <div>
                <NavBar />
                <h1>hello</h1>
                <h1>This is a weather demo page</h1>
            </div>
        )
    }
}
export default WeatherDemo;