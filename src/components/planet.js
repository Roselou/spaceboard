import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Planet extends Component {
    state = {
        planet: [],
    }

    componentDidMount = () => {
        fetch('https://images-api.nasa.gov/search?q=planets&media_type=image')

            .then(res => res.json())
            .then(data => {
                this.setState({ planet: data.collection.items })
            })
    }

    makeNasa = () => {
        let newTitle = this.state.planet.data[0].title
        let newID = this.state.planet.data[0].nasa_id
        let newURL = this.state.planet.links[0].href
        let newDesc = this.state.planet.data[0].description_508
        fetch('https://shrouded-beyond-10542.herokuapp.com/api/nasa', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newTitle,
                nasaID: newID,
                imageURL: newURL,
                description508: newDesc,
            })
        })
    }
    
    render(){
        console.log('planets', this.state.planet)
        let planetResult = this.state.planet.map(item => {
        let nasa_id = item.data[0].nasa_id
        return (
            <div className="row nasa" key = {nasa_id} >
                <div className="col s12 m7">
                    <div className="card small ">
                        <div className="card-image">
                            <Link to={`/api/nasa/${nasa_id}`} onClick={this.makeNasa} ><img className="img" src={item.links[0].href} alt="planet"/></Link>
                        </div>
                        < div className = "card-content" >
                        <h6>{item.data[0].title}</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
        })
        return(
            <div> 
                {planetResult}
            </div>
        )
    }
//DT    
}

export default Planet; 


