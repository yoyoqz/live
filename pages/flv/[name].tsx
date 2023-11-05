import { useToast } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FlvControls from '../../components/FlvControl';
import { SessionProps } from '../../lib/types';

import { IngressClient, IngressInput } from 'livekit-server-sdk';
import { getLiveKitURL } from '../../lib/clients';


export interface FlvProps {
  roomName: string;
  streamKey?: string;
  url?: string;
}

const RoomPage = ({ roomName, url, streamKey}: FlvProps) => {
  const [sessionProps, setSessionProps] = useState<SessionProps>();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!roomName.match(/\w{4}\-\w{4}/)) {
      toast({
        title: 'Invalid room',
        duration: 2000,
        onCloseComplete: () => {
          router.push('/');
        },
      });
    }
  }, [roomName, toast, router]);

    return (
      <FlvControls
        roomName={roomName}
        url={url}
        streamKey={streamKey}
      />
    );
};


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const roomName = context.params?.name;
  const region = context.query?.region;
  const identity = context.query?.identity;
  const turn = context.query?.turn;
  const forceRelay = context.query?.forceRelay;

  if (typeof roomName !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  /*
  const roomClient = getRoomClient();
  const rooms = await roomClient.listRooms([roomName]);
  let numParticipants = 0;
  if (rooms.length > 0) {
    numParticipants = rooms[0].numParticipants;
  }
  */

  //const props: RoomProps = {
    const ingressClient = new IngressClient(
        getLiveKitURL()
    );

    let strIdentity = ''
    if (typeof identity === 'string') {
      strIdentity = identity
    }

    const ingress = {
        name: 'my-ingress',
        roomName: roomName,
        participantIdentity: strIdentity,
        participantName: strIdentity,
        // for WHIP ingress only, disables transcoding and simulcast
        bypassTranscoding: false,
    };

    const info = await ingressClient.createIngress(IngressInput.RTMP_INPUT, ingress)
    const url= info.url
    const streamKey =  info.streamKey
    //ingressId: info.ingressId,

  const props: FlvProps = {
    roomName,
    url,
    streamKey
  };

/*  
  if (typeof region === 'string') {
    props.region = region;
  }
  if (typeof identity === 'string') {
    props.identity = identity;
  }
  if (typeof turn === 'string') {
    const parts = turn.split('@');
    if (parts.length === 2) {
      const cp = parts[0].split(':');
      props.turnServer = {
        urls: [`turn:${parts[1]}?transport=udp`],
        username: cp[0],
        credential: cp[1],
      };
    }
  }
  if (forceRelay === '1' || forceRelay === 'true') {
    props.forceRelay = true;
  }
*/

  return {
    props,
  };
};

export default RoomPage;
