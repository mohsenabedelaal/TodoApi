const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./config/settings');


// Middleware
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routers 

const router = require('./routes/todoRouter.js')
app.use('/api/todos',router);

// test api
app.get('/',(req,res)=>{
    res.json({message:"hello from api"})
});

// PORT
const PORT = process.env.PORT || 8080 ;


// server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})



