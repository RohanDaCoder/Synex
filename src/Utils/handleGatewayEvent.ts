import { EmbedBuilder, GuildMember } from "discord.js";
import { db } from "..";
import { GatewayEventType } from "@/types";

const WelcomeBackgroundUrl = "https://cdn.popcat.xyz/welcome-bg.png";

export async function handleGatewayEvent(
  member: GuildMember,
  eventType: GatewayEventType
) {
  if (!member) {
    console.error("Error: Member not provided in handleGatewayEvent function");
    throw new Error("Member not provided in handleGatewayEvent function");
  }

  const gatewayChannelID = await db.get(`gateway_${member.guild.id}`);
  if (!gatewayChannelID) {
    return;
  }

  const gatewayChannel = await member.guild.channels.fetch(gatewayChannelID);
  if (!gatewayChannel?.isTextBased()) {
    return;
  }

  const gatewayEmbed = createGatewayEmbed(member, eventType);

  await gatewayChannel.send({ embeds: [gatewayEmbed] }).catch((err) => {
    console.error(`Error sending message to ${gatewayChannel.name}:`, err);
  });
}

function createGatewayEmbed(member: GuildMember, eventType: GatewayEventType) {
  const serverName = member.guild.name;
  const memberCount = member.guild.memberCount;
  const isWelcomeEvent = eventType === GatewayEventType.Welcome;
  const embedTitle = isWelcomeEvent ? "Welcome!" : "Goodbye!";
  const embedColor = isWelcomeEvent ? "#00ff00" : "#ff0000";
  const mainText = `${isWelcomeEvent ? "Welcome to" : "Goodbye from"} ${serverName}`;
  const secondaryText = `${isWelcomeEvent ? "You are member" : "We now have"} #${memberCount}`;

  const imageUrl = `https://api.popcat.xyz/welcomecard?background=${encodeURIComponent(WelcomeBackgroundUrl)}&text1=${encodeURIComponent(member.user.username)}&text2=${encodeURIComponent(mainText)}&text3=${encodeURIComponent(secondaryText)}&avatar=${encodeURIComponent(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))}`;

  return new EmbedBuilder()
    .setTitle(embedTitle)
    .setDescription(`${mainText}, <@${member.user.id}>!`)
    .setColor(embedColor)
    .setImage(imageUrl)
    .setTimestamp();
}
