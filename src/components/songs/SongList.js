import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import SongTabs from "./SongTab";
import SearchBar from "./SearchBar";
import { SongListContent } from "./SongListContent";
import { useSongContext } from "../../context/SongContext";

const SongList = ({ onClose }) => {
  const {
    currentSong,
    songs = [],
    isLoading,
    error,
    setCurrentSong,
    hoverColor,
    setIsTakingInput,
  } = useSongContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleSongs, setVisibleSongs] = useState([]);
  const [ref, inView] = useInView();

  // Memoize filteredSongs to avoid recalculations on every render
  const filteredSongs = useMemo(() => {
    if (searchTerm.trim() === "") {
      return songs;
    }
    return songs.filter((song) =>
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, songs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setVisibleSongs(filteredSongs.slice(0, 10));
  }, [filteredSongs]);

  useEffect(() => {
    if (inView && visibleSongs.length < filteredSongs.length) {
      const nextBatch = filteredSongs.slice(
        visibleSongs.length,
        visibleSongs.length + 10
      );
      setVisibleSongs((prev) => [...prev, ...nextBatch]);
    }
  }, [inView, filteredSongs, visibleSongs]);

  const handleTabChange = useCallback(
    (index) => {
      const newFilteredSongs =
        index === 1 ? songs.filter((song) => song.top_track) : songs;
      setSearchTerm("");
      setVisibleSongs(newFilteredSongs.slice(0, 10)); // reset visible songs on tab change
    },
    [songs]
  );

  const handleInputFocus = () => {
    setIsTakingInput(true);
  };

  const handleBlur = () => {
    setIsTakingInput(false);
  };

  return (
    <Box
      width={{ base: "100%", md: "25%" }}
      bg="transparent"
      p="4"
      mt="10"
      height="100vh"
      overflow="hidden"
    >
      <SongTabs onTabChange={handleTabChange} />
      <SearchBar
        key="searchBar"
        searchTerm={searchTerm}
        onSearch={handleSearch}
        hoverColor={hoverColor}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
      />
      <SongListContent
        visibleSongs={visibleSongs}
        filteredSongs={filteredSongs}
        currentSong={currentSong}
        error={error}
        isLoading={isLoading}
        setCurrentSong={setCurrentSong}
        onClose={onClose}
        hoverColor={hoverColor}
        ref={ref}
      />
    </Box>
  );
};

export default SongList;
