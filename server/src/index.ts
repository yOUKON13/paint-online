import express from 'express'
import WS from './ws'

const app = express();
const ws = new WS(app);

const port = process.env.PORT || 5000;
app.get('/', (request, response) => {
    response.send('Hello world!');
});
app.listen(port, () => console.log(`Running on port ${port}`));