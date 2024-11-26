
const errorHandler = (err, res=null, req=null, next=null) => {
    console.log(`Error: ${err.message}`);

    if(res) {
        res.status(404).json({msg:err.message});
    }
    if(next) {
        next();
    }
};

export default errorHandler;
