const config = {
    production: {
        PORT: 2147,
        DB_URI:'mongodb://127.0.0.1:27017/cubeDb'
    },
    development: {
        PORT:5000,
        DB_URI:'mongodb://127.0.0.1:27017/cubeDb'
    }
}
module.exports = config[process.env.node_env || 'development'];