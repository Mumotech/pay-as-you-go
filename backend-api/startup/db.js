const mongoose = require('mongoose');

// Connect to MongoDB
module.exports = () => {
    const db = process.env.DB_URI

    mongoose.connect(db)
        .then(() => console.log(`Connected to ${db}..`))
        .catch(err => console.log(err.message))
}
