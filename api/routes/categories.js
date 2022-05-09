const router = require("express").Router();
const pool = require("../db");

//CREATE NEW CATEGORY
router.post("/", async (req, res) => {
    const { name } = req.body;

    try {
        if (name.includes("'" ) || name.includes(";") || name.includes("\\") ||
            name.includes("*") || name.includes("\"") || name.includes("%")){
            return res.status(500).json(err);
            }
        const newCategory = await pool.query(
            "INSERT INTO category (name) VALUES ($1) RETURNING *",
            [name]
        );

        res.status(200).json(newCategory.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

//RETURN ALL CATEGORIES
router.get("/", async (req, res) => {
    try {
        categories = await pool.query("SELECT * FROM category;");
        res.status(200).json(categories.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;