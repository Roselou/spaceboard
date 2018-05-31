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

makeNasa = () => {
    let newTitle = this.state.nebula.data[0].title
    let newID = this.state.nebula.data[0].nasa_id
    let newURL = this.state.nebula.links[0].href
    let newDesc = this.state.nebula.data[0].description_508
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

render() {
    console.log('nebulae', this.state.nebulae)
    let nebulaResult = this.state.nebulae.map(item => {
        return <div key = {item.data[0].nasa_id}> 
            <h3 className="title"> {item.data[0].title} </h3>
            <img className="img'" src={item.links[0].href} alt="NASA Star" />
            <p> {item.data[0].description_508} </p>
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

