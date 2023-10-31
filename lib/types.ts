import { LocalAudioTrack, LocalVideoTrack } from 'livekit-client';
import { EgressClient } from 'livekit-server-sdk';

export interface SessionProps {
  roomName: string;
  identity: string;
  audioTrack?: LocalAudioTrack;
  videoTrack?: LocalVideoTrack;
  region?: string;
  turnServer?: RTCIceServer;
  forceRelay?: boolean;
}

export interface TokenResult {
  url: string;
  token: string;
}

export interface RocordResult {
  url: string;
}
