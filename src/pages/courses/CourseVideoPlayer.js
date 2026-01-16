import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { X, Play, Maximize, Volume2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState, useRef } from "react";
export const CourseVideoPlayer = ({ videoUrl, title, onClose, }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // ✅ default demo video
    const defaultVideo = "https://www.youtube.com/watch?v=G0gKX4wmIGs";
    const videoSrc = videoUrl || defaultVideo;
    const togglePlay = () => {
        if (!videoRef.current)
            return;
        if (isPlaying) {
            videoRef.current.pause();
        }
        else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const toggleFullscreen = () => {
        if (!videoRef.current)
            return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        else {
            videoRef.current.requestFullscreen();
        }
    };
    return (
    /* ✅ MODAL BACKDROP */
    _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm", children: _jsxs(motion.div, { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 }, className: "glass-panel-strong p-4 md:p-6 w-full max-w-3xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold gradient-text", children: title }), _jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, className: "hover:bg-destructive/20 hover:text-destructive", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "relative aspect-video rounded-xl overflow-hidden bg-black", children: _jsx("video", { ref: videoRef, src: videoSrc, className: "w-full h-full object-cover", controls: true, onPlay: () => setIsPlaying(true), onPause: () => setIsPlaying(false), children: "Your browser does not support the video tag." }) }), _jsxs("div", { className: "flex items-center justify-between mt-4 px-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: togglePlay, className: "gap-2", children: [_jsx(Play, { className: "w-4 h-4" }), isPlaying ? "Pause" : "Play"] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Volume2, { className: "w-4 h-4" }), _jsx("span", { children: "Audio" })] })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: toggleFullscreen, className: "gap-2", children: [_jsx(Maximize, { className: "w-4 h-4" }), "Fullscreen"] })] })] }) }));
};
