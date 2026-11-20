// Create a simple Promise
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        console.log('Fetching user...');

        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: 'Sandeep', role: 'Developer' });  // success
            } else {
                reject(new Error('Invalid user ID'));                   // failure
            }
        }, 1000);
    });
}

// --- 1. Using .then() / .catch() ---
fetchUser(1)
    .then(user => console.log('Got user (.then):', user))
    .catch(err => console.error('Error (.catch):', err.message));

// --- 2. Using async/await ---
async function main() {
    try {
        const user = await fetchUser(2);
        console.log('Got user (await):', user);
    } catch (err) {
        console.error('Error (await):', err.message);
    }

    // Trigger the reject case
    try {
        const user = await fetchUser(-1);
        console.log(user);
    } catch (err) {
        console.error('Error (await) invalid id:', err.message);
    }
}

main();
