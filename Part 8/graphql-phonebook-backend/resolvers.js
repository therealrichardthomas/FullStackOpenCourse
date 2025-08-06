const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Person = require('./models/person')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

// each field of each type in the schema must have a resolver; types not defined in resolvers are given default resolvers
const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      console.log("Person.find")
      if (!args.phone) {
        return Person.find({}).populate('friendOf')
      }
      return Person.find({ phone: { $exists: args.phone === 'YES' } }).populate('friendOf')
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  // because the Person schema doesn't match the format of the persons array (contains address, array does not), then we must define a resolver for address ourselves 
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({...args})
      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name, error
          }
        })
      }
      pubsub.publish('PERSON_ADDED', { personAdded: person })
      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {
        await person.save()
      } catch(error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name, error
          }
        })
      }
      return person
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch((error) => {
          throw new GraphQLError('creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username, error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQlError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: args.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
    addAsFriend: async (root, args, { currentUser }) => {
      // map every friends's id and check if the parameter person is one of these friends
      const isFriend = (person) => currentUser.friends.map(friend => friend._id.toString()).includes(person._id.toString())

      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const person = await Person.findOne({ name: args.name })
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }
      await currentUser.save()

      return currentUser
    }
  },
  Subscription: {
    personAdded: {
      // saves info about all of the clients that do the subscription into an iterator object called PERSON_ADDED
      subscribe: () => pubsub.asyncIterableIterator('PERSON_ADDED')
    }
  }
}

module.exports = resolvers