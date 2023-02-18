module.exports = (err) => {
    const message = Object.keys(err.errors).map(key => err.errors[key].message)[0];
    const Error = { message };
    return Error;
}