import React from "react";
import {
  Box,
  IconButton,
  Input,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import SongItem from "./SongItem";
import { SearchIcon } from "@chakra-ui/icons";

const SongList = ({
  isLoading,
  songs,
  setCurrentSong,
  error,
  hoverColor,
  currentSong,
}) => {
  return (
    <Box
      width={{ base: "100%", md: "25%" }}
      bg="transparent"
      p="4"
      mt="10"
      height="100vh"
      overflow="hidden"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="4"
      >
        <Text fontSize="2xl" color="white">
          For You
        </Text>
        <Text fontSize="2xl" color="gray.500">
          Top Tracks
        </Text>
      </Box>
      <Input placeholder="Search Song, Artist" mb="4" />
      <IconButton icon={<SearchIcon />} aria-label="Search" />
      <VStack spacing="4" align="stretch" maxH="640px" overflowY="scroll">
        {songs?.map((song) => (
          <SongItem
            key={song.id}
            id={song.id}
            song={song}
            currentSong={currentSong}
            error={error}
            isLoading={isLoading}
            setCurrentSong={setCurrentSong}
            hoverColor={hoverColor}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default SongList;
