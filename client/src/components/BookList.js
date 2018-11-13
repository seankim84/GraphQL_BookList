import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBookQuery = gql`
    {
        books {
            name
            id
        }
    }
`

class BookList extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <ul id="book_list">
                    <li>Book name</li>
                </ul>
            </div>
        );
    }
}

export default graphql(getBookQuery)(BookList);