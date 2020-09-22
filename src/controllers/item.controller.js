const item = require("../models/item.js")
const path = require('path')
const multer = require('multer') // upload file

//upload files
let storagePdf = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './static/manuales'),
    filename: (req, file, cb) => cb(null, file.fieldname + Date.now() + '.pdf')
})

let upload = multer({
    storage: storagePdf, fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf)$/i)) return cb(new Error('file is not PDF format'), false)
        cb(null, true)
    }
}).single('file')

//upload Files

async function addItem(req, res) {

    try {
        let newItem = await new item(req.body)
        let saveItem = await newItem.save()
        return res.status(201).json({ msg: saveItem })

    } catch (error) {
        return res.status(403).json({ msg: "error Creating Item" })
    }

}

async function uploadfile(req, res) {
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ msg: err })

    })

}

async function editItem(req, res) {

    try {
        let modItem = await item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(201).json({ msg: 'item update', data: modItem })
    } catch (error) {
        return res.status(403).json({ msg: 'error update' })
    }

}

module.exports = { addItem, editItem }
