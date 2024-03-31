const AppError = require('../utils/AppError');

const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}


const sendErrorProd = (err, req, res) => {
    // Operational, trusted error: send message to client
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // Programming or other unknown error: don't leak error details
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
}

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}



// Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
    if(process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, req, res);
    }

    if(process.env.NODE_ENV === 'production') {
        
        let error = {...err};
        error.message = err.message;    

        if(err.name === 'CastError') error = handleCastErrorDB(error);
        // rest of the error handling code


        return sendErrorProd(error, req, res);
    }
}


module.exports = globalErrorHandler;