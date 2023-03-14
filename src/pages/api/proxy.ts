import { NextApiRequest, NextApiResponse } from 'next';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

const proxy: any = createProxyMiddleware({
    target: 'https://gateway.pinata.cloud',
    changeOrigin: true,
    onProxyRes: (proxyRes, req, res) => {
    let body = '';
    proxyRes.on('data', (chunk) => {
        body += chunk;
    });
    proxyRes.on('end', () => {
        try {
            const json = JSON.parse(body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json));
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Error parsing JSON response');
        }
    });
    },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return proxy(req, res);
}


