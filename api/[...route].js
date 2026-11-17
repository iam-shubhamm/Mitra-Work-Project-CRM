import handler from '../server.js';

export const config = { api: { bodyParser: { sizeLimit: '4mb' } } };

export default handler;
