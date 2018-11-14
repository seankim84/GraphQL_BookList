import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getAuthorQuery } from '../queries/queries';
 
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
        let data = this.props.data 
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
        console.log(this.state)
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

export default graphql(getAuthorQuery)(AddBook);