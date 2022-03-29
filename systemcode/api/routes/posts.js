const router = require("express").Router();
const pool = require("../db");

//CREATE NEW POST
router.post("/", async (req, res) => {
    const { title, description, username } = req.body;
    try {
        const newPost = await pool.query(
            "INSERT INTO posts (title, description, username, published_on) VALUES ($1, $2, $3, CURRENT_TIMESTAMP()) RETURNING *",
            [title, description, username]
        );

        res.status(200).json(newPost.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
        try {
            const post = await pool.query("SELECT * FROM posts WHERE pid = $1", [req.params.id]);
            //console.log(post.rows[0].username);
            if (post.rows[0].username === req.body.username) {
                try {
                    const updatedPost = await pool.query(
                        "UPDATE posts SET title = $1, description = $2, edited_on = CURRENT_TIMESTAMP() WHERE pid = $3",
                        [req.body.title, req.body.description, req.params.id]
                    );
                    res.status(200).json(updatedPost);
                } catch (err) {
                    res.status(500).json(err);
                }
            } else {
                res.status(401).json("Users can only update their own posts!");
            }
        } catch (err) {
            res.status(500).json(err);
        }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await pool.query("SELECT * FROM posts WHERE pid = $1", [req.params.id]);
        //console.log(post.rows[0].username);
        if (post.rows[0].username === req.body.username) {
            try {
                const deletedPost = await pool.query(
                    "DELETE FROM posts WHERE pid = $1",
                    [req.params.id]
                );
                res.status(200).json("Post Successfully deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("Users can only delete their own posts!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await pool.query("SELECT * FROM posts WHERE pid = $1", [req.params.id]);
        res.status(200).json(post.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const category = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await pool.query("SELECT * FROM posts WHERE username = $1;", [username]);
        } else if (category) {
            posts = await pool.query("SELECT * FROM posts WHERE categories = $1;", [{ $in: [category] }]);
        } else {
            posts = await pool.query("SELECT * FROM posts;");
        }
        res.status(200).json(posts.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;