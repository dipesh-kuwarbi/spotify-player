import React from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import SongList from "./SongList";

const Sidebar = ({ songs, setCurrentSong, isLoading }) => {
  return (
    <Box
      width={{ base: "100%", md: "25%" }}
      bg="gray.900"
      p="4"
      height="100vh"
      overflowY="auto"
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
      {isLoading ? (
        <VStack spacing="4" align="stretch">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} height="50px" />
          ))}
        </VStack>
      ) : (
        <SongList songs={songs} setCurrentSong={setCurrentSong} />
      )}
    </Box>
  );
};

export default Sidebar;
