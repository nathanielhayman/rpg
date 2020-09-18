function myFunc() {
    var date = new Date()
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()

    console.log(`Refresh command ran at ${hour}:${minutes}:${seconds}`)

    if (hour === 14) {
        console.log('@everyone play jackbox')
    }

    asd = setTimeout(myFunc, 3600000)

    console.log(asd)
}

myFunc()