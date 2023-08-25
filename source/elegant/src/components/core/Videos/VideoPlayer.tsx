import { VideoJsonLd } from 'next-seo';
import React from 'react';

interface Props {
  /**
   * The title of the video.
   */
  title: string;
  /**
   * The id of the video provided by YouTube. Ex. bS66QUBKljM
   */
  videoId: string;
  /**
   * A description of the video.
   */
  description: string;
  /**
   * The date time string that this video was uploaded.
   */
  uploadDate: string;
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
  videoId,
  description,
  uploadDate,
  width = '100%',
  height = 350,
  allowFullScreen = true
}: Props) => {
  return (
    <>
        <iframe
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={allowFullScreen}
        ></iframe>

        <VideoJsonLd
          name={title}
          description={description}
          contentUrl={`https://youtu.be/${videoId}`}
          embedUrl={`https://www.youtube.com/embed/${videoId}`}
          thumbnailUrls={[
            `https://img.youtube.com/vi/${videoId}/0.jpg`,
          ]}
          uploadDate={uploadDate}
        />
    </>
  );
}

export default VideoPlayer;
