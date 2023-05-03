# BotDistrikt Internship Application Test

By: Ong Xing Wei

## Prerequisites

Ensure that you have the following installed:

- Node.js
- npm/Yarn
- LoopBack CLI
- Ember CLI
- MongoDB

## Running the application

1. Start by cloning or this repository.
2. `cd` into the root directory.
3. Run `npm i` to install dependencies for the server.
4. Run `node .` to start the backend server.
5. Once done, `cd client` and run `npm i` again to install the frontend dependencies.
6. Run `ember s`
7. Once the frontend is built, you should be able access the application at `http://localhost:4200`.
8. Do contact me if you run into any trouble running the application.

## Design Decisions

One significant decision made was the choice of the database. Initially, I tried to use PostgreSQL for the database, however, I ran into some issues integrating with LoopBack and in the interest of time, I decided to use a simpler noSQL database like mongoDB instead.

Another decision was to only allow Authors to be deleted only if they had no books that were authored by them stored in the database. I figured that if users could delete Authors without restrictions, it could possibly cause many of the Books to be "authorless" since they are in a Many-to-One relationship.

## Trade-offs

A significant trade-off was the decision to use EmberJS and LoopBack 3.x to build this web applcation. With the extra load of having to pick up and troubleshoot these 2 totally new frameworks, there was definitely more to be done in terms of proper functionality and UI/UX.

## Improvements

There are definitely areas of improvements for my submission. After learning more about EmberJS, I realised I should have tried to transform backend responses to fit the JSON:API specification so that I can fully benefit from the various features that EmberJS provides such as relations between different models, allowing for easy querying.

One of the functionalities to edit Author names is not implemented as well. This could be due to the fact that I interpreted the given data models incorrectly, but I was unable to update the 'names' property since they are the ids for the Author model and LoopBack would just reject any of these requests. Due to the lack of time, I am unable to fix this issue and have to submit it as such.

I would have liked to have done more frontend testing as well.

Regardless of the result. I hope that you can provide feedback on this submission, it would be greatly appreciated, thank you!
