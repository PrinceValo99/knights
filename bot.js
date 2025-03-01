import { Client } from "https://deno.land/x/discordeno/mod.ts";
import { createCanvas } from "https://deno.land/x/canvas/mod.ts";

const client = new Client();

// Simple map generation example
function generateMap() {
  const canvas = createCanvas(1000, 1000);
  const ctx = canvas.getContext("2d");

  // Drawing ocean and land
  ctx.fillStyle = "#1E90FF";  // Ocean color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#228B22";  // Land color
  ctx.beginPath();
  ctx.arc(500, 500, 300, 0, Math.PI * 2);  // Drawing a simple landmass
  ctx.fill();

  return canvas.toBuffer();  // Returning the map as an image buffer
}

// Command handler for '!createnation'
client.on("messageCreate", (message) => {
  if (message.content.startsWith("!createnation")) {
    const args = message.content.split(" ");
    const nationName = args[1] || "Unnamed Nation";
    const region = args[2] || "Unknown Region";

    // Sending confirmation
    message.channel.send(`${nationName} has been created in the ${region}.`);

    // Generating and sending the map
    const updatedMap = generateMap();
    message.channel.send({
      content: "Here is the updated map with your new nation!",
      files: [{ attachment: updatedMap, name: "map.png" }],
    });
  }
});

// Log in with the bot token
client.login("YOUR_BOT_TOKEN");
