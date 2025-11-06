import mitt from 'mitt';

type Events = { 'app:error': string; 'app:offline': void };

export const emitter = mitt<Events>();
