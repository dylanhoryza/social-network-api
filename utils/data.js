const users = [
  {
    username: 'sal',
    email: 'sal@gmail.com',
    thoughts: [

    ],
    friends: [

    ],
  },
  {
    username: 'bob',
    email: 'bob@gmail.com',
    thoughts: [

    ],
    friends: [

    ],
  },
  {
    username: 'bill',
    email: 'bill@gmail.com',
    thoughts: [

    ],
    friends: [

    ],
  },
  {
    username: 'john',
    email: 'john@gmail.com',
    thoughts: [

    ],
    friends: [

    ],
  },
];

const thoughts = [
  {
    thoughtText: 'Thinking out loud is fun.',
    createdAt: new Date(),
    username: 'sal',
    reactions: [],
  },
  {
    thoughtText: 'I wonder if dogs have thoughts.',
    createdAt: new Date(),
    username: 'bob',
    reactions: [],
  },
  {
    thoughtText: 'Thinking is hard work.',
    createdAt: new Date(),
    username: 'bill',
    reactions: [],
  },
  {
    thoughtText: 'Sometimes I think too much.',
    createdAt: new Date(),
    username: 'john',
    reactions: [],
  },
]

module.exports = { users, thoughts };
