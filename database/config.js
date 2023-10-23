const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('conected mongodb');

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to Mongo');
    }
}

module.exports = {
    dbConnection
}