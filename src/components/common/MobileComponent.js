import React from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButtonComponent } from "./IconButtonComponent";
import SongList from "../songs/SongList";
import { Box, Fade } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSongContext } from "../../context/SongContext";

const MotionBox = motion(Box);

export const MobileToggleButton = ({ isOpen, onOpen, onClose }) => (
  <Box position="fixed" top="4" right="1" zIndex="1">
    <IconButtonComponent
      icon={
        isOpen ? <CloseIcon color="white" /> : <HamburgerIcon color="white" />
      }
      ariaLabel="Toggle Song List"
      onClick={isOpen ? onClose : onOpen}
      bgColor="transparent"
      bg="transparent"
      hoverColor="gray.600"
    />
  </Box>
);

export const MobileSongList = () => {
  const { backgroundGradient } = useSongContext();
  return (
    <Fade in>
      <MotionBox
        width="100%"
        maxWidth="380px"
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
        <SongList />
      </MotionBox>
    </Fade>
  );
};
