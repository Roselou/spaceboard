import React, {Component} from 'react'
import '../App.css';

class singleNasa extends Component {
    state = {
        nasa: {},
        comments: [],
        currentComment: '',
        name: ''
    }

    componentDidMount = () => {
        // console.log(123, this.state)
        // let nasaId = 'PIA22085'
        let nasaId = this.props.match.params.nasa_id;
        // console.log(nasaId)
        // console.log(`https://images-api.nasa.gov/search?q=black-hole&media_type=image/api/nasa/${nasaId}`)
        fetch(`https://shrouded-beyond-10542.herokuapp.com/api/nasa/${nasaId}`)
            .then(res => res.json())
            .then(allComments => {
                this.setState( {comments: allComments[0].comments} );
             })
        .catch(err => console.log('Single Nasa Page GET err', err))
    }

    handleNameChange = (e) => {
    	    this.setState({
    	        name: e.target.value
    	    });
        }
        
    handleCommentChange = (e) => {
        this.setState({
            currentComment: e.target.value
        });

    }

    createComment = (e) => {
        e.preventDefault();
        // console.log(234, this.state)
        let nasaId = this.props.match.params.nasa_id;
        
        fetch(`https://shrouded-beyond-10542.herokuapp.com/api/nasa/${nasaId}/comments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                comments: this.state.currentComment,
            })
        }).then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                currentComment: '',
                name: '',
                comments: json.comments
            })
        })
    }

    deleteComment = (commentId) => {
        let nasaID = this.props.match.params.nasa_id;
        // let commentID = this.state.comments._id;
        console.log(123, commentId)
        // console.log('MY COMMENTS', this.state.comments._id)
        fetch(`https://shrouded-beyond-10542.herokuapp.com/api/nasa/${nasaID}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
        }).then(comments => {
            let updatedComments = this.state.comments.filter(comment => {
                return comment._id !== commentId;
            })

            // console.log('UPDATED COMMENTS:::::', updatedComments)
            this.setState({
                nasa: {
                    // ...this.state.nasa,
                    comments: updatedComments,
                },
            })
            this.setState({})
            //  console.log('DELETE ME', this.state.comments.comment_id)
        });
    }


    render() {
         let commentsResult = this.state.comments
         ? this.state.comments.map((comment, idx) => {
            //  console.log('Idx is:::::', idx)
            //  console.log('mapping:', comment)
            return ( <div key = {idx} className = 'commentContainer title' >
                <div className = "comments" >
                <h4 className="title" > < strong > {comment.name} </strong>: {comment.comments} </h4 >
                <button className = "waves-effect waves-light btn grey darken-2" onClick={() => this.deleteComment(comment._id)} > Delete </button>
                </div>
                </div>
        );
        }) 
        : <h2> Be the first to comment... </h2>


        let nasaId = this.props.match.params.nasa_id;
        let imgUrl = `https://images-assets.nasa.gov/image/${nasaId}/${nasaId}~thumb.jpg`

        return ( 
            <div className="title">
                <img className="single-img" src={imgUrl} alt="From NASA" />
                    < div className = "title" >
                        <form className = "col s12" onSubmit = {this.createComment} >
                            <div>
                                <div className = "input-field col s6" >
                                    <input 
                                        id = "icon_prefix" 
                                        type = "text" 
                                        className = "validate title" 
                                        autoFocus = {this.props.autoFocus} 
                                        onChange = {this.handleNameChange}
                                        value = {this.state.name}
                                        placeholder = "Name" />
                                </div>
                        
                                <div className = "input-field col s6 " >
                                    <input 
                                        id = "icon_prefix2"
                                        className = "materialize-textarea title"
                                        type="text"
                                        onChange = {this.handleCommentChange}
                                        value = {this.state.currentComment}
                                        placeholder = "Comment..." />
                                </div>
                            </div> 
                            < button className = "waves-effect waves-light btn indigo lighten-2" > Add Comment </button >
                        </form> 
                    </div>
                {commentsResult}
            </div>

        )




    }
    //Don't Touch - closes class    
}

export default singleNasa;