import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

  //user wants to like a post
  //click button "like" => auth middleware (controller function as arg) => like controller ...

  try{
    //console.log("header: ",req.headers)
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    
    //console.log("token: ", token);
    //console.log("isCustomAuth: ", isCustomAuth);
    
    let decodedData;
    if(token && isCustomAuth){
      decodedData = jwt.verify(token, 'test');
      
      //version 14 of node accepts Optional Chaining Operator 
      //req.userId = decodedData?.id;
      
      //version 13 does not so this is the replacement
      req.userId = decodedData ? decodedData.id : null;
      
      //console.log("Cust req.userId: ", req.userId);
      
    }else{
      decodedData = jwt.decode(token);
      
      req.userId = decodedData ? decodedData.sub : null;

      //console.log("NoCust req.userId: ", req.userId);
    }

    next();
  }catch(err){
    console.log(err.message);
  }

}

export default auth;