// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { getEnvironments } from './src/helpers';
//import 'setinmediate';

require('dotenv').config({
    path: '.env'
})

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}))
