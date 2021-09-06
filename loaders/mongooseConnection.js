const mongoose = require("mongoose");
const db = require("../config/db");

module.exports = {
    connectMongoDB: async () => {
        try {
            mongoose.Promise = global.Promise;
            await mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
            return console.log("Conectado ao MongoDB: " + db.mongoURI);
        } catch (error) {
            console.log("Erro ao se conectar: " + error);
        }
    }
}