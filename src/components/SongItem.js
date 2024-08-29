import React, { useState, useEffect } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SongCover from "./common/SongCover";
import SongItemSkeleton from "./skeletons/SongItemSkeleton";

const MotionHStack = motion(HStack);

const SongItem = ({
  id,
  song,
  error,
  setCurrentSong,
  hoverColor,
  isLoading,
}) => {
  const [songDuration, setSongDuration] = useState("");

  useEffect(() => {
    const fetchSongDuration = async () => {
      try {
        const audio = new Audio(song.url);
        audio.addEventListener("loadedmetadata", () => {
          const minutes = Math.floor(audio.duration / 60);
          const seconds = Math.floor(audio.duration % 60)
            .toString()
            .padStart(2, "0");
          setSongDuration(`${minutes}:${seconds}`);
        });
      } catch (error) {
        console.error("Error loading audio file:", error);
        setSongDuration("N/A");
      }
    };

    fetchSongDuration();
  }, [song.url]);

  if (isLoading || error) {
    return <SongItemSkeleton />;
  }
  console.log(id);

  return (
    <MotionHStack
      onClick={() => setCurrentSong(song)}
      padding="12px"
      cursor="pointer"
      initial={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      alignItems="center"
      _hover={{ bgColor: hoverColor, borderRadius: "8px" }}
      whileHover={{ scale: 1.03, bg: hoverColor }}
    >
      <SongCover
        song={song}
        isLoading={isLoading}
        hoverColor="gray.700"
        dimensions="50px"
      />
      <Box ml="3">
        <Text color="white" fontWeight={400}>
          {song.artist}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {song.title}
        </Text>
      </Box>
      <Text ml="auto" color="gray.300">
        {songDuration}
      </Text>
    </MotionHStack>
  );
};

export default SongItem;
