import React from "react";
import { Box, Text, Image, HStack } from "@chakra-ui/react";

const SongItem = ({ song, setCurrentSong }) => {
  return (
    <HStack
      p="2"
      cursor="pointer"
      onClick={() => setCurrentSong(song)}
      _hover={{ bg: "gray.700" }}
      transition="background 0.3s ease"
    >
      <Image
        boxSize="50px"
        src={`https://cms.samespace.com/assets/${song.cover}`}
        alt={song.title}
      />
      <Box>
        <Text color="white">{song.title}</Text>
        <Text fontSize="sm" color="gray.400">
          {song.artist}
        </Text>
      </Box>
      <Text ml="auto" color="gray.400">
        {song.duration}
      </Text>
    </HStack>
  );
};

export default SongItem;
