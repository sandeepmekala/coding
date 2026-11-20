const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'example.txt');

// Write a file
fs.writeFileSync(filePath, 'Hello, File System!\nThis is line 2.\n');
console.log('File written.');

// Read a file
const content = fs.readFileSync(filePath, 'utf8');
console.log('File content:\n', content);

// Append to a file
fs.appendFileSync(filePath, 'Appended line.\n');
console.log('Content appended.');

// Read again to confirm append
const updated = fs.readFileSync(filePath, 'utf8');
console.log('Updated content:\n', updated);

// Check if file exists
console.log('File exists:', fs.existsSync(filePath));

// Get file stats
const stats = fs.statSync(filePath);
console.log('File size:  ', stats.size, 'bytes');
console.log('Is file:    ', stats.isFile());
console.log('Is dir:     ', stats.isDirectory());

// Async read with callback
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Async (callback) read:\n', data);
});

// Async read with async/await
async function readAsync() {
  const data = await fs.promises.readFile(filePath, 'utf8');
  console.log('Async (await) read:\n', data);

  // Rename the file
  const newPath = path.join(__dirname, 'renamed.txt');
  fs.renameSync(filePath, newPath);
  console.log('File renamed to renamed.txt');

  // Delete the file
  fs.unlinkSync(newPath);
  console.log('File deleted.');
}

readAsync();
