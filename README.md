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

### Dependencies

cors ; dotenv ; esm ; express ; nodemon (as a dev dependency)

### Environment Setup

Create a .env file in your main folder. In this file add the following: 

PORT=

DATA_BASE_POSITIONS=./data/basePositions.json

DATA_MOVELIST=./data/moveList.json
