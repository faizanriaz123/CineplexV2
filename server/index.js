const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const {CONNECTION_URL} = require('./config.js');


const server = new ApolloServer ({
    typeDefs,
    resolvers
});

mongoose.
    connect(CONNECTION_URL, { useNewUrlParser: true})
    .then(()=> {
        console.log("MONGODB connected")
        return server.listen({port:5000})
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    });
