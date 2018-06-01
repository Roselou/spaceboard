import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import blackhole from '../imgs/black-hole2.png';
import shining from '../imgs/shining.png';
import nebula from '../imgs/nebula.png';
import planets from '../imgs/planets.png';
import comet from '../imgs/comet.png';
import galaxy from '../imgs/milky-way.png';
import '../App.css'

class HomePage extends Component{

    render(){
        console.log("Welcome to space")
        return(
            <div className="homepage"> 
                <h5 className="categories" > Black Holes </h5>
                <Link to='/api/nasa/blackholes'><img className="col s6 icon"src={blackhole} alt="black hole icon" /></Link>
                <h5 className="categories" > Nebulae </h5>
                <Link to='/api/nasa/nebulae'> <img className="col s6 icon"  src={nebula} alt="nebula icon" /> </Link> 
                <h5 className="categories" > Planets </h5> 
                <Link to='/api/nasa/planets'> <img className="col s6 icon" src={planets} alt="planet icon" /> </Link>
                <h5 className="categories" > Galaxies </h5>
                <Link to='/api/nasa/galaxies'> <img className="col s6 icon" src={galaxy} alt="galacy icon"/> </Link>
                <div className="stars">
                <h5 className="categories" >Stars</h5>
                </div>
                <Link to='/api/nasa/stars' > <img className="col s6 icon"src={shining} alt="star icon" /></Link>
                <h5 className="categories" > Comets </h5>
                <Link to='/api/nasa/comets'> <img className="col s6 icon"src={comet} alt="comet icon" /> </Link>
            </div>
        )
    }
}

export default HomePage;