export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Documentary Agent is running");
  }

  try {
    const update = req.body;
    const message = update.message;

    if (!message || !message.chat) {
      return res.status(200).send("OK");
    }

    const chatId = message.chat.id;
    const topic = message.text || "";

    let reply;

    if (topic === "/start") {
      reply = "Namaste! 🎬 Hindi Documentary Agent ready hai. Apna documentary topic bhejo.";
    } else {
      reply = `Topic received: ${topic}\n\n🎬 Tumhara documentary project register ho gaya hai. AI production system agle step mein connect hoga.`;
    }

    await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply
        })
      }
    );

    return res.status(200).send("OK");
  } catch (error) {
    return res.status(200).send("OK");
  }
}
