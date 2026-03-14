const UDIFY_IFRAME_SRC = 'http://127.0.0.1:3000';

export default function TextToImagePage() {
  return (
    <section className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
      <div className="relative w-full h-full flex-1 min-h-0">
        <iframe
          src={UDIFY_IFRAME_SRC}
          title="文生图"
          className="w-full h-full border-0"
          allow="microphone"
        />
        {/* <div className="absolute top-0 left-0 w-full h-14 bg-[#1a1a2e] z-10" /> */}
      </div>
    </section>
  );
}
