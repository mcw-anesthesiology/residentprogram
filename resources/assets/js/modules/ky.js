import ky from 'ky';

import { fetchConfig } from './utils.js';

export default ky.extend(fetchConfig({ contentType: null }));
