const mongoose = require('mongoose')

const connect = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://user_1:pass@cluster0.pvgix.mongodb.net/discord?retryWrites=true&w=majority", {
      useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
    })

    console.log(`[^] Connected to external database @ ${conn.connection.host}`)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

module.exports = connect