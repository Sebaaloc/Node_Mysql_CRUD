## What is the project:

This is a simple CRUD for Mysql using Node.js, express and ORM Sequelize it queries, inserts, updates and deletes records in a table (yet a single table later work will include multiple tables) called person.

## How to run the project:

To run the project follow these steps:  
- Install node.  
- clone the project in your computer.  
- Open the project with your favorite IDE and run the command npm install.  
- Create a .env within the root folder of the project file and create the variables: NODE_ENV, PORT, USERNAME, PASSWORD, DATABASE, DATABASE_TEST, HOST, USER_NAME.  
- Create a BD within Mysql with the same name as the one in the environment variable DATABASE and add permissions to the user defined in environment variables USER_NAME, PASSWORD to create, read, update and delete within said DB.  
- Run the command npm run migrations to execute migrations and configure your DB.
- Use npm run start to execute the program (it'll execute according to the environment you defined if NODE_ENV wasn't defined then it'll the environment to development).  
- Use npm run test to execute the tests.  

## API Documentation backEndMongoProv

- Run the program and go to http://localhost:{PORT}/api-docs