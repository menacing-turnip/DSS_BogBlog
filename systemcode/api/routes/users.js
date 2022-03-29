const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.uid === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const { id } = req.params.id;
            //const { username, email, password } = req.body;
            const updatedUser = await pool.query(
                "UPDATE usertable SET username = $1, email = $2, password = $3 WHERE uid = $4",
                [req.body.username, req.body.email, req.body.password, req.body.uid]
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("Users can only modify their own account details!");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.uid === req.params.id) {
        try {
            const user = await pool.query("SELECT * FROM usertable WHERE uid = $1", [req.body.uid]);
            try {
                const deletedPosts = await pool.query("DELETE FROM posts WHERE username = $1", [user.username]);
                const deletedUser = await pool.query(
                    "DELETE FROM usertable WHERE uid = $1",
                    [req.body.id]
                );
                res.status(200).json("User account has successfully been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found");
        }
    } else {
        res.status(401).json("Users can only delete their own account!");
    }
});

//GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await pool.query("SELECT * FROM usertable WHERE uid = $1;", [req.params.id]);
        res.status(200).json(user.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;