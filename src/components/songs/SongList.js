import React, { useState, useEffect, useCallback } from "react";
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
  } = useSongContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [visibleSongs, setVisibleSongs] = useState([]);
  const [ref, inView] = useInView();

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      // Reset filtered songs if search term is empty
      setFilteredSongs(songs);
      setVisibleSongs(songs.slice(0, 10)); // Show the first 10 songs
      return;
    }

    const filtered = songs.filter((song) =>
      song.artist.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredSongs(filtered);
    setVisibleSongs(filtered.slice(0, 10)); // Reset visible songs on search
  };

  const handleTabChange = useCallback(
    (index) => {
      const filtered =
        index === 1 ? songs.filter((song) => song.top_track) : songs;
      setSearchTerm("");
      setFilteredSongs(filtered);
      setVisibleSongs(filtered.slice(0, 10)); // reset visible songs on tab change
    },
    [songs]
  );

  useEffect(() => {
    if (inView && visibleSongs.length < filteredSongs.length) {
      const nextBatch = filteredSongs.slice(
        visibleSongs.length,
        visibleSongs.length + 10
      );
      setVisibleSongs((prev) => [...prev, ...nextBatch]);
    }
  }, [inView, filteredSongs, visibleSongs]);

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
