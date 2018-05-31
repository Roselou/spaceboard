import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Galaxy extends Component {
    state = {
       galaxy: [],

    }

    componentDidMount = () => {
        fetch('https://images-api.nasa.gov/search?q=galaxies&media_type=image')

        .then(res => res.json())
        .then(data => {
            this.setState({galaxy: data.collection.items})
        })
    }
    
    makeNasa = () => {
        let newTitle = this.state.galaxy.data[0].title
        let newID = this.state.galaxy.data[0].nasa_id
        let newURL = this.state.galaxy.links[0].href
        let newDesc = this.state.galaxy.data[0].description_508
        fetch('http://localhost:8080/api/nasa/', {
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
        console.log(this.state.galaxy)
        let galaxyResult = this.state.galaxy.map(item => {
             let nasa_id = item.data[0].nasa_id
            return <div key = {item.data[0].nasa_id}>
            <h3 className="title"> {item.data[0].title} </h3>
            <Link to={`/api/nasa/${nasa_id}`} onClick={this.makeNasa}> <img className="img"controls src={item.links[0].href} alt="NASA Galaxy" /> </Link>
            </div>
        })
        return (
            <div> 
             {galaxyResult}
                </div>


        )
    }

//DT    
}

export default Galaxy;