import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'; // GraphQL Server를 불러올 때 사용한다.
import { ApolloProvider } from 'react-apollo'; // Redux의 Provider 처럼 graphql query의 정보로 Root Component를 Provider 해준다.
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>This is Sean GraphQL Book Resister</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
