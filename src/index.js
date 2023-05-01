const assert = require('assert')
const api = require('./char-store-api')

const myStorage = []
const charAPI = api({
    storage: myStorage,
})

const userInput = `Ааа! Буква 'а' дублируется в БД!`

/* async function run(text) {
    for (const char of text) {
        const charIdx = await charAPI.add(char)
        console.log(JSON.stringify({ [char]: charIdx }))
    }
} */

async function run(text) {
    const charTasks = text.split('').map(char => charAPI.add(char))
    const charResults = await Promise.all(charTasks)
    return charResults.map((result, idx) => ({ [text[idx]]: result }))
}

run(userInput)
    .then(results => {
        if (results !== undefined) {
            console.log(JSON.stringify(results))
            results.forEach((result, idx) => {
                // проверка на наличие дубля в массиве storage
                assert.strictEqual(myStorage.indexOf(myStorage[idx]), myStorage.lastIndexOf(myStorage[idx]))
            })
        }
    })
    .catch(e => console.log(e))
