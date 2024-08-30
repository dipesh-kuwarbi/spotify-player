import React from "react";
import { Text } from "@chakra-ui/react";

const SongInfo = ({ song, isMobile }) => (
  <Text
    fontSize={isMobile ? "xl" : "3xl"}
    color="white"
    fontWeight="bold"
    textAlign="start"
    mb="5"
  >
    {song?.artist}
  </Text>
);

export default SongInfo;
