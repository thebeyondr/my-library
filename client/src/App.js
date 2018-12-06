import React, { Component } from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

// [no uri] This will use the proxy currently set at localhost:5000
const client  = new ApolloClient({})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
        <h1>Jeo's Reading List</h1>
        <BookList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
