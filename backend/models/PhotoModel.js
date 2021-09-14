import mongoose from 'mongoose';


const PhotoSchema = new mongoose.Schema({
    user: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    photo: {
        type: String,
        require: [true, 'Photo is required'],
        unique: [true, 'url must be unique']
    },
    
    label: {
        type: String,
        required: [true, 'Label is required'],
        unique: [true, 'Label must be unique']
    }
})


export const PhotoModel = mongoose.model('photo', PhotoSchema)