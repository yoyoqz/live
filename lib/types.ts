import { LocalAudioTrack, LocalVideoTrack } from 'livekit-client';

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
  egressId: string;
}

export interface StopRecord {
  egressId: string;
}

export interface FlvResult {
  ingressId?: string;
  name?: string;
  streamKey?: string;
  url?: string;
}