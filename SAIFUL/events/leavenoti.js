module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
	description: "Notify the Bot or the person leaving the group with a random gif/photo/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "leaveGif", "randomgif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:s");
  const hours = moment.tz("Asia/Dhaka").format("HH");
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "leave" : "managed";
	const path = join(__dirname, "events", "123.mp4");
	const pathGif = join(path, `${threadID}123.mp4`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

(typeof data.customLeave == "undefined") ? msg = "╭═════⊹⊱✫⊰⊹═════╮\n  𝐎𝐰𝐧𝐞𝐫 𝐒𝐚𝐢𝐦𝐨𝐧 \n⚠️ গুরুতর ঘোষণা ⚠️\n╰═════⊹⊱✫⊰⊹═════╯\n\n{session}||{name} ভাই/বোন...\nএই মাত্র গ্রুপ থেকে নিখোঁজ হয়েছেন!\nগ্রুপবাসীদের পক্ষ থেকে গভীর উদ্বেগ ও\nচাপা কান্নার মাধ্যমে জানানো যাচ্ছে...\n\n— উনি আর নেই... মানে গ্রুপে নেই!\nকিন্তু হৃদয়ে থেকে যাবেন, এক্টিভ মেম্বার হিসেবে | \n\n⏰ তারিখ ও সময়: {time}\n⚙️ স্ট্যাটাস: {type} (নিজে গেলো নাকি তাড়ানো হইলো বুঝলাম না)\n\✍️ মন্তব্য করে জানাও: তোমার কী ফিলিংস হইছে এই বিচ্ছেদে?" : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type).replace(/\{session}/g, hours <= 10 ? "𝙈𝙤𝙧𝙣𝙞𝙣𝙜" : 
    hours > 10 && hours <= 12 ? "𝘼𝙛𝙩𝙚𝙧𝙉𝙤𝙤𝙣" :
    hours > 12 && hours <= 18 ? "𝙀𝙫𝙚𝙣𝙞𝙣𝙜" : "𝙉𝙞𝙜𝙝𝙩").replace(/\{time}/g, time);  

	const randomPath = readdirSync(join(__dirname, "cache", "leaveGif", "randomgif"));

	if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif) }
	else if (randomPath.length != 0) {
		const pathRandom = join(__dirname, "cache", "leaveGif", "randomgif",`${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}

module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "1.0.7",
  credits: "Mohammad Akash",
  description: "Premium Auto Welcome Message with New Member & Adder Tag"
};

module.exports.run = async function ({ api, event, Users }) {
  const { threadID, logMessageData } = event;
  const addedMembers = logMessageData.addedParticipants || [];
  const adderID = logMessageData.author || null; // যে অ্যাড করেছে

  const adderName = adderID ? await Users.getNameUser(adderID) : "Admin";
  const adderMention = adderID ? [{ id: adderID, tag: adderName }] : [];

  for (let member of addedMembers) {
    const userName = await Users.getNameUser(member.userFbId);
    const mention = [{ id: member.userFbId, tag: userName }, ...adderMention];

    const msg = 
`💠━━━━━━━━━━━━━━━━💠
     ✨ 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 ✨
💠━━━━━━━━━━━━━━━━💠

👤 𝐇𝐞𝐲 ${userName}! 𝐖𝐞 𝐚𝐫𝐞 𝐬𝐨 𝐡𝐚𝐩𝐩𝐲 𝐭𝐨 𝐡𝐚𝐯𝐞 𝐲𝐨𝐮 𝐡𝐞𝐫𝐞 🎉  

🌟 𝐏𝐥𝐞𝐚𝐬𝐞 𝐟𝐨𝐥𝐥𝐨𝐰 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐫𝐮𝐥𝐞𝐬  
🔥 𝐁𝐞 𝐚𝐜𝐭𝐢𝐯𝐞 & 𝐫𝐞𝐬𝐩𝐞𝐜𝐭 𝐨𝐭𝐡𝐞𝐫𝐬  

🙌 𝐓𝐡𝐚𝐧𝐤𝐬 𝐭𝐨 𝐀𝐝𝐝𝐞𝐫: ${adderName} 💖

⚡ 𝐄𝐧𝐣𝐨𝐲 & 𝐒𝐭𝐚𝐲 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝 ⚡

💠━━━━━━━━━━━━━━━━💠
 🤖 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 𝐁𝐲 𝐒𝐚𝐢𝐦𝐨𝐧
💠━━━━━━━━━━━━━━━━💠`;

    api.sendMessage({ body: msg, mentions: mention }, threadID);
  }
};
