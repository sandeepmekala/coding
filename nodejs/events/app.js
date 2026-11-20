const EventEmitter = require('events');

const emitter = new EventEmitter();

// --- 1. Basic listener ---
emitter.on('messageLogged', function () {
    console.log('Listener called');
});

emitter.emit('messageLogged');

// --- 2. Passing data with an event ---
emitter.on('userLoggedIn', (user) => {
    console.log('User logged in:', user);
});

emitter.emit('userLoggedIn', { id: 1, name: 'Sandeep' });

// --- 3. One-time listener ---
emitter.once('appStarted', () => {
    console.log('App started (fires only once)');
});

emitter.emit('appStarted');
emitter.emit('appStarted');  // this will NOT trigger the listener again

// --- 4. Removing a listener ---
function onOrder(item) {
    console.log('Order placed:', item);
}

emitter.on('orderPlaced', onOrder);
emitter.emit('orderPlaced', 'Laptop');   // fires

emitter.off('orderPlaced', onOrder);
emitter.emit('orderPlaced', 'Phone');    // no output — listener removed

// --- 5. Extending EventEmitter (real-world pattern) ---
class Logger extends EventEmitter {
    log(message) {
        console.log('Log:', message);
        this.emit('logged', { message, time: new Date().toISOString() });
    }
}

const logger = new Logger();

logger.on('logged', (entry) => {
    console.log('Event received:', entry);
});

logger.log('Server started');
logger.log('User connected');
