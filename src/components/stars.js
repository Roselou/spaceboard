import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Star extends Component {
    state = {
        stars: [],
    }

    componentDidMount = () => {
        fetch('https://images-api.nasa.gov/search?q=stars&media_type=image')
        .then(res => res.json())
        .then(data => {
            this.setState({ stars: data.collection.items })
        })
    }


    makeNasa = () => {
        let newTitle = this.state.stars.data[0].title
        let newID = this.state.stars.data[0].nasa_id
        let newURL = this.state.stars.links[0].href
        let newDesc = this.state.stars.data[0].description_508
        fetch('https://dashboard.heroku.com/apps/shrouded-beyond-10542/api/nasa/', {
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
        console.log('stars', this.state.stars[0])
        let starResult = this.state.stars.map(item => {
             let nasa_id = item.data[0].nasa_id
            return <div class="row nasa" key = {nasa_id} >
            <div class="col s12 m7">
                <div class="card small ">
                <div class="card-image">
                <Link to={`/api/nasa/${nasa_id}`} onClick={this.makeNasa} ><img className="img" src={item.links[0].href} alt="stars"/></Link>
                </div>
                < div class = "card-content" >
                    <h6>{item.data[0].title}</h6>
                </div>
                </div>
            </div>
            </div>
        })
        return(
            <div> 
                {starResult}
            </div> 

        )
    }
//DT    
}

export default Star;