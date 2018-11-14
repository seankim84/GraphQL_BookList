import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getAuthorQuery } from '../queries/queries';
 
class AddBook extends Component {
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

    render() {
        return (
            <form id="add_book">

                <div className="fields">
                    <label>Book Name:</label>
                        <input type="text"/>
                </div>

                <div>
                    <label>Genre:</label>
                        <input type="text" />
                </div>

                <div className="fields">
                    <label>Author:</label>
                    <select>
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