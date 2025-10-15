const User = require('../models/userModel');

exports.getUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) return res.status(500).send(err);
        res.json(users);
    });
};