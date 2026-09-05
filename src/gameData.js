export const regions = [
  {
    id: "forgotten-fields",
    name: "Forgotten Fields",
    status: "unlocked",
    encounters: [
      { id: "rat", name: "Rift Rat", hp: 5, timeLimit: 30, type: "normal" },
      { id: "goblin", name: "Mud Goblin", hp: 8, timeLimit: 30, type: "normal" },
      { id: "bat", name: "Dark Bat", hp: 6, timeLimit: 30, type: "normal" },
      { id: "boar", name: "Corrupted Boar", hp: 15, timeLimit: 45, type: "normal" },
      { id: "brute", name: "Goblin Brute", hp: 20, timeLimit: 45, type: "mini-boss" },
      { id: "wolf", name: "RIFT WOLF", hp: 25, timeLimit: 20, type: "boss" }
    ]
  },
  { id: "whispering-woods", name: "Whispering Woods", status: "locked" },
  { id: "bone-mountains", name: "Bone Mountains", status: "locked" },
  { id: "sunken-kingdom", name: "Sunken Kingdom", status: "locked" },
  { id: "ashlands", name: "Ashlands", status: "locked" },
  { id: "frozen-wastes", name: "Frozen Wastes", status: "locked" },
  { id: "shadow-realm", name: "Shadow Realm", status: "locked" },
  { id: "the-rift", name: "The Rift", status: "locked" }
];
