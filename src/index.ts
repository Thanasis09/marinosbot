import { Client, GatewayIntentBits, MessageFlags, Partials, ActivityType, Collection } from 'discord.js';

import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],

  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
  ],
});

client.commands = new Collection();

if (!token) {
  console.error('Missing bot token.');
  process.exit(1);
}

client.login(token)

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});