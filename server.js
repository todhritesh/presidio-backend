require('dotenv').config()
const express = require('express');
const cors = require('cors');
require("./src/config/dbconfig")
const userRouter = require("./src/routes/userRouter")
const authRouter = require("./src/routes/authRouter")
const propertyRouter = require("./src/routes/propertyRouter")


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the CORS-enabled server!' });
});

app.use('/user', userRouter);
app.use('/property', propertyRouter);
app.use('/auth', authRouter);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
