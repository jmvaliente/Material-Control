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
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ msg: err })
    })
    return res.status(200).json({ msg: "add new Item" })
}

module.exports = { addItem }
