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
    isTakingInput,
  } = useSongContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const isFirstRender = useRef(true);

  // Handle the end of the song and automatically move to the next one
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && Math.floor(currentTime) === Math.floor(duration)) {
      setCurrentTime(0);
      setIsPlaying(false);
      onClick("next", song?.id);
    }
  }, [currentTime, duration, onClick, song?.id]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play(); // Play the audio
      }
      setIsPlaying(!isPlaying); // Toggle play state
    }
  };

  const handleSliderChange = (value) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value); // Update state to sync with slider
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Check if it's the first render
      if (isFirstRender.current) {
        isFirstRender.current = false; // Set to false after the first render
      } else {
        const savedTime = sessionStorage.getItem(
          `song-${song?.id}-currentTime`
        );
        if (savedTime && !isPlaying && !isTakingInput) {
          audio.currentTime = parseFloat(savedTime);
          setCurrentTime(parseFloat(savedTime));
        }

        const handleLoadedMetadata = () => {
          setDuration(audio.duration);
          if (!isTakingInput && isPlaying) {
            setIsPlaying(true);
            audio
              .play()
              .then()
              .catch(() => setIsPlaying(false));
          }
        };

        const handleTimeUpdate = () => {
          if (!isTakingInput) {
            setCurrentTime(audio.currentTime);
            if (audio.currentTime != audio.duration)
              sessionStorage.setItem(
                `song-${song?.id}-currentTime`,
                audio.currentTime
              );
          }
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
          audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
          audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
      }
    }
  }, [song?.url, isTakingInput]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 1 : 0;
      setIsMuted(!isMuted);
    }
  };

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
        currentTime={currentTime}
        duration={duration}
        song={song}
        hoverColor={hoverColor}
        isPlaying={isPlaying}
        isMuted={isMuted}
        togglePlayPause={togglePlayPause}
        handleSliderChange={handleSliderChange}
        onClick={onClick}
        toggleMute={toggleMute}
      />
      <audio ref={audioRef} src={song?.url} autoPlay={false} muted={false} />
    </Flex>
  );
};

export default Player;
