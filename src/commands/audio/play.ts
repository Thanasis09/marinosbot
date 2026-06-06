import type { Command } from '../../types/command';
import {
  SlashCommandBuilder,
  type AutoCompleteInteraction,
  type ChatInputCommandInteraction,
  ChannelType,
} from 'discord.js';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song, playlist or URL')
    .addStringOption((opt) => 
      opt
        .setName('query')
        .setDescription('The song, playlist or URL to play')
        .setRequired(true)
        .setAutocomplete(true),
    )
    .addBooleanOption((opt) =>
      opt
        .setName('next')
        .setDescription('Insert at front of queue'),
    ),
  
  requiresVoice: true,

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    
    if (!interaction.guild) {
      await interaction.editReply('Server only.');
      return;
    }

    const rawQuery = interaction.options.getString('query', true).trim();
    const playNext = interaction.options.getBoolean('next') ?? false;

    const member = interaction.guild.members.cache.get(interaction.user.id);
    const voiceChannel = member?.voice.channel;

    if (!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
      await interaction.editReply('Join a voice channel first.');
      return;
    }
    if (!interaction.channel?.isTextBased()) {
      await interaction.editReply('Cannot bind player to this channel.');
      return;
    }

    try {
      //todo

    } catch (err: any) {
      console.error(err);
      await interaction.editReply(`There was an error while executing this command, ${err}`,);
    }
  }
}

export default command;