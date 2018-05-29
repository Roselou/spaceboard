import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SingleNasa from './singleNasa';
import Routes from '../routes';
class HomePage extends Component{
    render(){
        console.log("Welcome to space")
        return(
            <div> 
                <Link to='/api/nasa/blackholes'> Black Holes </Link>
                <Link to='/api/nasa/nebulae'> Nebulae </Link> 
                <Link to='/api/nasa/planets'> Planets </Link> 
                <Link to='/api/nasa/galaxies'> Galaxies </Link>

            </div>
        )
    }
}

export default HomePage;