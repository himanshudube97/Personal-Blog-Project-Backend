

export const errorMiddleware = (err, req, res, next)=>{

    res.json({
        success: false,
        statusCode: err.statusCode,
        message: err.message
    })

};