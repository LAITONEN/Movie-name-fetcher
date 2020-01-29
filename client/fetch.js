const client = require('./client')
const async = require('async')
const readline = require('readline');
const { URLSearchParams } = require('url')

const url = 'http://www.omdbapi.com/'
const API_KEY = new URLSearchParams({ apikey: 63207890 }).toString()

readline.emitKeypressEvents(process.stdin);

let input = ''

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const promptInput = (callback) => rl.question('Type the movie names (separated by commas), empty space - closes the connection:\n', (answer) => {
  input = answer
  rl.close()
  callback()
})

function runFetch(callback) {
  const call = client.fetch()

  if (input.length === 0) {
    call.end()
  }

  const urls = input.replace(', ', ',').split(',').map((searchString) => {
    return `${url}?${API_KEY}&${new URLSearchParams({ t: searchString }).toString()}`
  })

  call.write({ urls })

  call.on('data', (data) => {
    if (data.result.Title.length === 0) console.log('Movie not found')
    else console.log('Data Received:', data.result.Title);
  })

  call.on('end', function () {
    console.log('Connection ended')
    callback()
  });
}

function main() {
  async.series([
    promptInput,
    runFetch
  ]);
}

main()
