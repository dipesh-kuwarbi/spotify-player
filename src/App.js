import React, { useState, useEffect } from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch songs from API
    axios
      .get("https://cms.samespace.com/items/songs")
      .then((response) => {
        setSongs(response.data.data);
        setCurrentSong(response.data.data[0]); // Set the first song as default
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(songs, currentSong);

  return (
    <Flex direction={{ base: "column", md: "row" }} height="100vh">
      <Sidebar
        songs={songs}
        setCurrentSong={setCurrentSong}
        isLoading={isLoading}
      />
      <Box
        flex="1"
        bgGradient={`linear(to-b, rgba(0,0,0,0.8), rgba(0,0,0,0.9))`}
        transition="background 0.5s ease"
      >
        {currentSong ? (
          <Player song={currentSong} />
        ) : (
          <Skeleton height="100%" />
        )}
      </Box>
    </Flex>
  );
}

export default App;
