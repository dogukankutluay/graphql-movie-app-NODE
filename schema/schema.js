const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;
const _ = require('lodash');

const Movie = require('../models/Movie');
const Director = require('../models/Director');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        console.log(parent);
        return Director.findById(parent.directorId);
      },
    },
  }),
});
const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    birth: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Director.findById({ id: args.id });
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: {},
      resolve() {
        return Movie.find();
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return Director.find();
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        year: { type: GraphQLInt },
        directorId: { type: GraphQLString },
      },
      resolve(parent, args) {
        const create = async () => {
          const movieCreate = await Movie.create(args);
          return movieCreate;
        };
        return create();
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        birth: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const create = async () => {
          const directorCreate = await Director.create(args);
          return directorCreate;
        };
        return create();
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
