/*
  COPYRIGHT 2023 TOASTERPANIC
  ALL RIGHTS RESERVED
*/

// Setup the database
var db = {
  currentDistrictToAddNewUsersTo: 0,
  districts: {
    elektro: {
      fancyName: "District of Elektro",
      emoji: "<:elektro_emblem:1132373270277128192>",
      desc: `Following the seperation of the Breakout Three, Electron Snyder founded Elektro, a district shrouded in controversy. Known for their extreme actions during the war, Electron's leadership turned Elektro into a communist nightmare, overshadowing its technological advancements for decades. Under the rigid regime, individual freedoms were stifled, hindering the district's true potential and leaving its people yearning for liberation.`,
      leaderName: "leader",
      leader: "876144655929049129",
      leaderLastMessage: new Number(`${new Date().getDate()}${new Date().getMonth()}${new Date().getYear()}`),
      value: 50000,
      pop: 1,
      ownedTerritory: ["north1","north2","north3","north4","upper1","upper2","south1",]
    },
    catatuku: {
      fancyName: "New Republic of Catatuku",
      emoji: "<:catatuku_emblem:1132410161428971590>",
      desc: ``,
      leaderName: "president",
      leader: "",
      leaderLastMessage: new Number(`${new Date().getDate()}${new Date().getMonth()}${new Date().getYear()}`),
      value: 50000,
      pop: 0,
      ownedTerritory: ["north5","upper3","upper4","upper5","lower2","lower4","lower5",]
    },
    aethos: {
      fancyName: "Aethos",
      emoji: "<:catatuku_emblem:1132410161428971590>",
      desc: ``,
      leaderName: "ruler",
      leader: "",
      leaderLastMessage: new Date().getTime(),
      value: 60000,
      pop: 0,
      ownedTerritory: ["lower3","south2","south3","south4","south5","lower1"]
    },
  },
  users: {}
};
const fs = require('fs');

function backupDatabase() {
  fs.writeFile('economy.db', JSON.stringify(db), err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database backed up successfully!");
    }
  });
}

backupDatabase();

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, WebhookClient } = require('discord.js');
const hook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1132427945802223676/L0FHoopekuL3JJSSM8WJi2m5_F7iQsWZnWkdAek0TX1BZqeVCbx7iHxb3sBaCX95etMU' });
const { workResults, crimeSuccess, crimeFailure } = require('./work.js'); 

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers
] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`ready to go :3 (as "${c.user.tag}")`);
  console.log(`im so cool B3`);
});

function sendHook() {
  hook.send("proto ping");
}
sendHook();
setInterval(sendHook,290000);

function checkIfUserInitialized(id,username) {
  if (!db.users[id]) {
    if (db.currentDistrictToAddNewUsersTo < Object.keys(db.districts).length)
      db.currentDistrictToAddNewUsersTo = 0;
    
    db.users[id] = {
      username: "",
      userId: id,
      bankCash: 400,
      walletCash: 100,
      leaderOf: "none",
      memberOf: Object.keys(db.districts)[db.currentDistrictToAddNewUsersTo],
      lastWork: 7200000,
      lastCrime: 7200000,
    };
  }
  db.users[id].username = username;
}

client.on('messageCreate', function(message) { 
  console.log("new message");
  if (/^(proto |:3)userid$/i.test(message.content)) {
    message.channel.send(message.author.id);
  }
  if (/^(proto |:3)ping$/i.test(message.content)) {
    message.channel.send("Pong!");
  }
  if (/^(proto |:3)districts( [\S]+|[\s]*)$/i.test(message.content)) {
    /* 
      proto districts (NULLABLE STRING: district name)
      
      Gives info on Protobot districts, including district value, population, and current leader.
    */
    if (/^(proto |:3)districts ([\S]+)$/i.test(message.content)) {
      const match = db.districts[message.content.match(/^(proto |:3)districts ([\S]+)$/i)[2].toLowerCase()];
      
      if (match) message.channel.send({ embeds: [
          {
            "id": 668723911,
            "title": `${match.fancyName} ${match.emoji}`,
            "description": `**POPULATION:** ${match.pop}
**CURRENT VALUE:** ${match.value}
**CURRENT ${match.leaderName.toUpperCase()}:** ${db.users[match.leader]?.username}

${match.desc}`,
            "fields": []
          }
        ]});
      else message.channel.send({ embeds: [
        {
          "id": 668723911,
          "title": "Failure to load district!",
          "description": "Maybe you misspelled something?",
          "fields": []
        }
      ]});
    } else {
      var result = "";
      var vals = Object.values(db.districts);
      var keys = Object.keys(db.districts);
      for (let i=0; i<vals.length; ++i) {
        result += `**${vals[i].fancyName.toUpperCase()} ${vals[i].emoji}:** proto districts ${keys[i]}\n`
      }
      result += `${vals.length} districts exist`
      message.channel.send({ embeds: [
        {
          "id": 668723911,
          "title": "District Data",
          "description": result,
          "fields": []
        }
      ]});
    }
  }
  /* 
    proto lore (STRING: article code)
      
    Find the backstory and terrible past behind the Districts. Here's an article code to get you started: "saiclos"
  */
  /*if (/^(proto |:3)lore saiclos[\s]*$/i.test(message.content)) {
    message.channel.send({ embeds: [
      {
        "id": 668723911,
        "title": "War of Saiclos by DistrictHistoric, written Sep. 24, 2182",
        "description": `The War of Saiclos, which took place in 2147, stands as one of the bloodiest conflicts in relatively recent history. The battleground was upper North America, where the United States experienced constant riots even in suburban towns due to the enactment of controversial laws "to protect the children." These laws granted the government extensive powers to conduct extreme surveillance on its citizens with few restrictions.
<br><br>
Amid this turmoil, three remarkable individuals emerged: Electron Snyder, Will "FishpastePummel" Quinn, and Albert Sterling, collectively known as the Breakout Three. Together, they devised a daring plan to leave the United States, establish a new island, welcome those seeking refuge, and create their own country. While they eventually succeeded in achieving their vision, their journey was riddled with challenges.
<br><br>
Electron, once a trusted ally, became difficult to work with, insisting that everything be done his way. Will's sanity seemed to be slipping away, and Albert yearned to distance himself from the group. In order to maintain harmony, they agreed to divide control into different districts (except for Electron), ensuring each member received a fair share of land.
<br><br>
However, Electron's ambition knew no bounds. Driven by a desire for absolute power, he resorted to treachery, initiating a war against the other two. In this brutal conflict, the laws of war were abandoned, and any means that could grant an advantage were employed, regardless of the cost. Guerilla warfare became the primary tactic, with deadly traps designed to inflict maximum suffering.
<br><br>
The devastating war continued, consuming everything they had worked tirelessly to build. Finally, in 2151, the three districts managed to reach a peace treaty, but the War of Saiclos left a lasting, irreversible impact—it permanently destroyed the relations between them. The scars of this brutal conflict would forever serve as a stark reminder of the perils of unrestrained ambition and the crucial importance of unity in times of turmoil.`.replace(/\n/g," ").replace(/<br>/g,"\n"),
        "fields": []
      }
    ]});
  }*/
  if (message.content == "proto debug 1") checkIfUserInitialized(message.author.id, message.author.username);
  if (message.content == "proto debug 2") console.log(db.users[message.author.id]);
  if (message.content == "proto debug 3") console.log(db.users);
  
  if (/^(proto |:3)work[\s]*$/i.test(message.content)) {
    /* 
      proto work
      Quick cash command.
    */
    checkIfUserInitialized(message.author.id, message.author.username);
    if (new Date().getTime() < db.users[message.author.id].lastWork) {
      message.channel.send({ embeds: [
        {
          "id": 668723911,
          "title": "Failed to work",
          "description": "You need to wait at least two hours until you can work again.",
          "fields": [],
          "color": 16711680
        }
      ]});
      return;
    }
    
    var add = Math.floor(Math.random()*250) + 100;
    db.users[message.author.id].walletCash += add;
    db.users[message.author.id].lastWork = new Date().getTime() + 7200000;
    
    message.channel.send({ embeds: [
      {
        "id": 668723911,
        "title": "Work",
        "description": workResults[Math.floor(Math.random()*workResults.length)].replace("%$",add).replace("%e","<:computer_ram:1119087887913320498>"),
        "fields": [],
        "color": 7929600
      }
    ]});
  }
  if (/^(proto |:3)crime[\s]*$/i.test(message.content)) {
    /* 
      proto crime
      Commit a crime for a chance at some cash (25%)
    */
    checkIfUserInitialized(message.author.id, message.author.username);
    if (new Date().getTime() < db.users[message.author.id].lastCrime) {
      message.channel.send({ embeds: [
        {
          "id": 668723911,
          "title": "Failed to commit crimes",
          "description": "You need to wait at least two hours until you can commit more crimes.",
          "fields": [],
          "color": 16711680
        }
      ]});
      return;
    }
    var result = Math.floor(Math.random()*3)
    db.users[message.author.id].lastCrime = new Date().getTime() + 7200000;
    
    if (!result) {
      var add = Math.floor(Math.random()*350) + 400;
      db.users[message.author.id].walletCash += add;
      message.channel.send({ embeds: [
        {
          "id": 668723911,
          "title": "Crimes",
          "description": crimeSuccess[Math.floor(Math.random()*crimeSuccess.length)].replace("%$",add).replace("%e","<:computer_ram:1119087887913320498>"),
          "fields": [],
          "color": 7929600
        }
      ]});
    } else {
      var rem = Math.floor(Math.random()*250) + 100;
      db.users[message.author.id].walletCash -= rem;
      message.channel.send({ embeds: [
        {
          "id": 668723911,
          "title": "Crimes",
          "description": crimeFailure[Math.floor(Math.random()*crimeFailure.length)].replace("%$",rem).replace("%e","<:computer_ram:1119087887913320498>"),
          "fields": [],
          "color": 16711680
        }
      ]});
    }
  }
  if (/^(proto |:3)bal(ance){0,1}[\s\S]*$/i.test(message.content)) {
    /* 
      proto [bal|balance] (MENTION: user)
      Get the balance of a user. Don't add a mention to check your balance.
    */
    checkIfUserInitialized(message.author.id,message.author.username);
    if (/^(proto |:3)bal(ance){0,1}[\s]*$/i.test(message.content)) {
      message.channel.send({ embeds: [
        {
          "id": 668723911,
          "title": message.author.username+"'s Balance",
          "description": `Wallet: %e${db.users[message.author.id].walletCash}
Bank: %e${db.users[message.author.id].bankCash}`.replace(/%e/g,"<:computer_ram:1119087887913320498>"),
          "fields": []
        }
      ]});
    } else {
      var user = db.users[message.content.match(/^(proto |:3)bal(ance){0,1}[\s]+<@([\S]*)>[\s]*$/i)[3]];
      if (user) {
        message.channel.send({ embeds: [
          {
            "id": 668723911,
            "title": user.username+"'s Balance",
            "description": `Wallet: %e${user.walletCash}
Bank: %e${user.bankCash}`.replace(/%e/g,"<:computer_ram:1119087887913320498>"),
            "fields": []
          }
        ]});
      } else {
        message.channel.send({ embeds: [
          {
            "id": 668723911,
            "title": "Failure to get user balance",
            "description": "The user you mentioned may not have initialized their account, or could just not exist in the server.",
            "fields": []
          }
        ]});
      }
    }
  }
});

client.login(process.env.token);