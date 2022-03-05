const router = require('express').Router();
const { notes } = require('../db/db.json');

router.get("/api/notes", (req, res) => {
    let results = notes;
    if (req.query) {
        console.log(req.query)
    }
    res.json(results)
})

module.exports = router;