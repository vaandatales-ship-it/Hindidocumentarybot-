export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Documentary Agent is running");
  }

  try {
    const message = req.body?.message;

    if (!message?.chat) {
      return res.status(200).send("OK");
    }

    const chatId = message.chat.id;
    const topic = message.text || "";

    const reply = topic === "/start"
      ? "Namaste! 🎬 Hindi Documentary Agent ready hai. Apna documentary topic bhejo."
      : `Topic received: ${topic}\n\n🎬 Documentary Agent active hai!`;

    const response = await fetch(
  `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: reply })
  }
);

const resultText = await response.text();

console.log("TELEGRAM_HTTP_STATUS:", response.status);
console.log("TELEGRAM_RAW_RESPONSE:", resultText);

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(200).send("OK");
  }
}
