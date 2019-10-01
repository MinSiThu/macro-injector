
// Simple Example
let MacroInjector = require("../index");
let macroInjector = new MacroInjector();

macroInjector.addDependency("User",class{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    log(){
        console.log(`${this.name} is ${this.age} years old!`)
    }
})

class UserService{
    setUser(name,age){
        this.user = new this.injections.User(name,age);
    }

    render(){
        this.user.log();
    }
}

let injectedUserService = macroInjector.inject(UserService,"User");
injectedUserService.setUser("The Creator of Super-Injector",19)
injectedUserService.render();

console.log(macroInjector.dependencies())