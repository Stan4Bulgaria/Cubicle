const Cube = require('../models/Cube');
exports.getOneCube = async (cubeId) => {
    const cube = await Cube.findById(cubeId).lean();
    return cube;
}
exports.update = async (cubeId, data) => await Cube.findByIdAndUpdate(cubeId, data, { runValidators: true })
exports.delete = async (cubeId) => await Cube.findByIdAndDelete(cubeId);
