import * as dotenv from 'dotenv';
import type { Collection } from 'discord.js'
import { Command } from './command';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      TOKEN: string;
      GUILD_ID: string;
      APP_ID: string;
      PUB_KEY: string;
    }
  }
}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}

export { };

