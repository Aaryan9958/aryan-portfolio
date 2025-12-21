export default function BackgroundVideo({ videoUrl, overlay = true, blur = false }) {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${blur ? 'blur-sm' : ''}`}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      {overlay && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      )}
    </div>
  );
}