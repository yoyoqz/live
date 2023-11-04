import { Box, HStack } from '@chakra-ui/react';

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
    <HStack spacing='24px'>
      <Box w='40px' h='40px' bg='yellow.200'>
        {url}
      </Box>
      <Box w='40px' h='40px' bg='tomato'>
        {roomName}
      </Box>
      <Box w='40px' h='40px' bg='pink.100'>
        {streamKey}
      </Box>
    </HStack>
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