if (process.env.NODE_ENV == 'production') {
    module.exports = { mongoURI: "mongodb+srv://christhian:c19141300C@bellaclothes.9mzmp.mongodb.net/BellaClothes?retryWrites=true&w=majority" }
} else {
    module.exports = { mongoURI: "mongodb://localhost/bellaclothes" }
}