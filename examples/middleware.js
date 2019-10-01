
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

superInjector.applyMiddleware("User",function(){
    console.log("Before Injection User");
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