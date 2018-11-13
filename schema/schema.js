import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    } from 'graphql';

import _ from 'lodash';

/* dummy data */
let books = [
    { name: "Empire", genre: "Fantasy", id: "1", authorId: '1' },
    { name: "The final Empire", genre:"Romance", id:"2", authorId: '2' },
    { name: "Egypt", genre: "Action", id:"3", authorId: '3' }
];

let authors = [
    { name: "Sean.Kim", age:44, id:'1' },
    { name: "Rebekah", age:40, id:'2' },
    { name: "Patrick", age: 45, id:'3' }
];

/* Define the Types */
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ //fields는 항상 function 으로 사용해야 함.
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){ // parent argument는 위의 타입을 상속받을 때 사용한다.
               console.log(parent);
               return _.find(authors, { id: parent.authorId })
            }
        }
    })
})

const  AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})

/*Root Query */
const RootQuery = new GraphQLObjectType({ // 여기서 앞서 지정한 Types의 query들을 사용한다.
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }}, // BookType을 가져와서, id라는 arg로 data를 찾는다
            resolve(parent, args){
                console.log(typeof(args.id))
                return  _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return _.find(authors, { id: args.id })
            }
        },
        authors : {
            type: new GraphQLList(AuthorType), // 다른 type 을 정의해둔것을 갖다 사용할때는 GrahpQLList를 사용한다.
            resolve(parent, args){
                return authors
            }
        }
    }
});

/* export the Modules */

const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema;
