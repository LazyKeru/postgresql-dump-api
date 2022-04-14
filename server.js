const PORT = 3000

import express from 'express';
import routes from './routes.js'
var app = express()

app.use("/worker", routes)

app.listen(PORT, () => console.log(`The backup API worker is ready and listening on port ${PORT}.`));