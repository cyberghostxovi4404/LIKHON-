/* ================================
   LIKHON - Console Tool
   ================================ */

(function () {
  'use strict';

  // পুরোনো লোড থাকলে সরিয়ে ফেলি
  if (window.__LIKHON__) {
    console.log('[LIKHON] আগেই লোড করা আছে।');
    return;
  }
  window.__LIKHON__ = true;

  const LIKHON = {
    version: '1.0.0',
    name: 'LIKHON',
    start() {
      console.log('%c[LIKHON] চালু হয়েছে ✅', 'color:#0a0;font-weight:bold');
      this.showPanel();
    },
    showPanel() {
      // পুরোনো প্যানেল সরান
      const old = document.getElementById('likhon-panel');
      if (old) old.remove();

      const panel = document.createElement('div');
      panel.id = 'likhon-panel';
      panel.innerHTML = `
        <div style="
          position:fixed;top:15px;right:15px;z-index:999999;
          background:#111;color:#0f0;
          font-family:monospace;font-size:13px;
          border:2px solid #0f0;border-radius:10px;
          padding:12px 14px;min-width:200px;
          box-shadow:0 0 20px rgba(0,255,0,.4);
        ">
          <div style="font-weight:bold;font-size:15px;margin-bottom:8px;">
            ⚡ LIKHON v${this.version}
          </div>
          <div style="margin-bottom:8px;">টুল চালু আছে</div>
          <button id="likhon-close" style="
            background:#0f0;color:#000;border:none;
            padding:5px 12px;border-radius:6px;
            font-weight:bold;cursor:pointer;
          ">বন্ধ করুন</button>
        </div>
      `;
      document.body.appendChild(panel);

      document.getElementById('likhon-close').onclick = () => {
        panel.remove();
        window.__LIKHON__ = false;
        console.log('[LIKHON] বন্ধ করা হয়েছে।');
      };
    }
  };

  LIKHON.start();

  // চাইলে কনসোল থেকে ব্যবহার করা যাবে
  window.LIKHON = LIKHON;
})();
