const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

const PORT = 5000

app.get('/', (req, res) => {
  res.status(200).json({
    msg: "This is the examination system server"
  })
})

app.listen(PORT, () => {
  console.log(`Listening on the port: ${PORT}`);
});
