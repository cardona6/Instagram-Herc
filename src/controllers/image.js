const fs = require('fs-extra');
const path = require('path');
const { Image } = require('../models/image');
const { randomNumber } = require('../helpers/lins');

const ctrl = {};


ctrl.index = (req, res) => {

};

ctrl.create = async (req, res) => {
    const saveImage = async () => {
      const imgUrl = randomNumber();
      const images = await Image.find({ filename: imgUrl });
      if (images.length > 0) {
        saveImage()
      } else {
        // Image Location
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
  
        // Validate Extension
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
          // you wil need the public/temp path or this will throw an error
          await fs.rename(imageTempPath, targetPath);
          const newImg = new Image({
            title: req.body.title,
            filename: imgUrl + ext,
            description: req.body.description
          });
          const imageSaved = await newImg.save();
          res.send('works');
        } else {
          await fs.unlink(imageTempPath);
          res.status(500).json({ error: 'Only Images are allowed' });
        }
      }
    };
  
    saveImage();
  };

    ctrl.like = (req, res) => {

    };

    ctrl.comment = (req, res) => {

    };

    ctrl.remove = (req, res) => {

    };

    module.exports = ctrl;