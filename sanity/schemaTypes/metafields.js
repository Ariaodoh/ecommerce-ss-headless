export default {
    name: 'metafield',
    title: 'MetaField',
    type: 'document',
    fields: [
      { 
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      { 
        name: 'details',
        title: 'Details',
        type: 'string',
      },
      {
        name: 'values',
        title: 'Values',
        type: 'array',
        of: [{ type: 'values' }],
      }
    ]
  }