const item = require("../models/item.js")
const path = require('path')
const multer = require('multer') // upload file

//upload files
let storagePdf = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../static/manuales')),
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

/*  TEMP UPLOAD FILES

async function uploadfile(req, res) {
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ msg: err })
    })

}
 */

async function editItem(req, res) {

    try {
        let modItem = await item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(201).json({ msg: 'item update', data: modItem })
    } catch (error) {
        return res.status(403).json({ msg: 'error update' })
    }

}

async function getItem(req, res) {
    try {
        let getItem = await item.findById(req.params.id)
        if (!getItem) return res.status(404).json({ msg: 'Item not Found' })
        return res.status(200).json({ msg: 'Get Item Success', data: getItem })
    } catch (error) {
        return res.status(400).json({ msg: 'Error get item' })
    }
}

async function deleteItem(req, res) {
    try {
        let delItem = await item.findByIdAndRemove(req.params.id)
        if (!delItem) return res.status(404).json({ msg: 'Item not Found' })
        return res.status(200).json({ msg: 'Delete success', data: delItem })
    } catch (error) {
        return res.status(400).json({ msg: 'Error Delete' })
    }
}

module.exports = { addItem, editItem, getItem, deleteItem }
