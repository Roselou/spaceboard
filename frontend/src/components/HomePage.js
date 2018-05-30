import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import blackhole from '../imgs/black-hole2.png';
import stars from '../imgs/stars.png';
import nebula from '../imgs/nebula.png';
import solarsystem from '../imgs/solar-system.png';
import comet from '../imgs/comet.png';
import galaxy from '../imgs/milky-way.png';
import '../App.css'

class HomePage extends Component{
    render(){
        console.log("Welcome to space")
        return(
            <div> 
                <Link to='/api/nasa/blackholes'><img className="col s6 icon"src={blackhole} alt="black hole icon" /></Link>
                <h5 className="col s4" > Black Holes </h5>
                <Link to='/api/nasa/nebulae'> <img className="col s6 icon"  src={nebula} alt="nebula icon" /> </Link> 
                <h5 className="col s4" > Nebulae </h5>
                <Link to='/api/nasa/planets'> <img className="col s6 icon" src={solarsystem} alt="planet icon" /> </Link>
                <h5 className="col s4" > Planets </h5> 
                <Link to='/api/nasa/galaxies'> <img className="col s6 icon" src={galaxy} alt="galacy icon"/> </Link>
                <h5 className="col s4" > Galaxies </h5>
                <Link to='/api/nasa/stars' > <img className="col s6 icon"src={stars} alt="star icon" /></Link>
                <h5 className="col s4" > Stars </h5>
                <Link to='/api/nasa/comets'> <img className="col s6 icon"src={comet} alt="comet icon" /> </Link>
                <h5 className="col s4" > Comets </h5>
            </div>
        )
    }
}

export default HomePage;