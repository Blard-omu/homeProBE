export const authCheck = (req, res, next) => {
let isAuth = true;
if(isAuth) {
    console.log("User is authenticated!");
}else{
    console.log("User is not authenticated!");
    res.status(401).json({message: "Unauthorized"});
    return; 
}
next();
};


export const globalMiddleware = (req, res, next) => {
    console.log("Global middleware activated");
    next();
}

// isAdminCheck