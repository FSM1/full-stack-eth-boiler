# Ethers React Redux Typescript Mongo Boilerplate

## Structure

This full-stack boilerplate contains all the components needed for a full-stack
typescript application.

* Database: MongoDb
* Api Server: NestJS + Mongoose
* Web App: React + Redux
 
## System Requirements

* NodeJS >= v10
* Yarn >= 1.0
* MongoDb instance

## Getting Started

1.  Clone the repo
2.  Run `yarn` in the project root
3.  Run `cd api`
4.  Make a copy of the `.env.example` file named `.env`
5.  Input your MongoDb server details in the `MONGO-HOST=` field (this will be
    localhost if you are running mongo locally or in a docker container with 
    host networking)
6.  Run `cd ..`
7.  Run `cd webapp`
7.  Make a copy of the `.env.example` file named `.env`
8.  Run `cd ..`
9.  Ensure the ApiServer details in the `API_HOST=` field are correct
10.  Run `yarn start:dev` to spin up all the necessary applications