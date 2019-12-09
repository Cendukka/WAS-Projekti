const express = require('express');
const router = express.Router();
const {Announcement} = require('../models/announcement');


/* GET create page. */
router.get('/create', function (req, res, next) {
    const {error} = req.query;
    const token = req.csrfToken();
    console.log(req.csrfToken());
    res.render('create', {error: error, token: token});
});


/* GET create page. */
router.get('/view', async function (req, res, next) {
    const announcementsDocs = await Announcement.find({});
    const announcements = announcementsDocs.map(announcement => {
        return {
            name: announcement.name,
            email: announcement.email,
            content: announcement.content,
            category: announcement.category,
            expirationDate: announcement.expirationDate.toLocaleDateString()
        }
    });

    res.render('show', {announcements: announcements});
});

module.exports = router;
