import React, { useEffect, useState } from "react";
import { Box, Text, Image, IconButton, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

const Player = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    document.body.style.background = `linear-gradient(to bottom, #000, #111)`;
  }, [song]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      p="8"
      alignItems="center"
      transition="all 0.5s ease"
    >
      <Image
        boxSize={{ base: "150px", md: "300px" }}
        src={`https://cms.samespace.com/assets/${song.cover}`}
        alt={song.title}
        boxShadow="2xl"
      />
      <Box ml={{ md: "8" }} mt={{ base: "4", md: "0" }}>
        <Text fontSize={{ base: "xl", md: "3xl" }} color="white">
          {song.title}
        </Text>
        <Text fontSize={{ base: "md", md: "xl" }} color="gray.400">
          {song.artist}
        </Text>
      </Box>
      <Flex mt={{ base: "4", md: "0" }} alignItems="center" ml="auto">
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous"
          bg="transparent"
          color="white"
          _hover={{ bg: "gray.700" }}
          transition="all 0.3s ease"
        />
        <IconButton
          icon={isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
          aria-label="Play"
          bg="gray.800"
          color="white"
          mx="4"
          _hover={{ bg: "gray.600" }}
          onClick={togglePlayPause}
          transition="all 0.3s ease"
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next"
          bg="transparent"
          color="white"
          _hover={{ bg: "gray.700" }}
          transition="all 0.3s ease"
        />
      </Flex>
    </Flex>
  );
};

export default Player;
