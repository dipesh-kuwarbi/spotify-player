import React from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButtonComponent } from "./common/IconButtonComponent";
import SongList from "./SongList";
import { Box, Fade } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const MobileToggleButton = ({ isOpen, onOpen, onClose }) => (
  <Box position="fixed" top="4" right="4" zIndex="1">
    <IconButtonComponent
      icon={
        isOpen ? (
          <CloseIcon color="gray.900" />
        ) : (
          <HamburgerIcon color="white" />
        )
      }
      ariaLabel="Toggle Song List"
      onClick={isOpen ? onClose : onOpen}
      bgColor="transparent"
      hoverColor="gray.600"
    />
  </Box>
);

export const MobileSongList = ({
  songs,
  setCurrentSong,
  isLoading,
  hoverColor,
  error,
  backgroundGradient,
  currentSong,
}) => (
  <Fade in>
    <MotionBox
      width="100%"
      maxWidth="400px"
      bgGradient={backgroundGradient}
      p="4"
      position="fixed"
      top="0"
      left="0"
      height="100%"
      zIndex="1"
      initial={{ x: "-100%" }}
      animate={{ x: "0" }} // End position: slide in from the left
      exit={{ x: "-100%" }} // Exit position: slide out to the left
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <SongList
        songs={songs}
        setCurrentSong={setCurrentSong}
        isLoading={isLoading}
        currentSong={currentSong}
        hoverColor={hoverColor}
        error={error}
      />
    </MotionBox>
  </Fade>
);
