import React, { Component } from 'react'

class Nebula extends Component {
    state = {
        nebulae: []
    }

componentDidMount = () => {
    fetch('https://images-api.nasa.gov/search?q=nebula&media_type=image')
    .then(res => res.json())
    .then(data => 
        this.setState({ nebulae: data.collection.items})
    )
}

render() {
    console.log('nebulae', this.state.nebulae)
    let nebulaResult = this.state.nebulae.map(item => {
        return <div key = {item.data[0].nasa_id}> 
            <h3> {item.data[0].title} </h3>
            <img src={item.links[0].href} alt="NASA Star" width="620" />
            <p> {item.data[0].description} </p>
        </div>
    })
    return (
        <div> 
            {nebulaResult}
        </div>
    )
}

//DT    
}
 export default Nebula

