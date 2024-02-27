const telegramBot = require("node-telegram-bot-api");

require("dotenv").config();

const token = process.env.BOT_TOKEN;

const options = {
  polling: true,
};

const atoenggBot = new telegramBot(token, options);

const prefix = "/";
const promptGreat = new RegExp(`^${prefix}halo$`);
const promptGempa = new RegExp(`${prefix}info-gempa$`);

atoenggBot.onText(promptGreat, (callback) => {
  atoenggBot.sendMessage(callback.from.id, "Hallo juga a");
});

atoenggBot.onText(promptGempa, async (callback) => {
  const api_BMKG = process.env.BMKG_ENDPOINT;

  const apiCall = await fetch(api_BMKG + "autogempa.json");
  const {
    Infogempa: {
      gempa: { Jam, Tanggal, Magnitude, Kedalaman, Wilayah, Potensi, Shakemap },
    },
  } = await apiCall.json();

  const image_gempa = api_BMKG + Shakemap;

  const resultText = `
Waktu: ${Tanggal}, ${Jam}
Kedalaman: ${Kedalaman}
Besaran: ${Magnitude} SR
Wilayah: ${Wilayah}
Potensi: ${Potensi}`;
  atoenggBot.sendPhoto(callback.from.id, image_gempa, {
    caption: resultText,
  });
});
