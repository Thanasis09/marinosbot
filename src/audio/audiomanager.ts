import {
  DisTube,
  type Song,
  type Queue,
  Events,
  DisTubeOptions,
} from 'distube';

import { Client, VoiceBasedChannel } from 'discord.js';

import { YtDlpPlugin } from '@distube/yt-dlp';
import { PlayRequest } from '@/types/audio.js';

export type AudioErrorCode = 
  | 'NO_QUEUE'
  | 'NO_SONG'
  | 'NOT_IN_VOICE'
  | 'INVALID_VOICE_CHANNEL'
  | 'INVALID_SEEK_TIME'
  | 'QUEUE_EMPTY'
  | 'ALREADY_RADIO'
  | 'NOT_ENOUGH_VOTES';


export class AudioError extends Error {
  public readonly code: AudioErrorCode;

  constructor(code: AudioErrorCode, detail?: string) {
    super(`[${code}]${detail ? ` ${detail}` : ''}`)
    this.name = 'AudioError';
    this.code = code;
  }
}


export class AudioManager {
  public readonly distube: DisTube;
  public readonly client: Client;

  constructor(client: Client, distubeOptions: Partial<DisTubeOptions> = {}) {
    this.client = client;
    
    this.distube = new DisTube(client, {
      emitNewSongOnly: true,
      emitAddSongWhenCreatingQueue: true,
      emitAddListWhenCreatingQueue: true,
      joinNewVoiceChannel: true,
      plugins: [
        new YtDlpPlugin({ update: false })
      ],
      ...distubeOptions,
    });
  }

  /**
   * @param {PlayRequest} rq
   * @throws {AudioError} If the voice channel is invalid or the play request is malformed.
   * @returns {Promise<void>}
   */
  
  async play(rq: PlayRequest): Promise<void> {
    const voiceChannel = this.client.channels.cache.get(rq.voiceChannelId);

    if (!voiceChannel?.isVoiceBased()) throw new AudioError('INVALID_VOICE_CHANNEL');

    const guild = this.client.guilds.cache.get(voiceChannel.guild.id);
    const member = guild?.members.cache.get(rq.requesterId);

    await this.distube.play(voiceChannel as VoiceBasedChannel, rq.query, {
      member: member!,
      textChannel: rq.textChannel,
      position: rq.playNext ? 1 : 0
    })

  }
  

  pause(guildId: string): Queue {
    const queue = this.distube.getQueue(guildId);
    if (!queue) throw new AudioError('NO_QUEUE');
    queue.pause();
    return queue;
  }

  resume(guildId: string): Queue {
    const queue = this.distube.getQueue(guildId);
    if (!queue) throw new AudioError('NO_QUEUE');
    queue.resume();
    return queue;
  }


  mute(guildId: string): true {
    const queue = this.distube.getQueue(guildId);
    if (!queue) throw new AudioError('NO_QUEUE');
    queue.setVolume(1);

    return true;
  }

  unmute(guildId: string): false {
    const queue = this.distube.getQueue(guildId);
    if (!queue) throw new AudioError('NO_QUEUE');
    queue.setVolume(100);

    return false;
  }

  private _registerEvents(): void {
    this.distube
      .on(Events.INIT_QUEUE, (queue) => {
        queue.autoplay = false;
      })

      .on(Events.PLAY_SONG, (queue, song) => {
        // todo
      })

      .on(Events.ADD_SONG, (queue, song) => {
        // todo
      })

      .on(Events.ERROR, (channel, error) => {
        console.error('Distube Error:', error);
      })

      .on(Events.DISCONNECT, async (queue) => {
        // todo
      })

      .on(Events.FINISH, async (queue) => {
        // todo
      })


  }
}