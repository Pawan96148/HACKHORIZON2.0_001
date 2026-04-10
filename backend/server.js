const express =require('express')

const app = express();

require('dotenv').config();

const db= require('./db');

//Middleware
const bodyParser=require('body-parser');
app.use(bodyParser.json()); // req.bodynet

//Routes
app.get('/', (req, res) => {
  res.send('hey broh😎.... how can i help you????')
});



const PORT=process.env.PORT || 3000;

//comment adding for testing purpose in online server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

