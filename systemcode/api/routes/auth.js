const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

//REGISTER NEW USER
router.post("/register", async (req, res) => {
    try {
        //Using bcrypt to salt password after it is entered
        const salt = await bcrypt.genSalt(10);
        //Using bcrypts hash function after salting
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const { username, email } = req.body;

        const newUser = await pool.query(
            "INSERT INTO usertable (username, email, password, lastlogin) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
            [username, email, hashedPass]
        );

        res.status(200).json(newUser.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

//USER LOGIN
router.post("/login", async (req, res) => {
    try {
        const { username } = req.body;
        const user = await pool.query("SELECT * FROM usertable WHERE username = $1", [username]);
        //Protects against account enumeration by not specifying username or password being incorrect/not existing
        if (user.rows.length === 0) {
            return res.status(401).json("Wrong Username or Password!");
        }
        //!user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.rows[0].password);
        //Same account enumeration protection
        !validated && res.status(401).json("Wrong Username or Password!");

        res.status(200).json(user.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;