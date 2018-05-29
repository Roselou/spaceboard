import React, {Component} from 'react'

class singleNasa extends Component {
    state = {
        nasa: [],
        comments: '',
        name:'',
    }

    componentDidMount = () => {
        console.log(123, this.state)
        // let nasaId = 'PIA22085'
        let nasaId = this.props.match.params.nasa_id
        // console.log(`https://images-api.nasa.gov/search?q=black-hole&media_type=image/api/nasa/${nasaId}`)
        fetch(`https://images-api.nasa.gov/search?q=black-hole&media_type=image/api/nasa/${nasaId}`)
            .then(res => res.json())
            .then(nasa =>
                this.setState([nasa ]))
    }

    handleNameChange = (e) => {
    	    this.setState({
    	        name: e.target.value
    	    });

    	}
    handleCommentChange = (e) => {
        this.setState({
            comments: e.target.value
        });

    }

    createComment = (e) => {
        e.preventDefault();
        console.log(234, this.state)
        let nasaId = this.props.match.params.nasa_id;
        fetch(`https://images-api.nasa.gov/search?q=blackhole&media_type=image/api/nasa/${nasaId}/comments`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                comments: this.state.comments,
            })
        }).then(res => {
            return res.json();
        }).then(json => {

            this.setState({
                nasa: {
                    ...this.state.nasa,
                    comments: [...this.state.nasa.comments, json]
                },
                name: '',
                comments: '',
            })

        })
    }

    render() {
         let commentsResult = this.state.nasa.comments 
         ? this.state.nasa.comments.map(comment => {
            return ( <div className = 'commentContainer' >
                <div key = {comment._id}className = "comments" >
                <p> < strong > {comment.name} </strong>: {comment.comments} </p >
                </div> 
                </div>
        );
        }) 
        : < h2 > Loading... </h2>

        
        let singleNasa = this.state.nasa.map(item => {
            let nasa_id = this.item.data[0].nasa_id
            return <div key =  {nasa_id}>
            <h3> {this.item.data[0].title} </h3> 
            <img src={this.item.links[0].href} alt="Nasa Blackhole" width="25%" height="25%" />
            <p> {this.item.data[0].description_508} </p>
            </div>
        })

        return ( 
            <div>
                <div key = {this.state.nasa.nasa_id} >
                <h3 > {this.state.nasa.title} </h3>  
                <img src = {this.state.nasa.href} width = "25%" height = "25%" />
                <p> {this.state.nasa.description_508} </p> 
                </div>
            < div className = "row" >
                <form className = "col s12" onSubmit = {this.createComment} >
                    <div className = "row" >
                        <div className = "input-field col s6" >
                            <input 
                                id = "icon_prefix" 
                                type = "text" 
                                className = "validate" 
                                autoFocus = {this.props.autoFocus} 
                                onChange = {this.handleNameChange}
                                value = {this.state.name}
                                placeholder = "Name" />
                        </div>
                        <div className = "input-field col s6" >
                            <input
                                id = "icon_prefix2"
                                className = "materialize-textarea"
                                onChange = {this.handleCommentChange}
                                value = {this.state.comments}
                                placeholder = "Comment..." />
                        </div>
                    </div> 
                    <button className = "btn-floating btn-small waves-effect waves-light" > + </button >
                </form> 
            </div>
                {commentsResult}
            </div>

        )




    }
    //Don't Touch - closes class    
}

export default singleNasa;