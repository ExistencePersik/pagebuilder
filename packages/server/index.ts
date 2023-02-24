const express = require('express')

const PORT = 3200

const app = express()

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
