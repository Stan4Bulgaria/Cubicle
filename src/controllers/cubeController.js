const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
exports.getCreatCube = (req, res) => {
    res.render('create');
}
exports.postCreateCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    let cube = new Cube({ name, description, imageUrl, difficultyLevel });
    await cube.save();
    res.redirect('/');
}
exports.getDetails = async (req, res) => {
    let cube = await Cube.findById(req.params.cubeId).populate('accessories').lean();
    let accessories = cube.accessories;
    if (!cube) {
        return res.render('404');
    }
    res.render('details', { cube, accessories });

}
exports.getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const accessories = await Accessory.find({_id: {$nin: cube.accessories}}).lean();
    res.render('accessory/attach', { cube, accessories });
}
exports.postAttachAccessory = async (req, res) => {
       let cube = await Cube.findById(req.params.cubeId);
       const accessoryId = req.body.accessory;
       cube.accessories.push(accessoryId);
       cube.save();
       res.redirect(`/details/${cube._id}`);
}
