import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } from 'graphql';
import _ from 'lodash';
import Book from '../models/book';
import Author from '../models/author';


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
               //return _.find(authors, { id: parent.authorId })
               return Author.findById(parent.authorId);
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
                //return _.filter(books, { authorId: parent.id })
                return Book.find({ authorId: parent.id });
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
                /*console.log(typeof(args.id))
                return  _.find(books, { id: args.id });*/
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                /* return _.find(authors, { id: args.id }) */
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
            }
        },

        authors : {
            type: new GraphQLList(AuthorType), // 다른 type 을 정의해둔것을 갖다 사용할때는 GrahpQLList를 사용한다.
            resolve(parent, args){
                /* return authors */
                return Author.find({});
            }
        }
    }
});

/* Mutation */
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args: {
                name : { type: new GraphQLNonNull(GraphQLString) },
                age : { type: new GraphQLNonNull(GraphQLInt) }
            },

            resolve(parent, args){
                let author = new Author({
                    name : args.name,
                    age : args.age
                });
                return author.save()
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, // GraphQLString can not be "null"
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLID }
            },

            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

/* export the Modules */

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;
