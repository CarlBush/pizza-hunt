const mongoose = require("mongoose");
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

//mongoose.connect needs to be before the app.listen
//IF environment variable MONGODB_UR exists (like on heroku) use that OR use local mongo server database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pizza-hunt", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set("debug", true);


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
