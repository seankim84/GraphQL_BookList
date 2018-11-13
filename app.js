import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import {ID, Password} from './auth';
import schema from './schema/schema';

mongoose.connect(`mongodb://${ID}:${Password}@ds137913.mlab.com:37913/gql-sean`, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connected DataBase');
});

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
    })
);

app.listen(4000, () => console.log("Now listen from the Port 4000"));
