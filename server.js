// server.js
const WebSocket = require('ws');
const http = require('http');
const { RSI, MACD } = require('technicalindicators');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

console.log('LIKHON Quotex Server চালু হয়েছে...');

wss.on('connection', (ws) => {
    console.log('LIKHON প্যানেল কানেক্ট হয়েছে।');

    // এখানে Quotex WebSocket-এর সাথে কানেক্ট করার লজিক বসবে
    // উদাহরণস্বরূপ, ডেটা সিমুলেশন করা হচ্ছে
    const interval = setInterval(() => {
        // ডেমো ডেটা (আসল ডেটার জন্য Quotex WS থেকে ডেটা আনতে হবে)
        const candles = Array.from({ length: 50 }, () => ({
            open: Math.random() * 100,
            close: Math.random() * 100,
            high: Math.random() * 100,
            low: Math.random() * 100,
            volume: Math.random() * 1000
        }));

        const closePrices = candles.map(c => c.close);
        const rsi = RSI.calculate({ values: closePrices, period: 14 });
        const macd = MACD.calculate({ values: closePrices, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 });

        // সিম্পল সিগন্যাল লজিক
        let signal = 'NEUTRAL';
        if (rsi.length > 0 && macd.length > 0) {
            const lastRsi = rsi[rsi.length - 1];
            const lastMacd = macd[macd.length - 1];
            if (lastRsi < 30 && lastMacd.MACD > lastMacd.signal) signal = 'BUY';
            else if (lastRsi > 70 && lastMacd.MACD < lastMacd.signal) signal = 'SELL';
        }

        ws.send(JSON.stringify({
            type: 'signal',
            data: {
                signal: signal,
                rsi: rsi[rsi.length - 1] || null,
                macd: macd[macd.length - 1] || null,
                price: closePrices[closePrices.length - 1],
                time: new Date().toISOString()
            }
        }));
    }, 5000); // প্রতি ৫ সেকেন্ডে ডেটা পাঠাবে

    ws.on('close', () => {
        clearInterval(interval);
        console.log('LIKHON প্যানেল ডিসকানেক্ট হয়েছে।');
    });
});

server.listen(8080, () => {
    console.log('সার্ভার ৮০৮০ পোর্টে চলছে।');
});
