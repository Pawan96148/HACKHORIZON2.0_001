const express =require('express')

const app = express();

require('dotenv').config();

const db = require('./config/db');




//Middleware
app.use(express.json());// req.bodynet
app.use(express.urlencoded({ extended: true }));

// Backend (app.js ya server.js)
const cors = require('cors');

app.use(cors({
    origin: "*", // Ye har jagah se request allow karega
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
//Routes
app.get('/', (req, res) => {
  res.send('hey broh😎.... how can i help you????')
});


//import the router file

// const personRoutes = require('./routes/personRoutes');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');

//use the router
// app.use('/person',personRoutes);
app.use('/user',userRoutes);
app.use('/ai',aiRoutes);


const PORT=process.env.PORT || 3000;

//comment adding for testing purpose in online server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});