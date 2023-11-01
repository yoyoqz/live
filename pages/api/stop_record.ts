import { EgressClient, EncodedFileType } from 'livekit-server-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getLiveKitURL } from '../../lib/clients';
import { RocordResult } from '../../lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RocordResult>) {
    const egressId = req.query.egressID as string | undefined;

    if (!egressId) {
        res.status(403).end();
        return;
    }

    const egressClient = new EgressClient(
        getLiveKitURL()
    );

    const info = await egressClient.stopEgress(egressId)

    if (info.egressId) {
        res.status(200).json({
            egressId: info.egressId
        });
    } else {
        res.status(200).json({
            egressId: ""
        });
    }
}