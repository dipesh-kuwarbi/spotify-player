import React, { useEffect, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";
import SongCover from "../common/SongCover";
import SongInfo from "./SongInfo";
import { useSongContext } from "../../context/SongContext";
import PlayerControls from "./PlayerControls";

const Player = () => {
  const {
    currentSong: song,
    handleSongChange: onClick,
    hoverColor,
  } = useSongContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Handle the end of the song and automatically move to the next one
  useEffect(() => {
    if (currentTime === Math.floor(duration)) {
      setCurrentTime(0);
      setIsPlaying(false);
      onClick("next", song?.id);
    }
  }, [currentTime, duration, onClick, song?.id]);

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
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle song change and ensure it plays automatically
  useEffect(() => {
    const currentValue = audioRef.current;
    if (currentValue) {
      currentValue.src = song?.url;

      const handleLoadedMetadata = () => {
        setDuration(currentValue.duration);
        setIsPlaying(true);
        currentValue
          .play()
          .then()
          .catch((err) => setIsPlaying(false));
        // Start playing the new song
      };

      const handleTimeUpdate = () =>
        setCurrentTime(Math.floor(currentValue.currentTime));

      currentValue.addEventListener("loadedmetadata", handleLoadedMetadata);
      currentValue.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        currentValue.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        currentValue.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [song?.url]);

  return (
    <Flex
      key={song?.id}
      direction="column"
      p="8"
      h="100%"
      gap="2"
      justifyContent="center"
    >
      <SongInfo song={song} />

      <SongCover
        song={song}
        hoverColor={hoverColor}
        boxShadow="dark-lg"
        dimensions={{ base: "340px", md: "410px", lg: "490px" }}
      />

      <PlayerControls
        audioRef={audioRef}
        currentTime={currentTime}
        duration={duration}
        song={song}
        hoverColor={hoverColor}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        handleSliderChange={handleSliderChange}
        onClick={onClick}
      />

      <audio ref={audioRef} src={song?.url} autoplay="true" muted={false} />
    </Flex>
  );
};

export default Player;
