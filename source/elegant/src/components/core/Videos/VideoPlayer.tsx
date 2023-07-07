import { VideoJsonLd } from 'next-seo';
import React from 'react';

interface Props {
  /**
   * The title of the video.
   */
  title: string;
  /**
   * The url of the video.
   */
  content_url: string;
  /**
   * The embed url of the video.
   */
  embed_url: string;
  /**
   * A description of the video.
   */
  description: string;
  /**
   * The width of the video player.
   */
  width?: number | string;
  /**
   * The height of the video player.
   */
  height?: number;
  /**
   * Can the video player be viewed in fullscreen mode?
   */
  allowFullScreen?: boolean;
}

/**
 * A simple video player component for displaying videos from external websites.
 * @returns An iframe element containing a Youtube video player.
 */
const VideoPlayer = ({
  title,
  content_url,
  embed_url,
  description,
  width = '100%',
  height = 350,
  allowFullScreen = true
}: Props) => {
  return (
    <>
        <iframe
          width={width}
          height={height}
          src={embed_url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={allowFullScreen}
        ></iframe>

        <VideoJsonLd
          name={title}
          description={description}
          contentUrl={content_url}
          embedUrl={embed_url}
        />
    </>
  );
}

export default VideoPlayer;
