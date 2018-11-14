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
    mutation {
        addBook(name: "", genre:"", authorId:""){
            name
            id
        }
    }
`
