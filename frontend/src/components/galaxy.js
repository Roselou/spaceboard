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
            <h3 className="title"> {item.data[0].title} </h3>
            <img className="img"controls src={item.links[0].href} alt="NASA Galaxy" />
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