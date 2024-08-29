import React from "react";
import { VStack } from "@chakra-ui/react";
import SongItem from "./SongItem";

const SongList = ({ songs, setCurrentSong }) => {
  return (
    <VStack spacing="4" align="stretch">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} setCurrentSong={setCurrentSong} />
      ))}
    </VStack>
  );
};

export default SongList;
