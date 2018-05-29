import React, { Component } from 'react'

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
    
    render(){
        console.log('stars', this.state.stars)
        let starResult = this.state.stars.map(item => {
            return <div key={item.data[0].nasa_id}>
                <h3> {item.data[0].title} </h3>
                <img src={item.links[0].href} alt="NASA Star" width = "200" height="200" />
                <p> {item.data[0].description} </p>   
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