const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const _ = require('lodash');
const {validate, Announcement} = require('../models/announcement');

/* GET announcement listing. */
router.get('/', async (req, res) => {
    const announcementsDocs = await Announcement.find({});
    const announcements = announcementsDocs.map(({name, email, content, category, expirationDate,}) => ({
        name,
        email,
        content,
        category,
        expirationDate,
    }));

    if (!announcements) return res.status(400).send('No announcements found');
    res.status(200).render("announcements", {
        name: announcements.name,
        email: announcements.email,
        content: announcements.content,
        category: announcements.category,
        expirationDate: announcements.expirationDate
    });
});


router.post('/', async (req, res) => {
    console.log(req.cookies);
    const validateAnnouncement = validate(req.body);
    if (validateAnnouncement.error !== null) {
        res.status(400).send(validateAnnouncement.error.details[0].message)
    } else {
        await Announcement.create(validateAnnouncement.value)
            .then((announcement) => res.status(201).send((_.pick(announcement, [
                '_id',
                'name',
                'email',
                'content',
                'category',
                'expirationDate',]))))
            .catch(_ => {
                console.log(_);
                return res.status(404).send(_);
            });
    }
});

module.exports = router;
