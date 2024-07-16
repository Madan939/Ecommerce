const Item = require('../models/itemsModel')
const path = require('path');
const fs = require('fs');
const { error } = require('console');
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.send(items)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.addnewitems = async (req, res) => {
    console.log(req.body)
    try {
        console.log(req.body)
        const newitems = new Item(req.body)
        const newitem = new Item({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: req.file.path
        })
        console.log(newitems)
        await newitem.save()
        //    res.send("item added successfully")
        res.status(200).json({
            sucess: true,
            message: 'item added successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.getedititems = async (req, res) => {
    //  console.log(req.params._id)
    try {
        const id = req.params._id
        const item = await Item.findById(id)
        // console.log(item)
        if (item) {
            res.send(item)
        }
        else {
            console.log("error")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.postupdateitems = async (req, res) => {

    const id = req.body.id
    try {
        const product = await Item.findById(id)

        if (!product) {
            return res.status(400).json({
                message: "product not found",
                success: false
            })
        }
        const { name, category, price } = req.body
        let image = product.image
        //console.log(req.body)

        if (req.file && req.file.path) {
            // console.log("path",req.file.path)
            const oldimgpath = path.join(__dirname, '../', product.image)
            console.log(oldimgpath)
            fs.unlink(oldimgpath, (err) => {
                if (err) {
                    console.log("failed to delete old image")
                }
                else {
                    console.log("deleted")
                }
            })
            image = req.file.path

        }
        console.log("dd", { name, price, image, category })
        await Item.findByIdAndUpdate(id, { name, price, image, category })
        res.send("items updated successfully")
    }
    catch (err) {
        res.status(400).json(err)
    }


}
exports.postdeleteitems = async (req, res) => {
    const id = req.params._id
    // console.log(id)
    try {
        const product = await Item.findById(id)
        if (!product) {
            return res.status(400).json({
                message: "product not found",
                success: false
            })
        }
        const oldimgpath = path.join(__dirname, '../', product.image)
        console.log(oldimgpath)
        fs.unlink(oldimgpath, (err) => {
            if (err) {
                console.log("failed to delete old image")
            }
            else {
                console.log("deleted")
            }
        })
        await Item.findByIdAndDelete(id, { product })
        res.send("deleted successfully")
    }
    catch (err) {
        res.status(400).json(err)
    }
}