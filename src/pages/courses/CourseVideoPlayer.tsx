import { motion } from "framer-motion";
import { X, Play, Maximize, Volume2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState, useRef } from "react";

interface CourseVideoPlayerProps {
  videoUrl: string | null;
  title: string;
  onClose: () => void;
}

export const CourseVideoPlayer = ({
  videoUrl,
  title,
  onClose,
}: CourseVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ default demo video
  const defaultVideo =
    "https://www.youtube.com/watch?v=G0gKX4wmIGs";

  const videoSrc = videoUrl || defaultVideo;

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    /* ✅ MODAL BACKDROP */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      {/* ✅ PLAYER CARD */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel-strong p-4 md:p-6 w-full max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold gradient-text">
            {title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-destructive/20 hover:text-destructive"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Video */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              {isPlaying ? "Pause" : "Play"}
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Volume2 className="w-4 h-4" />
              <span>Audio</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="gap-2"
          >
            <Maximize className="w-4 h-4" />
            Fullscreen
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
