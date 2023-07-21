import { Box, Button, Text } from '@chakra-ui/react';
import { typography } from '@livekit/livekit-chakra-theme';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();
  const startMeeting = () => {
    router.push(`/rooms/${generateRoomId()}`);
  };

  return (
    <Box className={styles.container} bg="cld.bg1" minW="100%" minH="100%">
      <main>
        <Text textStyle={['h3', 'h3', 'h2']} color="marketing.lk-white" mb={['1rem', null]}>
         视频会议 
        </Text>
        <Button
          onClick={startMeeting}
          variant="primary"
          py="0.75rem"
          px="1rem"
          {...typography.textStyles['h5-mono']}
          _hover={{ backgroundColor: '#4963B0' }}
        >
    	开始会议
        </Button>
      </main>
    </Box>
  );
};

export default Home;

function generateRoomId(): string {
  //return `${randomString(16)}`;
  return `${randomString(4)}-${randomString(4)}`;
}

//  return `${randomString(4)}-${randomString(4)}`;
function randomString(length: number): string {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
