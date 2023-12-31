import { RoomServiceClient } from 'livekit-server-sdk';

export function getRoomClient(): RoomServiceClient {
  checkKeys();
  return new RoomServiceClient(getLiveKitURL(), process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET);
}

export function getLiveKitURL(region?: string): string {
  let targetKey = 'LIVEKIT_URL';
  if (region) {
    targetKey = `LIVEKIT_URL_${region}`.toUpperCase();
  }
  const url = process.env[targetKey];
  if (!url) {
    throw new Error(`${targetKey} is not defined`);
  }
  return url;
}

function checkKeys() {
  if (typeof process.env.LIVEKIT_API_KEY === 'undefined') {
    throw new Error('LIVEKIT_API_KEY is not defined');
  }
  if (typeof process.env.LIVEKIT_API_SECRET === 'undefined') {
    throw new Error('LIVEKIT_API_SECRET is not defined');
  }
}

export function getLiveKitURL2(region?: string): string {
  if (typeof process.env.LIVEKIT_URL === 'undefined') {
    throw new Error('LIVEKIT_API_KEY is not defined');
  }

  return process.env.LIVEKIT_URL
}

export function getLiveAPIKEY(region?: string): string {
  if (typeof process.env.LIVEKIT_API_KEY === 'undefined') {
    throw new Error('LIVEKIT_API_KEY is not defined');
  }

  return process.env.LIVEKIT_API_KEY
}

export function getLiveAPISECRET(region?: string): string {
  if (typeof process.env.LIVEKIT_API_SECRET === 'undefined') {
    throw new Error('LIVEKIT_API_SECRET is not defined');
  }

  return process.env.LIVEKIT_API_SECRET
}

