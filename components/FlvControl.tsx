import { Text, VStack } from '@chakra-ui/react';

/*
      <HStack spacing="0">
        <Text>
        {url}
        </Text>
        <Text>
        {roomName}
        </Text>
        <Text>
        {streamKey}
        </Text>
      </HStack>
*/

//const FlvControls = ({ roomName, url,  onLeave }: ControlsProps) => {
interface FlvControlsProps{
    roomName: string;
    url?: string;
    streamKey?: string
}

const FlvControls = ({ roomName, url,  streamKey }: FlvControlsProps) => {

  return (
    <VStack spacing='24px'>
      <Text>
        {url}
      </Text>
      <Text w='200px' h='40px' bg='tomato'>
        {roomName}
      </Text>
      <Text w='200px' h='40px' bg='pink.100'>
        {streamKey}
      </Text>
    </VStack>
  )
};

export default FlvControls;


/*
import { Text } from '@chakra-ui/react';
import { Participant } from 'livekit-client';

export interface ChatData {
  sentAt: Date;
  message: string;
  from?: Participant;
}

const FlvControl = ({ message }: ChatData) => {
  return (
    <HStack>
      <Text>{message}</Text>
    </HStack>
  );
};

export default FlvControl;
*/

/*
import { Text } from '@chakra-ui/react';
import { Participant } from 'livekit-client';

export interface ChatData {
  sentAt: Date;
  message: string;
  from?: Participant;
}

const ChatEntry2 = ({ message, from }: ChatData) => {
  return (
    <HStack>
      {from ? <Text fontWeight={600}>{`${from.name || from.identity}`}:</Text> : null}
      <Text>{message}</Text>
    </HStack>
  );
};

export default ChatEntry2;
*/