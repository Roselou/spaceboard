import React, {Component} from 'react'
import '../App.css';

class singleNasa extends Component {
    state = {
        nasa: {},
        comments: [],
        name: ''
    }

    componentDidMount = () => {
        // console.log(123, this.state)
        // let nasaId = 'PIA22085'
        let nasaId = this.props.match.params.nasa_id;
        console.log(nasaId)
        // console.log(`https://images-api.nasa.gov/search?q=black-hole&media_type=image/api/nasa/${nasaId}`)
        fetch(`http://localhost:8080/api/nasa/${nasaId}`)
            .then(res => res.json())
            .then(allComments => {
                this.setState( {comments: allComments[0].comments} );
             })
        .catch(err => console.log('Single Nasa Page err', err))
    }

    handleNameChange = (e) => {
    	    this.setState({
    	        name: e.target.value
    	    });
        }
        
    handleCommentChange = (e) => {
        this.setState({
            comments: [e.target.value]
        });

    }

    createComment = (e) => {
        e.preventDefault();
        // console.log(234, this.state)
        let nasaId = this.props.match.params.nasa_id;
        fetch(`http://localhost:8080/api/nasa/${nasaId}/comments`, {
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
            return res.json()
        }).then(json => {

            console.log('json is ', json)
            console.log('state is', this.state)

            // this.setState({
            //     nasa: {
            //         ...this.state.nasa,
            //         comments: [...this.state.nasa.comments, json],
            //         name: [...this.state.nasa.name, json]
            //     },
            //     name: '',
            //     comments: '',
            // })
            this.setState({

            })

        })
    }

    render() {
        console.log('STATE', this.state);

        // 1 check this.state
        //2  check for comments
            // 3 is it array? single string?
            //4  if array, map through, append to the dom (eg <div>s)
            //5  if string - why? and how to put in array format (to do the step above)

         let commentsResult = this.state.comments
         ? this.state.comments.map(comment => {
            return ( <div className = 'commentContainer title' >
                <div key = {comment._id} className = "comments" >
                <p className="title" > < strong > {comment.name} </strong>: {comment.comments} </p >
                </div> 
                </div>
        );
        }) 
        : <h2> Be the first to comment... </h2>

        
        // let singleNasa = this.state.nasa.map(item => {
        //     let nasa_id = this.item.data[0].nasa_id
        //     return <div key =  {nasa_id}>
        //     <h3> {this.item.data[0].title} </h3> 
        //     <img src={this.item.links[0].href} alt="Nasa Blackhole" width="25%" height="25%" />
        //     <p> {this.item.data[0].description_508} </p>
        //     </div>
        // })
        let nasaId = this.props.match.params.nasa_id;
        let imgUrl = `https://images-assets.nasa.gov/image/${nasaId}/${nasaId}~thumb.jpg`


        return ( 
            <div className="title">
                <img className="single-img" src={imgUrl} alt="From NASA" />
               

            <hr />  
            < div className = "row title" >
                <form className = "col s12" onSubmit = {this.createComment} >
                    <div className = "row" >
                        <div className = "input-field col s6 title" >
                            <input 
                                id = "icon_prefix" 
                                type = "text" 
                                className = "validate" 
                                autoFocus = {this.props.autoFocus} 
                                onChange = {this.handleNameChange}
                                value = {this.state.name}
                                placeholder = "Name" />
                        </div>
                        
                        <div className = "input-field col s6 title" >
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