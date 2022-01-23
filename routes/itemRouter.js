'use strict';
const express = require('express');
const itemRouter = express.Router();
const Items = require('../models/resources-items');
const mongoose = require('mongoose');

// Get items
itemRouter.get('/itemlist', async (req, res) => {
    try {
        const items = await Items.find();
        res.render('items', {
            itemList: items,
            // Id to link to the 'read more' button
            itemId: items._id
        });
    } catch (err) {
        res.render('error', {
            message: err
        });
    }
});

// Get single item
itemRouter.get('/itemlist/:id', async (req, res) => {
    // handlebars setting
    let tempItem = [];

    try {
        const singleItem = await Items.findOne({ _id: req.params.id });
        if (singleItem) {
            tempItem.push(singleItem);
            res.render('itemDetail', {
            itemDetail: tempItem
            })
        } else {
            res.render('itemDetailNotFound')
        }
    } catch (err) {
        res.render('error', {
            message: err
        })
    }
})

// Post new items and render forms
itemRouter.get('/add', (req, res) => {
    res.render('add');
});

itemRouter.post('/add', (req, res) => {
    const newItem = new Items({
        name: req.body.name,
        description: req.body.description,
        condition: req.body.condition,
        location: req.body.location,
        tags: req.body.tags,
        price: req.body.price,
        quantity: req.body.quantity,
        quantityUnit: req.body.quantityUnit,
        manufacture: req.body.manufacture
    });

    newItem.save().then(res.redirect('/api/item/itemlist'));
});

// Remove item and render item table to remove
itemRouter.get('/remove', async (req, res) => {
    try {
        const items = await Items.find();
        res.render('removeItem', {
            itemList: items,
            // Id to link to the 'read more' button
            itemId: items._id
        });
    } catch (err) {
        res.render('error', {
            message: err
        });
    }
});

itemRouter.delete('/remove/:id', async (req, res) => {
    try {
        const singleItem = await Items.find({ _id: req.params.id });
        Items.remove({_id: req.params.id}, (err => res.render('error', {message: err})));
        res.redirect('/api/item/remove')        
    } catch (err) {
        res.render('error', {
            message: err
        })
    }
});

// Update single item
itemRouter.get('/update/:id', async (req, res) => {
    // handlebars setting
    let tempItem = [];

    try {
        const singleItem = await Items.findOne({ _id: req.params.id });
        if (singleItem) {
            tempItem.push(singleItem);
            res.render('update', {
            itemDetail: tempItem
            })
        } else {
            res.render('itemDetailNotFound')
        }
    } catch (err) {
        res.render('error', {
            message: err
        })
    }
});

itemRouter.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const condition = req.body.condition;
    const location = req.body.location;
    const tags = req.body.tags;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const quantityUnit = req.body.quantityUnit;
    const manufacture = req.body.manufacture;

    const updateItem = await Items.findByIdAndUpdate({_id: req.params.id}, {
        name,
        description,
        condition,
        location,
        tags,
        price,
        quantity,
        quantityUnit,
        manufacture
    });
    res.redirect(`/api/item/itemlist/${id}`)   
});

// Coming soon features
itemRouter.get('/statistics', (req, res) => {
    res.render('update');
});

module.exports = itemRouter;
