import React, {Component} from 'react'

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


    render(){
        console.log(this.state.galaxy)
        let galaxyResult = this.state.galaxy.map(item => {
            return <div key = {item.data[0].nasa_id}>
            <h3> {item.data[0].title} </h3>
            <img controls src={item.links[0].href} alt="NASA Galaxy" width = "200" height="200"/>
            <p> {item.data[0].description_508} </p>
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