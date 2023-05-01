module.exports = ({ storage = [], ...rest }) => {
    console.log(`Config=${JSON.stringify({ storage, ...rest })}`)

    // эмулятор асинхронной работы (с драйвером БД)
    function emulateAsyncWork({ delay } = { delay: 0 }) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, delay)
        })
    }

    function API() {
        // приватные свойства
        const db = storage

        // приватные методы, выполняющие асинхронную работу
        async function putOne(char) {
            await emulateAsyncWork()
            return db.push(char) - 1 // индекс только что добавленного элемента
        }

        async function getOne(char) {
            await emulateAsyncWork()
            let id = db.indexOf(char)
            if (id > -1) {
                return id
            }
            id = await putOne(char)

            return id
        }

        // публичные методы
        this.add = data => {
            return getOne(data)
        }
    }

    return new API()
}
