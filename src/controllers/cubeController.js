const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const cubeManager = require('../manager/cubeManager');
const cubeUtils = require('../utils/cubeUtils');
exports.getCreatCube = (req, res) => {
    console.log(req.user);
    res.render('create');
}
exports.postCreateCube = async (req, res) => {

    const { name, description, imageUrl, difficultyLevel } = req.body;
    try{
        let cube = new Cube({
            name,
            description,
            imageUrl,
            difficultyLevel,
            Owner: req.user._id
        });
        await cube.save();
        res.redirect('/');
    }
    catch(err){
        const Error = err;
        console.log(Error);
         res.render('create',{Error})
    }
}
exports.getDetails = async (req, res) => {
    let cube = await Cube.findById(req.params.cubeId).populate('accessories').lean();
    let accessories = cube.accessories;
    if (req.isAuthenticated = false) {

        return res.render('404');
    }
    if (!cube) {
        return res.render('404');
    }
    if (!req.user) {
        res.render('details', { cube, accessories });
        return;
    }
    const isOwner = cube.Owner == req.user._id;
    res.render('details', { cube, accessories, isOwner });

}
exports.getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();
    res.render('accessory/attach', { cube, accessories });
}
exports.postAttachAccessory = async (req, res) => {
    let cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory;
    cube.accessories.push(accessoryId);
    cube.save();
    res.redirect(`/details/${cube._id}`);
}
exports.getEditCube = async (req, res, next) => {
    try {
        const cube = await cubeManager.getOneCube(req.params.cubeId);
        if (!cube) {
            throw new Error('Cube doesnt exist');
        }
        if (!req.user) {
            throw new Error('Not the owner of the cube!')
        }
        if (!cubeUtils.isOwner(req.user._id, cube)) {
            throw new Error('Not the owner of the cube!')
        }
        const difficultyLevel = cubeUtils.generatedDifficultyLever(cube.difficultyLevel);
        res.render('editCube', { cube, difficultyLevel });
    }
    catch (err) {
        const Error = err;
        next(Error);
    }

}
exports.getDeleteCube = async (req, res) => {
    const cube = await cubeManager.getOneCube(req.params.cubeId);
    if (!cube) {
        return res.render('404');
    }
    const difficultyLevel = cubeUtils.generatedDifficultyLever(cube.difficultyLevel);
    res.render('deletePage', { cube, difficultyLevel });
}
exports.postEditCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    await cubeManager.update(req.params.cubeId, {
        name,
        description,
        imageUrl,
        difficultyLevel
    });
    res.redirect(`/details/${req.params.cubeId}`);
}
exports.postDeleteCube = async (req, res) => {
    await cubeManager.delete(req.params.cubeId);
    res.redirect('/');
}

