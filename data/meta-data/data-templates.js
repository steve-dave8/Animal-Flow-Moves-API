//Template for adding a move to moveList.json:

let moveTemplate = 
{
  "move":"",
  "alias":null,
  "precursor":null,
  "imgSrc":"./AF-move-images/placeholder.png",
  "level":"",
  "component":"",
  "callout":{
    "keyPhrase":null,
    "direction":"",
    "command":"",
    "shorthand":""
  },
  "nextMoves":[]
}

/*
>>>move is the full callout (ex: "left leg scorpion reach");

>>>alias is another move that's effectively the same as the current move just with a different callout and transition
(ex: "return to loaded beast" and "pop back to loaded beast" are effectively the same as "set loaded beast" so "set loaded beast" would be the alias for these two;
"return to crab" is not necessarily the same as "set static crab" though as you could transition into other movements);

>>>precursor is the required previous movement or position for the current move. It is included when a movement can be done from multiple starting positions.
(ex: "left leg scorpion reach" can be done from static beast or loaded beast so a precursor needs to be included;
"continue the switch" doesn't indicate which side so precursor would be needed here too).

>>>levels options: 1, 2, or 3

>>>component options: static activations, form specific stretches, switches and transitions, traveling forms

>>>callout:

  >>>key phrases options: set, return to, slide to, fall back to, pop back to, to, into, jump to, levitate to,
  push back to, float to,
  ...(TODO: add all options)

  >>>direction: for this API the direction is the combination of direction/side and limb.
  direction options: left leg, right leg, left arm, right arm, left side, right side, 
  ...(TODO: add all options)

>>>nextMoves array can be left empty if the move has an alias as the list of next moves can be retrieved from the
alias. This is done to reduce the size of the moveList.json file.
*/

//Example move:
// {
//   "move":"left leg underswitch",
//   "alias":null,
//   "precursor":"static crab",
//   "imgSrc":"./AF-move-images/placeholder.png",
//   "level":"1",
//   "component":"switches and transitions",
//   "callout":{
//     "keyPhrase":null,
//     "direction":"left leg",
//     "command":"underswitch"
//   },
//   "nextMoves":[
//     "set loaded beast",
//     "into loaded beast",
//     "set deep ape",
//     "left leg scorpion reach precursor static beast",
//     "into left leg scorpion reach precursor static beast",
//     "right leg scorpion reach precursor static beast",       
//     "left leg side kickthrough",
//     "right leg side kickthrough",
//     "left leg underswitch precursor static beast",
//     "right leg underswitch precursor static beast",
//     "left leg underswitch tap precursor static beast",
//     "right leg underswitch tap precursor static beast",
//     "into right leg scorpion sweep"
//   ]
// }
