const api = require('./api')

const myStorage = []
const apiConfig = {
    storage: myStorage,
}
const charAPI = api(apiConfig)

const userInput = `Ааа! Буква 'а' дублируется в БД!`

async function run(text) {
    for (const char of text) {
        const charIdx = await charAPI.add(char)
        console.log(JSON.stringify({ char: charIdx }))
    }
}

// Задача
// Расскомментировать версию функции run без for и добиться такой же записи букв в "БД"
// как для кода с FOR

/* async function run(text) {
    const charTasks = text.split('').map(char => charAPI.add(char))
    const charResults = await Promise.all(charTasks)
    return charResults.map((result, idx) => ({ [text[idx]]: result }))
} */

run(userInput)
    .then(results => {
        console.log(JSON.stringify(results))
    })
    .catch(e => console.log(e))
