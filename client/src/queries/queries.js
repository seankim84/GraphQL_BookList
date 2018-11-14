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
