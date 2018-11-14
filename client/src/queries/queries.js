import { gql } from 'apollo-boost';

export const getBookQuery = gql `
    {
        books {
            id
            name
            genre
        }
    }
`;

export const getAuthorQuery = gql `
    {
        authors {
            id
            name
        }
    }
`;

export const addBookMutation = gql `
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre:$genre, authorId:$authorId){
            name
            id
        }
    }
`
