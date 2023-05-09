

export const errorMiddleware = (err, req, res, next)=>{
console.log(err.statusCode, "code");
    res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message
    })

};