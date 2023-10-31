import { EgressClient, EncodedFileType } from 'livekit-server-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getLiveKitURL } from '../../lib/clients';
import { RocordResult } from '../../lib/types';

const roomPattern = /\w{4}\-\w{4}/;

export default function handler(req: NextApiRequest, res: NextApiResponse<RocordResult>) {

    const roomName = req.query.roomName as string | undefined;

    if (!roomName) {
        res.status(403).end();
        return;
    }
    
    // enforce room name to be xxxx-xxxx
    // this is simple & naive way to prevent user from guessing room names
    // please use your own authentication mechanisms in your own app
    if (!roomName.match(roomPattern)) {
    res.status(400).end();
    return;
    }

    const egressClient = new EgressClient(
        getLiveKitURL()
    );

    const output = {
        fileType:  EncodedFileType.MP4,
        //filepath: 'livekit-demo/room-composite-test.mp4',
        s3: {
            accessKey: '52K2CS7BHyB1GxPpNcSB',
            secret:    'J4wtHbqmt6WAz5ulmmtNqMKaCmkRN9Mi3TfGFNlF',
            region:    'us-east-1',
            bucket:    'start',
            endpoint:  '43.155.87.113:9090',
	    force_path_style: true
        }
    };
    
    console.log("start egress")
    const info = egressClient.startRoomCompositeEgress(roomName, output);

    res.status(200).json({
        url: "",
    });
}

