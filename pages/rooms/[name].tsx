import { useToast } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ActiveRoom from '../../components/ActiveRoom';
import PreJoin from '../../components/PreJoin';
import { getRoomClient } from '../../lib/clients';
import { SessionProps } from '../../lib/types';
import { EncodedFileType, EgressClient } from 'livekit-server-sdk';
import { getLiveKitURL } from '../../lib/clients';


interface RoomProps {
  roomName: string;
  numParticipants: number;
  region?: string;
  identity?: string;
  turnServer?: RTCIceServer;
  forceRelay?: boolean;
}

const RoomPage = ({ roomName, region, numParticipants, turnServer, forceRelay }: RoomProps) => {
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


  if (sessionProps) {
    return (
      <ActiveRoom
        {...sessionProps}
        region={region}
        turnServer={turnServer}
        forceRelay={forceRelay}
      />
    );
  } else {
    return (
      <PreJoin
        startSession={setSessionProps}
        roomName={roomName}
        numParticipants={numParticipants}
      />
    );
  }
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
  const egressClient = new EgressClient(
    getLiveKitURL(),
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET
  );
*/

/*
    const output = {
        fileType:  EncodedFileType.MP4,
        //filepath: 'livekit-demo/room-composite-test.mp4',
        s3: {
            accessKey: '52K2CS7BHyB1GxPpNcSB',
            secret:    'J4wtHbqmt6WAz5ulmmtNqMKaCmkRN9Mi3TfGFNlF',
            region:    'us-east-1',
            bucket:    'start',
            endpoint:  '127.0.0.1:9090'
        }
    };

    const info = egressClient.startRoomCompositeEgress(roomName, output);
*/

  const roomClient = getRoomClient();
  const rooms = await roomClient.listRooms([roomName]);
  let numParticipants = 0;
  if (rooms.length > 0) {
    numParticipants = rooms[0].numParticipants;
  }

  const props: RoomProps = {
    roomName,
    numParticipants,
  };

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

  return {
    props,
  };
};

export default RoomPage;
