
class Errorhandler extends Error{
    constructor(message, statusCode){
        super(message)
        message = this.message;
        statusCode = this.statusCode;
    }
  
}
export default Errorhandler;