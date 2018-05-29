import React, {Component} from 'react'

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
            return <div key = {item.data[0].nasa_id} >
                <h3 > {item.data[0].title} </h3> 
                <img src = {item.links[0].href} alt = "NASA Star" width = "200" height="200" />
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
