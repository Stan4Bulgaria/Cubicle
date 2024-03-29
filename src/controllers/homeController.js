const Cube = require('../models/Cube');
exports.getHomePage = async (req, res) => {
    const { from, search, to } = req.query;
    let cubes = await Cube.find().lean();
    if (search) {
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (from) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= from);
    }
    if (to) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= to);
    }

    res.render('index', { cubes, search, from, to });
}
exports.getAboutPage = (req, res) => {
    res.render('about');
}
exports.getDeletePage = (req, res) => {
    res.render('deletePage');
}