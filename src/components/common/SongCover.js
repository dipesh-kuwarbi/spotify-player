import React, { useRef, useEffect, useState } from "react";
import { Image, Flex, Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

const SongCover = ({
  song,
  isLoading = false,
  hoverColor,
  dimensions,
  ...rest
}) => {
  const imageRef = useRef(null);
  const [isImageLoading, setIsImageLoading] = useState();

  useEffect(() => {
    setIsImageLoading(true);
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsImageLoading(false);
      };
    }
  }, [song?.cover, imageRef, imageRef.current]);

  /* Skeleton loader when the image is loading */

  if (isLoading && isImageLoading) {
    return (
      <Skeleton
        width={dimensions}
        height={dimensions}
        borderRadius="md"
        startColor="gray.700"
        endColor={hoverColor}
      />
    );
  }

  return (
    <Flex position="relative" justifyContent="center">
      {/* Animated Image with smooth transitions */}
      <MotionImage
        ref={imageRef}
        boxSize={dimensions}
        borderRadius="md"
        src={`https://cms.samespace.com/assets/${song?.cover}`}
        alt={song?.artist}
        opacity={isLoading ? 0 : 1}
        transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.5 } }}
        initial={{ scale: 0.9 }}
        animate={{ scale: isLoading || isImageLoading ? 0.9 : 1 }}
        {...rest}
      />
    </Flex>
  );
};

export default SongCover;
