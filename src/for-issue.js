const api = require('./char-store-api')

const myStorage = []
const apiConfig = {
    storage: myStorage,
}
const charAPI = api(apiConfig)

const userInput = `Ааа! Буква 'а' дублируется в БД!`

// Текст пользователя побуквенно заносится в изначально пустую БД
// Для каждой новой буквы после SELECT выполняется еще одна асинхронная операция INSERT
// Код ниже работает таким образом, что ВСЕ буквы как новые добавляются в БД.
// Это приводит к дублированию записей

// async function run(text) {
//     for (const char of text) {
//         const charIdx = await charAPI.add(char)
//         console.log(JSON.stringify({ [char]: charIdx }))
//     }
// }


// {"А":0}
// {"а":1}
// {"а":1}
// {"!":2}
// {" ":3}
// {"Б":4}
// {"у":5}

// Задача
// Добиться такой же записи букв в "БД" как для кода с FOR, но без FOR

async function run(text) {
    const charTasks = text.split('').map(char => charAPI.add(char))
    const charResults = await Promise.all(charTasks)
    return charResults.map((result, idx) => ({ [text[idx]]: result }))
}

run(userInput)
    .then(results => {
        console.log(JSON.stringify(results, null, 2))
    })
    .catch(e => console.log(e))
