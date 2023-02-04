const dotenv = require('dotenv');

dotenv.config()

const app = require('./app');

const port = process.env.PORT

app.listen(port, () => {
    console.log(`server now running on port ${port}`);
})