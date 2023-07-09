const mongoose = require("mongoose");

module.exports = async () => {
    const mongoUri =
        "mongodb+srv://harshal_509:kfH1W18z5hkPZa4y@socialmedia.lzl3g8y.mongodb.net/?retryWrites=true&w=majority";
    try {
        const connect =await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
