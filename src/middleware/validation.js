const isEmpty = field => field.toString().trim() === "" ? true : false;

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

/*A function to check if the object sent in a request is missing any of the required properties and if the values are empty or incorrect.
It takes three parameters:
-fields: an array of required fields as specified in functions below
-obj: the object sent in the request
-msg: an array of error messages that can be sent in the response
*/
const checkProps = (fields, obj, msg) => {
    fields.forEach(field => {
        if (!obj.hasOwnProperty(field)) {
            msg.push(field);
        } else {
            switch (field) {
                case "email":
                    if (isEmpty(obj.email) || !validateEmail(obj.email)) {
                        msg.push("Email");
                    };
                    break; 
                case "password":
                    if (isEmpty(obj.password) || obj.password.length < 6 || obj.password.includes(" ")) {
                        msg.push("Password");
                    };
                    break; 
                case "name":
                    if (isEmpty(obj.name) || obj.name.length > 30) {
                        msg.push("Name");
                    };
                    break;
                default: //for any other required field where we just need to check if it's empty
                    if (isEmpty(obj[`${field}`])) {
                        msg.push(field);
                    };             
            };
        };
    });
};

const validateNewUser = (req, res, next) => {
    let reqFields = ["name", "password", "email"];
    let errMsg = [];
    checkProps(reqFields, req.body, errMsg);
    if (errMsg.length) { 
        return res.status(400).json(`Validation error. Invalid entries for: ${errMsg.join(', ')}`); 
    };    
    next();
};

export { validateNewUser }