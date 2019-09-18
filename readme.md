# Express Auth With JWT
This is an example implementation of express authentication API using JWT.

## Requirement
* ```docker```
* ```docker-compose```
* ```MongoDB```

## How to run with docker
* ```bash ./install.sh```

## Installation
* Clone this repository
* ```npm install```
* ```touch .env```
* Set up your [.env](#env)
* ```npm start```

## .env
Variable that should be available on your system. So please insert this following variable in your .env file.
* ```SECRET_OR_KEY="This is a secret, feel free to give your secret in here"```
* ```DB_CONNECTION="mongodb://localhost/<Your database name goes here>"```
* ```PORT=<Your port goes here>```

## Useful Links
* [Build A Node.js API Authentication With JWT Tutorial](https://youtu.be/2jqok-WgelI)
* [Node.js API Authentication With JWT](https://youtu.be/7nafaH9SddU)
* [Live Server](https://api-auth-training.herokuapp.com)

## Test
* Coverage of the intergation test isn't 100% yet.
* ```npm run test``` To run the test
* ```npm run test:coverage``` to generate the coverage report from the test, ```/public/coverage```

## Documentation
Just visit this link:
```/documentation```
