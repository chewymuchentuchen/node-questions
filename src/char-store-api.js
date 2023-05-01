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
        this.storage = storage

        const that = this

        // приватные методы, выполняющие асинхронную работу
        async function putOne(data) {
            await emulateAsyncWork()
            return that.storage.push(data) - 1 // индекс только что добавленного элемента
        }

        async function getOne(data) {
            await emulateAsyncWork()

            const foundIdx = that.storage.indexOf(data)
            return foundIdx > -1 ? foundIdx : putOne(data)
        }

        // публичные методы
        this.add = data => {
            return getOne(data)
        }
    }

    return new API()
}
