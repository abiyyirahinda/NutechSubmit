
const express = require("express");
const app = express();

const registerRoute = require("./routes/register");
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const updateRoute = require('./routes/update');
const balanceRoute = require('./routes/balance');
const topupRoute = require('./routes/topup');
const transactionRoute = require('./routes/transaction');
const PORT = 3000

app.use(express.json()); 

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/profile/update', updateRoute);
app.use('/balance', balanceRoute);
app.use('/topup', topupRoute);
app.use('/transaction', transactionRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})