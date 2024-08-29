import React, { useEffect, useRef, useState } from "react";
import { Flex, Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { IconButtonComponent } from "../common/IconButtonComponent";
import { SliderComponent } from "../common/SliderComponent";
import VolumeControl from "./VolumeControl";
import SongCover from "../common/SongCover";
import SongInfo from "./SongInfo";
import { ArrowIcon, PauseIcon, ThreeDotIcon } from "../../icons";
import { FaPlay } from "react-icons/fa";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const Player = ({ song, hoverColor }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song?.url;

      const handleLoadedMetadata = () => setDuration(audioRef.current.duration);
      const handleTimeUpdate = () =>
        setCurrentTime(audioRef.current.currentTime);

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [song?.url]);

  return (
    <Flex
      direction="column"
      p="8"
      h="100%"
      justifyContent="center"
      alignItems="center"
      gap="4"
    >
      <SongInfo song={song} isMobile={isMobile} />

      <SongCover
        song={song}
        hoverColor={hoverColor}
        boxShadow="dark-lg"
        dimensions={{ base: "240px", md: "360px", lg: "480px" }}
      />

      <Box mb="1" w={{ base: "240px", md: "360px", lg: "480px" }}>
        <SliderComponent
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
          hoverColor={hoverColor}
        />
        <Flex justifyContent="space-between" mt="1">
          <Text color="white" fontSize="sm">
            {formatTime(currentTime)}
          </Text>
          <Text color="white" fontSize="sm">
            {formatTime(duration)}
          </Text>
        </Flex>
      </Box>

      <Flex
        direction="row"
        w={{ base: "240px", md: "360px", lg: "480px" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButtonComponent
          icon={<ThreeDotIcon name="more" color="white" />}
          ariaLabel="More Options"
          bgColor="gray.700"
          hoverColor={hoverColor}
        />

        <Flex justifyContent="space-between">
          <IconButtonComponent
            icon={<ArrowIcon name="previous" />}
            ariaLabel="Previous"
            bgColor="transparent"
            hoverColor={hoverColor}
            mr="6px"
          />
          <IconButtonComponent
            icon={
              isPlaying ? (
                <PauseIcon name="pause" color="white" />
              ) : (
                <FaPlay name="play" color="white" />
              )
            }
            ariaLabel="Play/Pause"
            bgColor="gray.700"
            hoverColor={hoverColor}
            onClick={togglePlayPause}
            mr="6px"
          />
          <IconButtonComponent
            icon={
              <ArrowIcon name="next" style={{ transform: "rotate(180deg)" }} />
            }
            ariaLabel="Next"
            bgColor="transparent"
            hoverColor={hoverColor}
          />
        </Flex>

        <VolumeControl audioRef={audioRef} hoverColor={hoverColor} />
      </Flex>

      <audio ref={audioRef} />
    </Flex>
  );
};

export default Player;
