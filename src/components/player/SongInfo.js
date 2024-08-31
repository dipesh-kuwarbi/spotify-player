import React from "react";
import { Box, Text } from "@chakra-ui/react";

const SongInfo = ({ song, isMobile }) => (
  <Box>
    <Text
      color="white"
      fontWeight={800}
      fontSize={isMobile ? "xl" : "3xl"}
      textAlign="start"
    >
      {song?.name}
    </Text>
    <Text fontSize="md" color="gray.400" mb="2">
      {song?.artist}
    </Text>
  </Box>
);

export default SongInfo;
