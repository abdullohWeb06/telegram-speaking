
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require('path');


const bot = new TelegramBot('6203246841:AAEcbefws5Hs5d-DI68Z9aTnDN7ZSGETI30', { polling: true });


// Directory paths for each part
const PART1_DIRECTORY = 'Part 1';
const PART2_DIRECTORY = 'Part 2';
const PART3_DIRECTORY = 'Part 3';



// Counter variable to keep track of the number of users
let count = 0;

// Initial menu keyboard markup
const initialMenuKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [   ["Part 1", "Part 2", "Part 3"]],  resize_keyboard: true,
  }),
};

// Function to get the corresponding .jpg file name for each part
function getImageFilename(part, buttonName) {
  let directory = null;
  if (part === "Part 1") {
    directory = PART1_DIRECTORY;
  } else if (part === "Part 2") {
    directory = PART2_DIRECTORY;
  } else if (part === "Part 3") {
    directory = PART3_DIRECTORY;
  }
  return path.join(directory, `${buttonName}.jpg`);
}

function getAnsFilename(part, buttonName) {
  let directory = null;
  if (part === "Part 1") {
    directory = PART1_DIRECTORY;
  } else if (part === "Part 2") {
    directory = PART2_DIRECTORY;
  } else if (part === "Part 3") {
    directory = PART3_DIRECTORY;
  }
  return path.join(directory, `${buttonName}.txt`);
}






// Handler for the "/count" command
bot.onText(/\/count/, (msg) => {
  bot.sendMessage(msg.chat.id, `Bot has ${count} users.`);
});

// Handler for the initial menu
bot.onText(/\/start|\/menu/, (msg) => {
  const user = msg.from;
  bot.sendMessage(msg.chat.id, `Hi👋 ${user.first_name}`, initialMenuKeyboard);

  // Increment if a new member joined
  count += 1;
});


// Handler for Part 1 button
bot.onText(/Part 1/, (msg) => {
  bot.sendMessage(msg.chat.id, "#Part1 questions with answers:", part1Keyboard );
});

// Handler for Part 2 button
bot.onText(/Part 2/, (msg) => {
  bot.sendMessage(msg.chat.id, "#Part2 questions:",  part2Keyboard );
});

// Handler for Part 3 button
bot.onText(/Part 3/, (msg) => {
  bot.sendMessage(msg.chat.id, "#Part3 questions:",  part3Keyboard );
});

// Part 1 keyboard markup
const part1Keyboard = {
    reply_markup: JSON.stringify({
      keyboard: [
        ["🔙 Back"],
        ["Work&Studies", "Hometown", "Home&Decoration", "Chocolate"],
        ["Staying up late", "Outer space&Stars", "Jewelry", "Music"],
        ["Small businesses", "Weekends", "T-shirts", "Happiness"],
        ["Art", "Keys", "Libraries", "Schools"],
        ["Bags", "Wild animals", "Rain", "Teachers"],
        ["Concentration", "Friends", "Languages", "Ice Cream"],
        ["Fixing things", "Week", "Ambitions", "Health"],
        ["Dreams", "Days off"],
      ],
      resize_keyboard: true,
    }),
  };
  
// Part 2 and Part 3 keyboard markups (you can customize the button names)
const part2Keyboard = {
    reply_markup: JSON.stringify({
      keyboard: [
        ["🔙 Back"],
        ["Historical Period", "Group Activity", "Unusual meal", "Website"],
        ["Piece of technology", "City", "Teaching a friend or relative", "Meeting you missed or were late for"],
        ["Polluted place", "Development in your city", "Old person", "Feeling proud"],
        ["Free time activity", "Person you want to work or study", "Gift you got", "Complaint"],
        ["Something you'd like to learn", "Movie character", "Noisy place", "Daily routine you enjoy"],
        ["Good news", "First day at school", "Favourite place in your home", "Person you met at a party"],
        ["Advertisement you don't like", "Time you spent with a child", "Getting lost", "Piece of clothing"],
        ["Incorrect information", "Place to visit in the future", "Enjoyable experience in your childhood", "Game"],
        ["New shop", "Invention", "Car journey", "Book"],
        ["Person who moved into new accommodation", "Popular person", "Film you didn't like", "Helpful person"],
        ["Ideal house or apartment", "Adventure you'd like to take", "Expensive gift", "Water sport"],
        ["Speech you gave", "Crowded place", "Interesting job", "Traditional festival"],
        ["Sports program", "Important decision"],
      ],
      resize_keyboard: true,
    }),
  };
  
  const part3Keyboard = {
    reply_markup: JSON.stringify({
      keyboard: [
        ["🔙 Back"],
        ["Sports, Keeping fit", "Traditional festivals", "Careers", "Queues, Crowds of people"],
        ["Communication", "Water activities, water transport", "Money", "Making decisions"],
        ["Adventures", "Living in the city, accommodation", "Helping others, volunteering", "Movies"],
        ["Popularity, famous people", "Living on your own", "Books", "Public transport"],
        ["Inventions, inventors", "Shops", "Games", "Memory"],
        ["Travelling", "Information", "Clothes", "Getting lost"],
        ["Bringing up children", "Advertising", "Meeting people", "Having a rest, Doing exercise"],
        ["Jobs, school, kids", "Sharing news", "Routines", "Noise"],
        ["Actors", "Making decisions, learning things", "Complaints", "Gifts and rewards"],
        ["Classmates, colleagues", "Leisure time", "Goals, rewards, feeling proud", "Old people, selfishness"],
        ["Transportation, leisure facilities", "Pollution", "Being late", "Cities"],
        ["Skills", "Technology", "Internet, TV, Libraries", "Eating out"],
        ["Neighbors", "History"],
      ],
      resize_keyboard: true,
    }),
  };
  
    





// Handler for the individual buttons in Part 1
bot.onText(/Work&Studies|Hometown|Home&Decoration|Chocolate|Staying up late|Outer space&Stars|Jewelry|Music|Small businesses|Weekends|T-shirts|Happiness|Art|Keys|Libraries|Schools|Bags|Wild animals|Rain|Teachers|Concentration|Friends|Languages|Ice Cream|Fixing things|Week|Ambitions|Health|Dreams|Days off/, (msg, match) => {
  const buttonName = match[0];
  const textFilename = getAnsFilename("Part 1", buttonName); // Change to appropriate section
  const imageFilename = getImageFilename("Part 1", buttonName);

  if (fs.existsSync(imageFilename)) {
    bot.sendDocument(msg.chat.id, fs.readFileSync(imageFilename), {}, {
      filename: 'image.jpg' // Specify the desired filename for the image
    }).then(() => {
      // Send the text content after a certain interval (e.g., 2 seconds)
      setTimeout(() => {
        if (fs.existsSync(textFilename)) {
          const textContent = fs.readFileSync(textFilename, 'utf-8');
          bot.sendMessage(msg.chat.id, textContent);
        } else {
          bot.sendMessage(msg.chat.id, "Text not found!");
        }
      }, 1000); // Change the interval time as needed
    });
  } else {
    bot.sendMessage(msg.chat.id, "Image not found!");
  }


});


// Handler for the individual buttons in Part 2
bot.onText(/Historical Period|Group Activity|Unusual meal|Website|Piece of technology|City|Teaching a friend or relative|Meeting you missed or were late for|Polluted place|Development in your city|Old person|Feeling proud|Free time activity|Person you want to work or study|Gift you got|Complaint|Something you'd like to learn|Movie character|Noisy place|Daily routine you enjoy|Good news|First day at school|Favourite place in your home|Person you met at a party|Advertisement you don't like|Time you spent with a child|Getting lost|Piece of clothing|Incorrect information|Place to visit in the future|Enjoyable experience in your childhood|Game|New shop|Invention|Car journey|Book|Person who moved into new accommodation|Popular person|Film you didn't like|Helpful person|Ideal house or apartment|Adventure you'd like to take|Expensive gift|Water sport|Speech you gave|Crowded place|Interesting job|Traditional festival|Sports program|Important decision/, (msg, match) => {
  const buttonName = match[0];
  const imageFilename = getImageFilename("Part 2", buttonName);
  if (fs.existsSync(imageFilename)) {
    bot.sendDocument(msg.chat.id, fs.readFileSync(imageFilename));
  } else {
    bot.sendMessage(msg.chat.id, "Image not found!");
  }
});

// Handler for the individual buttons in Part 3
bot.onText(/Sports, Keeping fit|Traditional festivals|Careers|Queues, Crowds of people|Communication|Water activities, water transport|Money|Making decisions|Adventures|Living in the city, accommodation|Helping others, volunteering|Movies|Popularity, famous people|Living on your own|Books|Public transport|Inventions, inventors|Shops|Games|Memory|Travelling|Information|Clothes|Getting lost|Bringing up children|Advertising|Meeting people|Having a rest, Doing exercise|Jobs, school, kids|Sharing news|Routines|Noise|Actors|Making decisions, learning things|Complaints|Gifts and rewards|Classmates, colleagues|Leisure time|Goals, rewards, feeling proud|Old people, selfishness|Transportation, leisure facilities|Pollution|Being late|Cities|Skills|Technology|Internet, TV, Libraries|Eating out|Neighbors|History/, (msg, match) => {
  const buttonName = match[0];
  const imageFilename = getImageFilename("Part 3", buttonName);
  if (fs.existsSync(imageFilename)) {
    bot.sendDocument(msg.chat.id, fs.readFileSync(imageFilename));
  } else {
    bot.sendMessage(msg.chat.id, "Image not found!");
  }
});

// Handler for "Back to Menu" button in Part 1, Part 2, and Part 3
bot.onText(/🔙 Back/, (msg) => {
  bot.sendMessage(msg.chat.id, "Back to the main menu:", initialMenuKeyboard);
});


