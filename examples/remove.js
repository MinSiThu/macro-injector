
// Simple Example
let SuperInjector = require("../index");
let superInjector = new SuperInjector();

superInjector.addDependency("User",class{
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

let injectedUserService = superInjector.inject(UserService,"User");
injectedUserService.setUser("The Creator of Super-Injector",19)
injectedUserService.render();

superInjector.removeDependency("User");
superInjector.inject(UserService,"User");