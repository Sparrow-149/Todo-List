
// it is a module which can be used in other files
// this module is used in app.js
// this module is exporting a function named getDate
// module.exports=getDate;

// function getDate(){
//     let today = new Date();
//     let options ={
//         weekday : "long",
//         day: "numeric",
//         month:"long"
//     }
//     return today.toLocaleDateString("en-US",options);
// }

// this was one way of doing it , but if we have multiple functions we directly cannot bind them to module.exports
// so we can use exports
module.exports.getDate = function() {
    // module.exports can be replaced by exports
    // exports is an object which can be used to add multiple functions
    // exports.getDate = function() { ...... }
    const today = new Date();
    const options ={
        weekday : "long",
        day: "numeric",
        month:"long"
    }
    return today.toLocaleDateString("en-US",options);
};



// module.exports replaced by exports
exports.getDay = function() {
    const today = new Date();
    const options ={
        weekday : "long",
    }
    // tolocalDateString is a function which converts the date into a string with the options provided
    return today.toLocaleDateString("en-US",options);
};
