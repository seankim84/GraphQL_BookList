import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';
import _ from 'lodash';
//dummy data
let books = [
    { name: "Empire", genre: "Fantasy", id: "1" },
    { name: "The final Empire", genre:"Romance", id:"2" },
    { name: "Egypt", genre: "Action", id:"3" }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args){
                return  _.find(books, { id: args.id });
            }
        }
    }
});



const schema = new GraphQLSchema({
    qeury: RootQuery
});

export default schema;
