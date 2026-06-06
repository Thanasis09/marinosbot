import type { GuildTextBasedChannel, Message } from 'discord.js';

export interface QueueMetadata {
  textChannel: GuildTextBasedChannel;
  muted: boolean;
}

export interface PlayRequest {
  query: string;
  voiceChannelId: string;
  textChannel: GuildTextBasedChannel;
  requesterId: string;
  playNext?: boolean;
}