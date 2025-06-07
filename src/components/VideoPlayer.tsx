import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

interface VideoPlayerProps {
    src: string;
    className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className={`relative ${className ?? ""}`}>
            <video
                ref={videoRef}
                src={src}
                autoPlay
                loop
                playsInline
                className="w-full h-60 sm:h-80 md:h-96 object-cover rounded-lg"
            />

            <button
                onClick={togglePlay}
                className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded"
            >
                {isPlaying ? <Pause /> : <Play />}
            </button>
        </div>
    );
};

export default VideoPlayer;
