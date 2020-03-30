exports.swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Simple CRUD for MYSQL using Sequelize to create, read, update and delete users.',
    version: '1.0.0',
    title: 'Mysql Crud'
  },
  basePath: '',
  tags: [
    {
      name: 'user'
    }
  ],
  paths: {
    '/user': {
      get: {
        tags: ['user'],
        summary: 'Get method for user.',
        description: 'Returns data of one user by ID in query params.',
        operationId: 'userGet',
        parameters: [
          {
            name: 'id',
            in: 'query',
            required: true,
            description: 'Id of user to search.',
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'Found user.',
            schema: {
              $ref: '#/definitions/userFound'
            }
          },
          '404': {
            description: 'Did not find users.',
            schema: {
              $ref: '#/definitions/userNotFound'
            }
          }
        }
      },
      post: {
        tags: ['user'],
        summary: 'Inserts users',
        description: 'Inserts data of user in mysql table.',
        operationId: 'insertUser',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Configuration for creating user',
            required: true,
            schema: {
              $ref: '#/definitions/userInsert'
            }
          }
        ],
        responses: {
          '200': {
            description: 'User created.',
            schema: {
              $ref: '#/definitions/userInsert'
            }
          },
          '400': {
            description: 'User already exists.',
            schema: {
              $ref: '#/definitions/userMissingArgs'
            }
          },
          '400 ': {
            description: 'Missing arguments or exceeded input length limit.',
            schema: {
              $ref: '#/definitions/userNotInsertedMissingFieldsOrLengthTooGreat'
            }
          }
        }
      },
      patch: {
        tags: ['user'],
        summary: 'Update users',
        description: 'Updates data of user in mysql table.',
        operationId: 'updateUser',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Configuration for updating user',
            required: true,
            schema: {
              $ref: '#/definitions/userUpdate'
            }
          }
        ],
        responses: {
          '200': {
            description: 'User updated.',
            schema: {
              $ref: '#/definitions/userUpdated'
            }
          },
          '400': {
            description: 'User not needing any changes or not found.',
            schema: {
              $ref: '#/definitions/updatedNotSuccessful'
            }
          },
          '400 ': {
            description: 'Missing arguments or exceeded input length limit.',
            schema: {
              $ref: '#/definitions/userNotInsertedMissingFieldsOrLengthTooGreat'
            }
          }
        }
      },
      delete: {
        tags: ['user'],
        summary: 'Delete users',
        description: 'Deletes data of user in mysql table.',
        operationId: 'deleteUser',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Configuration for deleting user',
            required: true,
            schema: {
              $ref: '#/definitions/userDelete'
            }
          }
        ],
        responses: {
          '200': {
            description: 'User deleted.',
            schema: {
              $ref: '#/definitions/userDeleteConfirmation'
            }
          },
          '404': {
            description: 'User not deleted because was not found.',
            schema: {
              $ref: '#/definitions/userNotDeletedBecauseDoesNotExist'
            }
          },
          '400 ': {
            description: 'Missing arguments or exceeded input length limit.',
            schema: {
              $ref: '#/definitions/userNotInsertedMissingFieldsOrLengthTooGreat'
            }
          }
        }
      }
    }
  },
  definitions: {
    userNotFound: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User not found'
        },
        internal_code: {
          type: 'string',
          example: 'NOT_FOUND'
        }
      }
    },
    userFound: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        last_name: {
          type: 'string'
        },
        id: {
          type: 'string'
        },
        mail: {
          type: 'string'
        },
        phone: {
          type: 'string'
        }
      }
    },
    userInsert: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Carolina'
        },
        last_name: {
          type: 'string',
          example: 'Ochoa'
        },
        id: {
          type: 'string',
          example: '123'
        },
        mail: {
          type: 'string',
          example: 'caro@gmail.com'
        },
        phone: {
          type: 'string',
          example: '555 55 55'
        }
      }
    },
    userUpdate: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Caro',
          required: false
        },
        last_name: {
          type: 'string',
          example: 'Ochoa',
          required: false
        },
        id: {
          type: 'string',
          example: '123'
        },
        mail: {
          type: 'string',
          example: 'caro@gmail.com',
          required: false
        },
        phone: {
          type: 'string',
          example: '555 55 55',
          required: false
        }
      }
    },
    userMissingArgs: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User with the input ID already exists'
        },
        internal_code: {
          type: 'string',
          example: 'BAD_REQUEST'
        }
      }
    },
    userNotInsertedMissingFieldsOrLengthTooGreat: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
                example: 'Body must contain id. id must contain between 1 and 20 characters'
              },
              param: {
                type: 'string',
                example: 'id'
              },
              location: {
                type: 'string',
                example: 'body'
              }
            }
          }
        },
        internal_code: {
          type: 'string',
          example: 'BAD_REQUEST'
        }
      }
    },
    userUpdated: {
      type: 'object',
      properties: {
        updated: {
          type: 'number',
          example: 1
        }
      }
    },
    updatedNotSuccessful: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'The user that was input to update does not exist or no changes were commited'
        },
        internal_code: {
          type: 'string',
          example: 'BAD_REQUEST'
        }
      }
    },
    userDelete: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '123'
        }
      }
    },
    userDeleteConfirmation: {
      type: 'object',
      properties: {
        deleted: {
          type: 'number',
          example: 1
        }
      }
    },
    userNotDeletedBecauseDoesNotExist: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'The user that was input to delete does not exist'
        },
        internal_code: {
          type: 'string',
          example: 'BAD_REQUEST'
        }
      }
    }
  }
};
