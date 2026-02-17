import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Polyfill for Jest environment if needed
(global as any).fetch = global.fetch;
(global as any).Request = global.Request;
(global as any).Response = global.Response;
(global as any).Headers = global.Headers;
