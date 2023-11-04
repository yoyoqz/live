import { IngressClient, IngressInput } from 'livekit-server-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getLiveKitURL } from '../../lib/clients';
import { FlvResult } from '../../lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<FlvResult>) {
    const roomName = req.query.roomName as string | undefined;
    const name = req.query.Name as string | undefined;
    const id = req.query.ID as string | undefined;

    if (!roomName) {
        res.status(403).end();
        return;
    }

    const ingressClient = new IngressClient(
        getLiveKitURL()
    );

    const ingress = {
        name: 'my-ingress',
        roomName: roomName,
        participantIdentity: name,
        participantName: id,
        // for WHIP ingress only, disables transcoding and simulcast
        bypassTranscoding: false,
    };
    /*
        participantIdentity: 'my-participant',
        participantName: 'My Participant',
    */

    const info = await ingressClient.createIngress(IngressInput.RTMP_INPUT, ingress)

    res.status(200).json({
        url: info.url,
        streamKey: info.streamKey,
        ingressId: info.ingressId,
        name: info.name
    });
}