import React from "react";
import { Box, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

import Sidebar from "./components/Sidebar";
import Player from "./components/player/index";
import {
  MobileSongList,
  MobileToggleButton,
} from "./components/common/MobileComponent";
import SongList from "./components/songs/SongList";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Sidebar />
      {isMobile && (
        <MobileToggleButton isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      )}
      {isOpen && isMobile && <MobileSongList onClose={onClose} />}
      {!isMobile && <SongList onClose={onClose} />}
      <Box flex="1">
        <Player key="player" />
      </Box>
    </>
  );
};

export default App;
