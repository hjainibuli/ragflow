import './index.less';

const UDIFY_IFRAME_SRC = 'https://udify.app/chatbot/F59FLOEeCwa8Zvgw';

/** iframe 外层样式（Dify 文档「自定义选项」仅支持 iframe 的 style：border、border-radius） */
const iframeStyle = {
  width: '100%',
  height: '100%',
  minHeight: '700px',
  border: '1px solid #6e1818',
  borderRadius: '8px',
};

export default function TextToImagePage() {
  return (
    <section className="patriotic-t2i flex-1 flex flex-col min-h-0 w-full overflow-hidden">
      <div className="patriotic-t2i-card">
        <iframe
          src={UDIFY_IFRAME_SRC}
          title="文生图"
          className="patriotic-t2i-iframe"
          style={iframeStyle}
          allow="microphone"
        />
      </div>
    </section>
  );
}
