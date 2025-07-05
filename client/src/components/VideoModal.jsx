import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
function VideoModal({ vid, setOpen ,open }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup in case component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="absolute  left-1/2 -translate-x-1/2 z-100 p-4 h-screen w-screen bg-[#101010] rounded grid place-items-center" id="ytmodel">
      <MdOutlineClose
        className="text-white absolute top-4 right-4 text-3xl"
        onClick={() => setOpen(false)}
      />
      <iframe
        className="h-8/10 w-8/10 rounded"
        src={`https://www.youtube.com/embed/${vid}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}

export default VideoModal;
