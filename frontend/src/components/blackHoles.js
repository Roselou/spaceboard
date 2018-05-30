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
            return(
            <div class="card" key =  {nasa_id} >
                <div class = "card-image waves-effect waves-block waves-light col s6">
                <Link to = {`/api/nasa/${nasa_id}`}> <img class="activator" src={item.links[0].href} alt="Nasa Blackhole" width="5%" height="5%" /> </Link>
                </div>
                <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">{item.data[0].title} <i class="material-icons right">more_vert</i></span>
                </div>
                <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">{item.data[0].title}<i class="material-icons right">close</i></span>
                <p>{item.data[0].description_508}</p>
                </div>
            </div>
            )
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