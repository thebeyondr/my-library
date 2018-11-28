const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql
// const _ = require('lodash')
const Book = require('../book/model')
const Author = require('../author/model')

// dummy data
// var books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
// ]

// var authors = [
//   { name: 'Patrick Rothfuss', age: 44, id: '1' },
//   { name: 'Brandon Sanderson', age: 42, id: '2' },
//   { name: 'Terry Pratchett', age: 66, id: '3' }
// ]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent, args) {
        // return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: { type: GraphQLList(BookType),
      resolve (parent, args) {
        // return _.filter(books, { authorId: parent.id })
      } }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve (parents, args) {
        // get data from db
        // return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve (parents, args) {
        // return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve (parent, args) {
        // return books
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve (parent, args) {
        // return authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve (parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
