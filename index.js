const express = require('express');
const cookieParser = require('cookie-parser');
const NotFoundMiddleware = require('./middleware/not-found');
const ErrorHandlerMiddleware = require('./middleware/error-handler');

const router = require('./routers');

const app = express();
const port = 3000;

app.use(cookieParser(process.env.SECRET_KEY));
// middleware function untuk parsing JSON dari HTTP req menjadi objek js
app.use(express.json());
app.use('', router);

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

app.listen(port, () => console.log(`App listening on port ${port}!`));
