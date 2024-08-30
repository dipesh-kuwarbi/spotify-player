import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SongItem from "./SongItem";
import { AnimatePresence, motion } from "framer-motion";

export const SongListContent = React.forwardRef(
  (
    {
      visibleSongs = [],
      filteredSongs = [],
      currentSong,
      error,
      isLoading,
      setCurrentSong,
      hoverColor,
      onClose,
    },
    ref
  ) => (
    <>
      {filteredSongs?.length === 0 ? (
        <Text color="red.500">No songs found</Text>
      ) : (
        <VStack spacing="4" align="stretch" maxH="640px" overflowY="scroll">
          <AnimatePresence>
            {visibleSongs?.map((song) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <SongItem
                  id={song.id}
                  song={song}
                  currentSong={currentSong}
                  error={error}
                  isLoading={isLoading}
                  setCurrentSong={setCurrentSong}
                  onClose={onClose}
                  hoverColor={hoverColor}
                />
              </motion.div>
            ))}
            <Box ref={ref} />
          </AnimatePresence>
          <Box ref={ref} />
        </VStack>
      )}
    </>
  )
);
