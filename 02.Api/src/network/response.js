exports.success = (req, res, data, status = 200) => {
    res.status(status).send(data)
}