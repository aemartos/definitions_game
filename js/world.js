const city = "Madrid";

var country = () => "España";

class Persona{
    constructor(name, age, pretty, direccion){
        this.name = name;
        if(age>10){
          this.age = age;
          this.veryold = true;
        } else {
          this.age = age;
          this.veryold = false;
        }
        this.pretty = pretty;
        this.direccion = direccion;
    }
    saluda(){
        return "Hola soy " + this.name;
    }
    despidete(){
      return "Adios, me voy, soy: " + this.name;
    }
    dimeedad(){
      return this.age;
    }
    pintateenhtml(){
      return "<h1>"+this.name+"</h1><h2>" + this.age + "</h2>";
    }
}

export {country, city, Persona};
