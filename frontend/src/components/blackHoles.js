import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class BlackHoles extends Component {
    state = {
        blackhole: [], 
        title: '',
        nasaID: '',
        imageURL: '',
        description508: '',
    }

    componentDidMount = () => {
        fetch('https://images-api.nasa.gov/search?q=black-hole&media_type=image')
        .then(res => res.json())
        .then(data => 
            this.setState({blackhole: data.collection.items}))   
    }

    makeNasa = () => {
        let newTitle = this.state.blackhole.data[0].title 
        let newID = this.state.blackhole.data[0].nasa_id
        let newURL = this.state.blackhole.links[0].href
        let newDesc = this.state.blackhole.data[0].description_508
        fetch('http://localhost:8080/api/nasa/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                title: newTitle, 
                nasaID: newID, 
                imageURL: newURL,
                description508: newDesc,
            })
        })
}

    render(){
        console.log('Black Holes', this.state.blackhole)
        let blackHoleResult = this.state.blackhole.map(item => {
            let nasa_id = item.data[0].nasa_id
            return(
            <div class="row nasa" key = {nasa_id} >
            <div class="col s12 m7">
                <div class="card small ">
                <div class="card-image">
                <Link to={`/api/nasa/${nasa_id}`} onClick={this.makeNasa} ><img className="img" src={item.links[0].href} /></Link>
                </div>
                < div class = "card-content" >
                    <h6>{item.data[0].title}</h6>
                </div>
                </div>
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
//Don't Touch - closes className    
}

export default BlackHoles; 