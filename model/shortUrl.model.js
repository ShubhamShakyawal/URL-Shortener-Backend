import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({ // creating schema | structure for the data which is to stored in database.
    full : {
        type: String,
        require :true
    },
    short : {
        type: String,
        require :true
    },
    clicks: {
        type: Number,   
        require: true,
        default: 0
    }
});

export default mongoose.model('ShortUrl',shortUrlSchema); // creating a model named "ShortUrl" and its Schema is shortUrlSchema