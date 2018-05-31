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

        makeNasa = () => {
            let newTitle = this.state.comet.data[0].title
            let newID = this.state.comet.data[0].nasa_id
            let newURL = this.state.comet.links[0].href
            let newDesc = this.state.comet.data[0].description_508
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
