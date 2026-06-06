import { ActivityType, Client, Events } from 'discord.js';


export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    if (!client.user) return;

    console.log(`Logged on as ${client.user.tag}!`);
    client.user.setActivity('MarinosBot', {
      type: ActivityType.Listening,
    });
  }
}