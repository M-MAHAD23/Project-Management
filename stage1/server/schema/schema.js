const { projects, clients } = require('../sampleData.js')
// Mogooose models
const Project = require('../models/Project');
const Client = require('../models/Client');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
} = require('graphql');

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: CLientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        }
    })
});

// Client Type
const CLientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects;
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projects.find((project) => project.id === args.id);
            },
        },
        clients: {
            type: new GraphQLList(CLientType),
            resolve(parent, args) {
                return clients;
            },
        },
        client: {
            type: CLientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return clients.find((client) => client.id === args.id);
            },
        },
    },
});

// Exporting
module.exports = new GraphQLSchema({
    query: RootQuery
})