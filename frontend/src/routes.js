import React, {Component} from 'react';
import {Switch } from 'react-router-dom';
import BlackHoles from './components/blackHoles';
import Nebula from './components/nebula';
import singleNasa from './components/singleNasa';
import HomePage from './components/HomePage';
import Planet from './components/planet';
import Star from './components/stars';
import Galaxy from './components/galaxy';
import Comet from './components/Comets';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Routes extends Component {
    render(){
        return (
            <div>
                <main>
                    <Router>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/api/nasa/blackholes' component={BlackHoles} />
                        <Route exact path='/api/nasa/nebulae' component={Nebula} />
                        <Route exact path='/api/nasa/planets' component={Planet} />
                        <Route exact path='/api/nasa/stars' component={Star} />
                        <Route exact path='/api/nasa/comets' component={Comet} />
                        <Route exact path='/api/nasa/galaxies' component={Galaxy} />
                        <Route exact path='/api/nasa/:nasa_id' component={singleNasa} />
                    </Switch> 
                    </Router>
                </main>
            </div> 
        )
    }
}

export default Routes;