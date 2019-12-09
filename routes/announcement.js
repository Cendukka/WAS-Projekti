const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const _ = require('lodash');
const moment = require('moment');
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
    //res.status(200).send(announcements);
    let names = [];
    let emails = [];
    let contents = [];
    let categories = [];
    let expirationDates = [];

    announcements.forEach(a => {
        names.push(a.name);
        emails.push(a.email);
        contents.push(a.content);
        categories.push(a.category);
        let unformatedDate = moment(a.expirationDate);
        let formatedDate = unformatedDate.format("DD/MM/YYYY");
        expirationDates.push(formatedDate);
    })
   
    res.status(200).render("show",{
        names: names,
        emails: emails,
        contents: contents,
        categories: categories,
        expirationDates: expirationDates
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
