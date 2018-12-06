import React, {Component} from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getBooksQuery = gql`
{
  books{
    id
    name
    genre
  }
}
`

class BookList extends Component{

  displayBooks(props){
    const data = props.data
    if(data.loading){
      return (<div>Loading books...</div>)
    } else {
      return data.books.map(book => {
        return (<li key={book.id}>{book.name}</li>)
      })
    }
  }

  render(){
    return (
      <div>
        <ul className="book-list">
          {this.displayBooks(this.props)}
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
