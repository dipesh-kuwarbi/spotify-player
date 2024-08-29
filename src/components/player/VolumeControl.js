import React, { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { SoundIcon } from "../../icons/index";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { IconButtonComponent } from "../common/IconButtonComponent";

const VolumeControl = ({ audioRef, hoverColor }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 1;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <IconButtonComponent
      icon={
        isMuted ? (
          <IoVolumeMuteSharp color="white" />
        ) : (
          <SoundIcon color="white" />
        )
      }
      aria-label={isMuted ? "Unmute" : "Mute"}
      bgColor="gray.700"
      onClick={toggleMute}
      hoverColor={hoverColor}
    />
  );
};

export default VolumeControl;
