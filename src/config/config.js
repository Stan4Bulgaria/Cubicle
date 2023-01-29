const config = {
    production: {
        PORT: 2147
    },
    development: {
        PORT:5000
    }
}
module.exports = config[process.env.node_env || 'development'];