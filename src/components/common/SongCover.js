import React, { useRef, useEffect, useState, memo } from "react";
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
  }, [song?.cover, imageRef]);

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
    <Flex
      position="relative"
      justifyContent="center"
      height={dimensions}
      width={dimensions}
    >
      {/* Animated Image with smooth transitions */}
      <MotionImage
        ref={imageRef}
        width="100%"
        height="100%"
        borderRadius={rest.isList ? "100%" : "md"}
        objectFit="cover"
        src={`https://cms.samespace.com/assets/${song?.cover}`}
        alt={song?.artist}
        opacity={isLoading ? 0 : 1}
        transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.5 } }}
        initial={{ scale: 0.9 }}
        animate={{ scale: isLoading && isImageLoading ? 0.9 : 1 }}
        sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
        loading="lazy"
        {...rest}
      />
    </Flex>
  );
};

export default memo(SongCover);
