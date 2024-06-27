import mongoose from 'mongoose';

const connectDB = async () => {

    const URI = process.env.URI as string;

    try {

        await mongoose.connect(URI);
        console.log('Connected to MongoDB');

    }
    catch(error) {

        console.log(`Error while connecting to MongoDB: ${error}`);

    }

};

export default connectDB;