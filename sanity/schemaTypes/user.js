export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'username',
        title: 'Username',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
        validation: (Rule) => Rule.required().min(6),
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'role',
        title: 'Role',
        type: 'string',
        options: {
            list: [
                { title: 'Admin', value : 'admin'},
                { title: 'User', value : 'user'},
            ],
        }
      },
    ],
  };
  