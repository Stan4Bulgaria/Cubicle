const db = require('../db.json');
const fs = require('fs/promises');
const path = require('path');
class Cube {
    constructor(name, description, imageUrl, difficultyLevel) {
        this.name = name,
            this.description = description,
            this.imageUrl = imageUrl,
            this.difficultyLevel = difficultyLevel
    }
    static async save(cube) {
        this.id = db.cubes[db.cubes.length - 1].id + 1;
        cube.id = this.id;
        db.cubes.push(cube);
        const jsonData = JSON.stringify(db);
        await fs.writeFile(path.resolve(__dirname, '../db.json'), jsonData);
    }
}
module.exports = Cube;