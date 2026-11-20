const crypto = require('crypto');

// Increase thread pool size (default is 4, max is 128)
// Try changing this to 1, 2, 4, or 6 to see the effect
process.env.UV_THREADPOOL_SIZE = 4;

const start = Date.now();

function hashPassword(label) {
    crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
        console.log(`${label} done: ${Date.now() - start}ms`);
    });
}

// 6 CPU-intensive tasks submitted at the same time.
// With UV_THREADPOOL_SIZE=4:
//   - Task 1-4 grab one thread each and run in parallel (~600ms)
//   - Task 5 and 6 wait for a free thread (~1200ms)
//
// With UV_THREADPOOL_SIZE=6:
//   - All 6 run in parallel (~600ms)
//
// With UV_THREADPOOL_SIZE=2:
//   - Tasks run in batches of 2: ~600ms, ~1200ms, ~1800ms

hashPassword('password-1');
hashPassword('password-2');
hashPassword('password-3');
hashPassword('password-4');
hashPassword('password-5');
hashPassword('password-6');
