/* All possible types */
{
    let myName: string = 'Yura';
    
    let myAge: number = 18;
    
    let isMan: boolean = true;
    
    let isTalant: undefined = undefined;
    
    let isProblems: null = null;
    
    let allInCode: any = true;
    // let a: Object;
    // a.prop = 1;
    
    function myFunc(): void {} // It returns anything
    
    // let secret: symbol = Symbol('a');
    
    isTalant = undefined;
    
    isProblems = null;

    let me: {
        readonly age: number,
        name: string
    } = {
        age: 12,
        name: 'Yura'
    };

    // me.age = 12; Cannot rewrite value - It is more real constant than in JS
    me.name = 'Yurq';
 
    let hashMap: { 
        [propName: string]: number | string 
    };


    let myArray: (number | string)[] = [1, 2, 3, 'sd']
    myArray.push(12);

    let secretArray: ReadonlyArray<number | string> = [1, 2, 3, 'sd'];
    secretArray.push(12);// Error, it's readonly array
}

/* Interfaces */
{
    // type CustomType = {
    //     age: number
    // };
    
    // interface IMover {
    //     move: () => void,
    //     getStatus: () => {speed: number}
    // }

    // interface IShaker {
    //     shake: () => void,
    //     getStatus: () => {frequency: number}
    // }

    // interface IMoverShaker extends IMover, IShaker, CustomType {
    //     getStatus: () => {frequency: number, speed: number}
    // }

    // let testObject: IMoverShaker = {
    //     age: 19,
    //     move() {},
    //     shake() {},
    //     getStatus() {
    //         return { 
    //             frequency: 12,
    //             speed: 12
    //         };
    //     }
    // };

    /* Declarative merge */

    
    interface ITest {
        name: string;
    }
    
    interface ITest {
        id: number;
    }
    
    interface ITest {
        isMan: boolean;
    }

    let testInterface: ITest = { name: 'Yura', id: 123, isMan: true };



    interface IUser<T, U, U1> {
        name: T;
        age: U;
        family: U1;
    }

    let user1: IUser<string, number, {father: {name: string, age: number}}> = {
        name: 'Yura',
        age: 18,
        family: {
            father: {
                name: 'Anderson',
                age: 40
            }
        }
    };
    let a: Array<string>;
    a = ['2', '123123'];
    
} 

/* Lesson 2 */
{
    // function getAvarage(...numbers: number[]): string {
    //     let result: number = 0;
        
    //     for (let i = 0, max = numbers.length; i < max; i++) {
    //         result += numbers[i];
    //     }
        
    //     return `The avarage is ${result}`;
    // }
    
    // getAvarage(1, 2, 4);
    
    
    type customType = string | number;
    
    
    
    function isString(param: customType): param is string {
        return typeof param === "string";
    }
    
    function getAvarage(/* ...params: customType[] */a: customType): string {
        let result: number = 0;
    
        /* Doesn't work - Error, can't determine type */
        // for (let i = 0, max = params.length; i < max; i++) {
    
        //     if ( isString(params[i]) ) {
        //         result += parseInt(params[i], 10);
        //     } else {
        //         result += params[i];
        //     }
        // }
    
        /* Succesfull works */
            if ( isString(a) ) {
                result += parseInt(a, 10);
            } else {
                result += a;
            }
    
        return `The sum of numbers is ${result}`;
    }
    
    getAvarage(1, 2, '3', 4, 5);

}

/* Classes */
{
    interface ICoords {
        x: number;
        y: number;
    }

    interface IPoint {
        getCoords(): {x:number, y: number};
    }

    class Point implements ICoords, IPoint {
        public constructor(
            public x: number,
            public y: number
        ) {
            this.x = x;
            this.y = y;
        };

        getCoords(): {x:number, y: number} {
            return {
                x: this.x,
                y: this.y
            };
        }

    }

    let point: Point = new Point(1, 2);

    
    /* 
        Doesn't work 
        type optionsType = {
            name: string;
            age: number;
            id: number;
        };
        
        class Singleton {
            private static _instance: Singleton;

            public name: string;
            public age: number;
            private id: number;
            
            private constructor(
                {
                    name,
                    age,
                    id
                }
            ) {
                this.name = name;
                this.age = age;
                this.id = id; 
            }

            public static getInstance(options: optionsType) {
                if (!Singleton._instance) {
                    Singleton._instance = new Singleton(options);
                }

                return Singleton._instance;
            }
        }

        let newAdmin = {
            name: 'Yura',
            age: 18,
            id: 1212,
            id1: 1212
        };
        
        let instance = Singleton.getInstance(newAdmin);
    */


    // class A {
    //     public x: number = 1;
    //     private y: number = 2;
    //     protected z: number = 3;

    //     public constructor() {}
    // }

    // let a: A = new A();
    
    // class B extends A {
    //     public constructor() {
    //         super();
            // this.y   /* Unavaible */
    //     }
    // }

    // abstract class A {
    //     public value(): number {
    //         return 2;
    //     }

    //     public abstract getValue(): number;
    // }

    // class B extends A {
    //     public getValue(): number {
    //         return this.value() * 2;
    //     }
    // }

    type carOptions = {
        [propName: string]: string | number;
    };
    
    abstract class Car {        
        public set model(value: string) {
            this.model = value;
        }
        public getModel(): string {
            return `The model is ${this.model}`;
        }
        
        abstract set configuration(options: carOptions);
    }

    class SuperCar extends Car {
        public constructor() {
            super();
        }
        set configuration(options: carOptions) {
            for (let prop in options) {
                if (options.hasOwnProperty(prop) === true) {
                    this[prop] = (this[prop]) ? this[prop] : options[prop];
                }
            }
        }
    }
    
    let myCar = new SuperCar();
    myCar.configuration = {
        model: "Super Super",
        speed: 220,
        weight: 2500,
        width: 2.5,
        height: 1.8
    };
    myCar.getModel();
}
