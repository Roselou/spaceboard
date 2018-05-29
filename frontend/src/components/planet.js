import React, {Component} from 'react'

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

    render(){
        console.log('planets', this.state.planet)
        let planetResult = this.state.planet.map(item => {
            return <div key={item.data[0].nasa_id}> 
                <h3> {item.data[0].title} </h3>
                <img controls src={item.links[0].href} alt="NASA Planet" width="620" />
                <p> {item.data[0].description_508} </p>        
            </div>
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


