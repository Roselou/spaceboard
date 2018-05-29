import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class BlackHoles extends Component {
    state = {
        blackhole: [], 
    }

    componentDidMount = () => {
        fetch('https://images-api.nasa.gov/search?q=black-hole&media_type=image')
        .then(res => res.json())
        .then(data => 
            this.setState({blackhole: data.collection.items}))
    }
 
    
    render(){
        console.log('Black Holes', this.state.blackhole)
        let blackHoleResult = this.state.blackhole.map(item => {
            let nasa_id = item.data[0].nasa_id
            return <div key =  {nasa_id}>
            <h3> {item.data[0].title} </h3> 
            <Link to = {`/api/nasa/${nasa_id}`}> <img src={item.links[0].href} alt="Nasa Blackhole" width="25%" height="25%" /> </Link>
            <p> {item.data[0].description_508} </p>
            </div>
        })

        return(
            <div> 
                {blackHoleResult}
            </div>

        )
   
    


    }
//Don't Touch - closes class    
}

export default BlackHoles; 