import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../App.css'

class Comet extends Component {
    state = {
        comet: []
    }

    componentDidMount = () => {
        fetch('https://images-api.nasa.gov/search?q=comets&media_type=image')
            .then(res => res.json())
            .then(data =>
                this.setState({
                    comet: data.collection.items
                })
            )
    }

    render() {
        console.log('comet', this.state.comet)
        let cometResult = this.state.comet.map(item => {
            let nasa_id = item.data[0].nasa_id
            return <div key = {item.data[0].nasa_id} >
                <h3 className = "title" > {item.data[0].title} </h3> 
                <Link to={`/api/nasa/${nasa_id}`}><img className = "img" src = {item.links[0].href} alt = "NASA Star"/></Link>
                <p> {item.data[0].description_508} </p>
                </div>
        })
        return ( <div > 
            {cometResult} 
            </div>
        )
    }

//DT    
}
export default Comet
