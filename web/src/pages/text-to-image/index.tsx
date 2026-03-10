const UDIFY_IFRAME_SRC = 'http://192.168.1.200:8040/chatbot/2bKV8KgM7sJqukmG';

export default function TextToImagePage() {
  return (
    <section className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
      <iframe
        src={UDIFY_IFRAME_SRC}
        title="文生图"
        className="w-full h-full min-h-[700px] border-0 flex-1"
        allow="microphone"
      />
    </section>
  );
}
