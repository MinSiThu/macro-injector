
// Error Handling
let SuperInjector = require("../index");
let superInjector = new SuperInjector();
superInjector.on("error",message=>{
    console.log(message);
})
superInjector.addDependency("User","User String can't be injected");
