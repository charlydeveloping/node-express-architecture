const errorHandler = (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        success: false,
        message: 'Lo sentimos ha ocurrido un error',
    })
} 

module.exports = errorHandler