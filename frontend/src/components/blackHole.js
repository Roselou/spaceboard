import React, {Component} from 'react'

class BlackHole extends Component {
    state = {
        nasa: {},
        blackhole: [],
        comments: '',
    }

    componentDidMount = () => {
        let nasaId = this.props.match.params.nasa_id
        fetch(`https://images-api.nasa.gov/search?q=black-hole&media_type=image/api/nasa/${nasaId}`)
            .then(res => res.json())
            .then(nasa =>
                this.setState({ nasa }))
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
        let nasaId = this.props.match.params.nasa_id;
        fetch(`https://images-api.nasa.gov/search?q=blackhole&media_type=image/api/nasa/${nasaId}/comments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                comments: this.state.comments,
                votes: 0
            })
        }).then(res => {
            return res.json();
        }).then(json => {

            this.setState({
                nasa: {
                    ...this.state.nasaId,
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

        let blackHoleResult = this.state.blackhole.map(item => {
            return <div key = {
                    item.data[0].nasa_id
                } >
                <h3 > {item.data[0].title} </h3>  
                <img src = {item.links[0].href} alt = "Nasa Blackhole" width = "600" height = "400" />
                <p> {item.data[0].description} </p> 
                </div>
        })

        return ( 
            <div>
            <div>
                {blackHoleResult}
            </div>
            < div className = "row" >
                <form className = "col s12" onSubmit = {this.createComment} >
                <div className = "row" >

                <div className = "input-field col s6" >
                <i className = "material-icons prefix" > account_circle </i> 
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
                <i className = "material-icons prefix" > mode_edit </i> 
                <input
                    id = "icon_prefix2"
                    className = "materialize-textarea"
                    onChange = {this.handleCommentChange}
                    value = {this.state.comments}
                    placeholder = "Comment..." />
                </div>

                </div> 
                <button className = "btn-floating btn-small waves-effect waves-light" > < i className = "material-icons" > add </i>
                </button >
                </form> 
                </div>
            </div>

        )




    }
    //Don't Touch - closes class    
}

export default BlackHole;