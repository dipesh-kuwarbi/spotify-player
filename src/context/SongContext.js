import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  useBackgroundGradient,
  useFetch,
  useToastNotification,
} from "../hooks";
import { Flex, Spinner } from "@chakra-ui/react";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isTakingInput, setIsTakingInput] = useState(false);
  const [isDebounced, setIsDebounced] = useState(false);
  const { data: songs = [], isLoading, error } = useFetch("items/songs");
  const { backgroundGradient, hoverColor } = useBackgroundGradient(
    currentSong ? currentSong.cover : null
  );
  const { showToast } = useToastNotification();

  useEffect(() => {
    if (songs && songs.length > 0) {
      setCurrentSong(songs[0]); // Set the first song as the default
    }
  }, [songs]);

  useEffect(() => {
    if (error) {
      showToast("Error fetching songs", error, "error");
    }
  }, [error, showToast]);

  const handleSongChange = useCallback(
    (direction, songId) => {
      if (isDebounced || !Array.isArray(songs) || songs.length === 0) return;

      const currentIndex = songs.findIndex((song) => song.id === songId);

      let newIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % songs.length;
      } else if (direction === "previous") {
        newIndex = (currentIndex - 1 + songs.length) % songs.length;
      }

      setCurrentSong(songs[newIndex]);
      setIsDebounced(true);
      setIsTakingInput(false);
      sessionStorage.removeItem(`song-${songId}-currentTime`);

      setTimeout(() => {
        setIsDebounced(false);
      }, 300); // Adjust debounce duration as needed
    },
    [isDebounced, songs]
  );

  if (!currentSong) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        bgGradient="linear(to-br, black, gray.600)"
      >
        <Spinner size="xl" color="white" />
      </Flex>
    );
  }

  return (
    <SongContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        setIsTakingInput,
        handleSongChange,
        isDebounced,
        isTakingInput,
        songs,
        backgroundGradient,
        hoverColor,
        isLoading,
        error,
      }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        height="100vh"
        bgGradient={
          backgroundGradient
            ? backgroundGradient
            : `linear(to-l, ${currentSong.accent}, ${"rgba(0, 0, 0, 0.60)"})`
        }
        gap={{ md: "10px", lg: "3rem", xl: "6rem" }}
        overflow="hidden"
      >
        {children}
      </Flex>
    </SongContext.Provider>
  );
};

export const useSongContext = () => useContext(SongContext);
