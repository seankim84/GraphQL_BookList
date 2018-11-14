import React, { Component } from 'react';
import { gql } from 'apollo-boost'; // query에 있는 data 정의 시 사용
import { graphql } from 'react-apollo'; // react Component와 graphQl Query를 묶어줄때 사용

const getBookQuery = gql`
    {
        books {
            name
            id
        }
    }
`

class BookList extends Component {
    displayBooks() {
        let data = this.props.data; // 오직 data property 만을 이용해야한다.(불러오는것중에 console.log 확인)-> this.props.data
        if(data.loading){
            return(
                <div>Loading Books</div>
            )
        } else {
            return data.books.map(book => (
                <li key={book.id}>{book.name}</li>
            )
            )}
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <ul id="book_list">
                    {this.displayBooks()}
                </ul>
            </div>
        );
    }
}

export default graphql(getBookQuery)(BookList);