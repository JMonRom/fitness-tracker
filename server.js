const express = require('express')
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3009;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// include API routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`Server listening: http://localhost:${PORT}`);
});