const ctrl = {};

ctrl.index = (req, res) => {
    res.render('index');
};

module.exports = ctrl;


// const sidebar = require('../helpers/sidebar');
// const { Image } = require('../models');

// const ctrl = {};

// ctrl.index =  (req, res) => {

//     res.send('this is the Home')
// //   const images = await Image
// //     .find()
// //     .sort({ timestamp: -1 });
// //   let viewModel = { images: [] };
// //   viewModel.images = images;
// //   viewModel = await sidebar(viewModel);
// //   res.render('index', viewModel);
// };

// module.exports = ctrl;