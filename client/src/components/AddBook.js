import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorQuery, addBookMutation, getBookQuery } from '../queries/queries';
 
class AddBook extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }

    displayAuthors(){
        let data = this.props.getAuthorQuery; 
        console.log(this.props);
        if(data.loading){
            return(<option disabled>Loading Authors....</option>)
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }  

    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables: { // comes from queries Mutation
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBookQuery }]
        });
    }

    render() {
        return (
            <form id="add_book" onSubmit= {this.submitForm.bind(this)}>

                <div className="fields">
                    <label>Book Name:</label>
                        <input type="text" onChange={ e => this.setState({name: e.target.value})}/>
                </div>

                <div>
                    <label>Genre:</label>
                        <input type="text" onChange={ e => this.setState({genre: e.target.value})}/>
                </div>

                <div className="fields">
                    <label>Author:</label>
                    <select onChange={ e => this.setState({ authorId: e.target.value }) }>
                        <option>Select Authors</option>>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        )
    }
}

/*export default graphql(getAuthorQuery)(addBookMutation)(AddBook); */
// 이렇게 사용하는 대신에 compose로 묶어준다.

export default compose(
    graphql( getAuthorQuery, { name: "getAuthorQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)