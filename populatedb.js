const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];

const User = require("./models/user");
const Message = require("./models/message");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const users = [];
const messages = [];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(first_name, last_name, username, password, isMember) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: password,
    isMember: isMember,
  });
  users.push(user);
  await user.save();
  console.log(`Added user ${username}`);
}

async function messageCreate(title, content, user) {
  const message = new Message({
    title: title,
    content: content,
    user: user,
  });
  messages.push(message);
  await message.save();
  console.log(`Added message ${title}`);
}

async function createUsers() {
  console.log("Adding users...");
  await Promise.all([
    userCreate("mark", "spencer", "coolBoy77", "12355", false),
    userCreate("Paul", "Harvard", "PaulHarvey", "ezfze", true),
    userCreate("John", "Kelly", "MaxxXo", "dsfsf", false),
  ]);
}

async function createMessages() {
  console.log("Adding messages...");
  await Promise.all([
    messageCreate("Hello", "This is my first message.", users[0]),
    messageCreate(
      "Welcome here",
      "Please stay here for a while, write a message, join our members program and have fun!",
      users[1]
    ),
    messageCreate("Huh", "I have no idea how this works", users[2]),
  ]);
}
