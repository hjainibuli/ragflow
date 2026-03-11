import React from 'react';
import { gotoVSCode, Inspector } from 'react-dev-inspector';
import ReactDOM from 'react-dom/client';
import '../tailwind.css';
import App from './app';
import './global.less';
import { initLanguage } from './locales/config';

async function initAppTitle() {
  try {
    const res = await fetch('/conf.json');
    const conf = await res.json();
    if (conf.systemTitle) {
      document.title = conf.systemTitle;
    }
  } catch {
    // 读取失败时保留 index.html 中的默认标题
  }
}

Promise.all([initLanguage(), initAppTitle()]).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Inspector keys={['alt', 'c']} onInspectElement={gotoVSCode} />
      <App />
    </React.StrictMode>,
  );
});
