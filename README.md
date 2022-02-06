# Animal Flow Moves API

## Description

A backend API that provides information on Animal Flow movements. Here is a sample movement:
```
{
    "move":"left leg underswitch",
    "alias":null,
    "precursor":"static crab",
    "imgSrc":"./AF-move-images/placeholder.png",
    "level":"1",
    "component":"switches and transitions",
    "callout":{
        "keyPhrase":null,
        "direction":"left leg",
        "command":"underswitch"
    },
    "nextMoves":[
        "set loaded beast",
        "into loaded beast",
        "set deep ape",
        "left leg scorpion reach precursor static beast",
        "into left leg scorpion reach precursor static beast",
        "right leg scorpion reach precursor static beast",       
        "left leg side kickthrough",
        "right leg side kickthrough",
        "left leg underswitch precursor static beast",
        "right leg underswitch precursor static beast",
        "left leg underswitch tap precursor static beast",
        "right leg underswitch tap precursor static beast",
        "into right leg scorpion sweep"
    ]
}
```
For information on each object key refer to "data/meta-data/data-templates.js"

See also "data/meta-data/moveList-index.js" for a quick look at the movements available in this API.

### Routes

1. Get all starting positions:

`GET /base-positions`

2. Get the list of all movements:

`GET /move-list`

3. For saved flows:
Flows can be saved locally to a user's device/app instance (using fs module) or a user can create an account to save their flows to a database (MongoDB) to be able to access them anywhere when logged in.

| Methods       | Local Endpoint     | User Account Endpoint  |
| ------------- | ------------------ | ---------------------- |
| POST          | '/saved-flows'     | '/users/saved-flows'   |
| GET           | '/saved-flows'     | '/users/saved-flows/:userEmail' |
| PATCH, DELETE | '/saved-flows/:id' | '/users/saved-flows/:id' |

4. User account creation:

`POST /users`

5. User login:

`POST /auth`

### Dependencies

bcrypt ; cors ; dotenv ; esm ; express ; jsonwebtoken ; mongoose ; nodemon (as a dev dependency) ; uuid

### Environment Setup

Create a .env file in your main folder and set a PORT variable. Example: `PORT=4000`. Also set a JWT_SECRET variable.
