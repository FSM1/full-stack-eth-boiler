// import { blockchainResources } from "blockchainResources";

const apiHost = process.env.API_HOST || 'localhost:3001';
const apiSchema = process.env.API_SCHEMA || 'http';

const generateUri = (path: string) => `${apiSchema}://${apiHost}/${path}`;

const apiUrlBuilder = {
  getPermit: generateUri('api/auth/permit'),
  login: generateUri('api/auth/login'),
};

export default apiUrlBuilder;
