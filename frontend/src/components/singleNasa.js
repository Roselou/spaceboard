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
        console.log(nasaId)
        // console.log(`https://images-api.nasa.gov/search?q=black-hole&media_type=image/api/nasa/${nasaId}`)
        fetch(`http://localhost:8080/api/nasa/${nasaId}`)
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
        fetch(`http://localhost:8080/api/nasa/${nasaId}/comments`, {
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
                comments: [...this.state.comments, this.state.currentComment]
            })
            console.log(11, this.state)
        })
    }

    deleteComment = () => {
        let nasaID = this.props.match.nasa_id;
        let commentID = this.props.match.comment_id;
        fetch(`http://localhost:8080/api/nasa/${nasaID}/comments/${commentID}`, {
            method: 'DELETE',
            mode: 'CORS',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    comments: this.state.currentComment,
                })
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                currentComment: '',
                name: '',
                comments: [...this.state.comments, this.state.currentComment]
            })
            console.log('DELETE', this.state)
        });
    }

    updateComment = () => {
        let nasaID = this.props.match.nasa_id;
        let commentID = this.props.match.comment_id;
        fetch(`http://localhost:8080/api/nasa/${nasaID}/comments/${commentID}`, {
            method: 'PUT',
            mode: 'CORS',
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: this.state.name,
                  comments: this.state.currentComment,
              })
          }).then(res => {
              return res.json();
          }).then(json => {
              this.setState({
                  currentComment: '',
                  name: '',
                  comments: [...this.state.comments, this.state.currentComment]
              })
              console.log('PUT', this.state)
          });
          }

    render() {
        console.log('STATE', this.state);

        // 1 check this.state
        //2  check for comments
            // 3 is it array? single string?
            //4  if array, map through, append to the dom (eg <div>s)
            //5  if string - why? and how to put in array format (to do the step above)

         let commentsResult = this.state.comments
         ? this.state.comments.map((comment, idx) => {
            return ( <div key = {comment._id} className = 'commentContainer title' >
                <div className = "comments" >
                <h4 className="title" > < strong > {comment.name} </strong>: {comment.comments} </h4 >
                <button className = "waves-effect waves-light btn grey darken-2" onClick={() =>this.deleteComment(idx)}> Delete </button>
                <button className = "waves-effect waves-light btn grey darken-3" onClick={() => this.updateComment(idx)}> Update </button>
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
            <div key={nasaId} className="title">

                <img className="single-img" src={imgUrl} alt="From NASA" />
               

            <hr />  
            < div className = "row title" >
                <form className = "col s12" onSubmit = {this.createComment} >
                    <div className = "row" >
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