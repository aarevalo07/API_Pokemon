const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/pokemon'; // URL de la base de datos (Debe modificarse)

module.exports = () => {
  
    const connect = () => {
        
        mongoose.connect(
            DB_URL,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if(err){
                    console.log('DB: ERROR !!');
                } else {
                    console.log('DB: Connected !!');
                }
            }
        );
            
    }

    connect();
    
};