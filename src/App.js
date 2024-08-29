import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Skeleton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { useBackgroundGradient, useFetch, useToastNotification } from "./hooks";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import Player from "./components/player/index";
import {
  MobileSongList,
  MobileToggleButton,
} from "./components/MobileComponent";

const App = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const { showToast } = useToastNotification();
  const { data: songs, isLoading, error } = useFetch("items/songs");
  const { backgroundGradient, hoverColor } = useBackgroundGradient(
    currentSong ? currentSong.cover : null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (songs?.length) {
      setCurrentSong(songs[0]); // Set the first song as the default
    }
  }, [songs]);

  useEffect(() => {
    if (error) {
      showToast("Error fetching songs", error, "error");
    }
  }, [error, showToast]);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      height="100vh"
      bgGradient={backgroundGradient}
      transition="background 1s ease"
      gap={{ md: "10px", lg: "3rem", xl: "6rem" }}
      overflow="hidden"
    >
      <Sidebar />
      {isMobile && (
        <MobileToggleButton isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      )}
      {isOpen && isMobile && (
        <MobileSongList
          songs={songs}
          setCurrentSong={setCurrentSong}
          isLoading={isLoading}
          currentSong={currentSong}
          hoverColor={hoverColor}
          error={error}
          backgroundGradient={backgroundGradient}
        />
      )}
      {!isMobile && (
        <SongList
          songs={songs}
          setCurrentSong={setCurrentSong}
          isLoading={isLoading}
          currentSong={currentSong}
          backgroundGradient={backgroundGradient}
          hoverColor={hoverColor}
          error={error}
        />
      )}
      <Box flex="1">
        <Player song={currentSong} hoverColor={hoverColor} />
      </Box>
    </Flex>
  );
};

export default App;
