let EventEmitter = require("events").EventEmitter;
let util = require("util");

class Container extends EventEmitter{
    
    constructor(){
        super();
        this._containerMap = new Map();
        this._middlewares = {};
    }

    _emitInjectionEvent(dependencyName){
        if(util.isArray(this._middlewares[dependencyName]) == true){
            this._middlewares[dependencyName].forEach(middleware=>{
                middleware();
            })
        }
    }
    
    addDependency(name,blueprint){        
        if(typeof blueprint == "function"){
            this._containerMap.set(name,blueprint);
        }else{
            this.emit("error",`${blueprint} is not a function type`);
        }
    }

    removeDependency(dependencyName){
        try{
            let deleteSuccess = this._containerMap.delete(dependencyName);
            if(deleteSuccess == false){
                throw new Error(`${dependencyName} is not a dependency`);
            }
        }catch(e){
            this.emit("error",e);
        }
    }

    inject(Injectee,...blueprintNames){
        let injectee = new Injectee();
        injectee.injections = {};        
        blueprintNames.forEach(blueprintName=>{
        let Blueprint = this._containerMap.get(blueprintName);
            if(util.isUndefined(Blueprint) == false){
                this._emitInjectionEvent(blueprintName);
                injectee.injections[blueprintName] = Blueprint;
            }else{
                throw new Error(`${blueprintName} is not a dependency`);
            }    
        })
        return injectee;
    }

    applyMiddleware(beforeBlueprint,middleware){
        if(util.isFunction(middleware) == false){
            throw new Error(`${middleware} is not a function`)
        }else{  
            if(util.isArray(this._middlewares[beforeBlueprint]) == true){
                this._middlewares[beforeBlueprint].push(middleware);
            }else{
                this._middlewares[beforeBlueprint] = [middleware];
            }
        }
    }

    dependencies(){
        return this._containerMap.keys();
    }

}

module.exports = Container;