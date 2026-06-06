import {
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'

export interface Command {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | SlashCommandOptionsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

  requiresVoice?: boolean;
  requiresQueue?: boolean;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
}