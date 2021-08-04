//STARTING POINT OF THE SERVER APPLICATION
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();

//handles requests URL:"<server_domain>:<port>/post" to postRoutes

app.use(express.json( {limit: "30mb", extended: true} ));
app.use(express.urlencoded( {limit: "30mb", extended: true} ));
app.use(cors());

//define this only after you define cors;
app.use('/posts', postRoutes); 

//stores informations about Database Connection to mongodb on atlas need to specify <user>:<password> and <db_name> 
const CONNECTION_URL = process.env.CONNECTION_URL;

//handles the <port> be it fixed or stored in .env files
const PORT = process.env.PORT || 5000;

//connect is a promisse function see https://mongoosejs.com/docs/connections.html
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  //on success listens to request made to defined <port>
  app.listen( PORT, () => {
    
    console.log(`CONNECTED TO MONGO_DB PORT:${PORT}`);
  })

})
.catch((err) => {console.log(`ERROR: ${err.message}`);});

//handles configurations of mongoose https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
mongoose.set('useFindAndModify', false);