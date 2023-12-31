import { Participant, Track, VideoTrack } from 'livekit-client';
import { ReactElement, useEffect, useState } from 'react';
import { ControlsView } from '../ControlsView';
import { ParticipantView } from '../ParticipantView';
import { ScreenShareView } from '../ScreenShareView';
import { StageProps } from '../StageProps';
import { defaultSortParticipants } from '../StageUtils';
import styles from './styles.module.css';

export const MobileStage = ({
  roomState,
  participantRenderer,
  controlRenderer,
  onLeave,
  sortParticipants,
}: StageProps) => {
  const { isConnecting, error, participants, room } = roomState;
  const [showOverlay, setShowOverlay] = useState(false);
  const sortFn = sortParticipants ?? defaultSortParticipants;
  const [sortedParticipants, setSortedParticipants] = useState(sortFn(participants));

  useEffect(() => {
    setSortedParticipants(sortFn(participants));
  }, [participants, sortFn]);

  if (error) {
    return <div>error {error.message}</div>;
  }

  if (isConnecting) {
    return <div>connecting</div>;
  }
  if (!room) {
    return <div>room closed</div>;
  }

  if (sortedParticipants.length === 0) {
    return <div>no one is in the room</div>;
  }

  const ParticipantRenderer = participantRenderer ?? ParticipantView;
  const ControlRenderer = controlRenderer ?? ControlsView;

  // find first participant with screen shared
  let screenTrack: VideoTrack | undefined;
  sortedParticipants.forEach((p) => {
    if (screenTrack) {
      return;
    }
    const track = p.getTrack(Track.Source.ScreenShare);
    if (track?.isSubscribed && track.videoTrack) {
      screenTrack = track.videoTrack;
    }
  });

  let otherParticipants = sortedParticipants;
  let participantInFocus: Participant;
  let mainView: ReactElement;
  if (screenTrack) {
    mainView = <ScreenShareView track={screenTrack} height="90%" width="90%" />;
  } else if (otherParticipants.length === 0) {
    mainView = <div>no one is in the room</div>;
  } else {
    mainView = (
      <ParticipantRenderer
        key={room.localParticipant.identity}
        participant={room.localParticipant}
        showOverlay={showOverlay}
        width="90%"
        height="90%"
        orientation="portrait"
        showConnectionQuality
      />
    );
  }

  return (
    // global container
    <div className={styles.container}>
      <div className={styles.stage}>{mainView}</div>
      <div className={styles.controlsArea}>
        <ControlRenderer room={room} enableScreenShare={false} onLeave={onLeave} />
      </div>
    </div>
  );
};
