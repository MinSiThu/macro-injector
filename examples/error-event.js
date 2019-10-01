
// Error Handling
let MacroInjector = require("../index");
let macroInjector = new MacroInjector();
macroInjector.on("error",message=>{
    console.log(message);
})
macroInjector.addDependency("User","User String can't be injected");
