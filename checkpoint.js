// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

const {
    Queue,
    BinarySearchTree
} = require('./DS.js');

// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
    return function hija(num) {
        return num ** exp;
    }
}

// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = {
//     N: 'pared',
//     S: {
//         N: 'pared',
//         S: 'pared',
//         E: {
//             N: 'destino',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: {
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

function direcciones(laberinto, direccion = "") {

    // If no labirynth is given, return ''
    if (typeof laberinto === "undefined") return ''; 

    for (let key in laberinto) {
        // Record the current location
        direccion = direccion + key;

        // Check if the value is an object (a nested labirynth)
        if (typeof laberinto[key] === "object") {
            return direcciones(laberinto[key], direccion);
        } else if (laberinto[key] === "destino") {
            // If the value is a string equal to "destino", we are done
            return direccion;
        } else {
            // If the value is a string NOT equal to "destino"
            // we remove the last character from 'direccion'
            direccion = direccion.slice(0, -1);
        }
    }
    return '';
}




// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {

    //let areEqual = true;

    // Check that both arrays are equal length
    // if not, return false
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        // If item is a string or a number
        if (typeof arr1[i] !== "object") {
            // Compare current item with the element at the same
            // index in array 2. If they are not equal, return FALSE
            if (arr1[i] !== arr2[i]) return false; 
                
        } else {
            // If the current element is an array, make the recursion
            return deepEqualArrays(arr1[i], arr2[i]);
        }
    }
    // If the loop completes without breaking, then both arrays are equal
    // and we return TRUE
    return true;
}

// ----- QUEUE -----

// EJERCICIO 4
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2){

    // Put the callbacks in a single array
    const callbacks = [...cbs1, ...cbs2];

    // Sort the callbacks according to their execution time
    // from faster to slower
    function sort(array) {
        for (i = 0; i < array.length; i++) {
            for (let j = 0; j < (array.length - i - 1); j++) {
                if (array[j].time > array[j + 1].time) {
                    const minor = array[j + 1];
                    array[j + 1] = array[i];
                    array[i] = minor;
                }
            }
        }
        return array;
    }

    const sortedCallbacks = sort(callbacks);

    // Add callbacks to queue
    const queue = new Queue();
    sortedCallbacks.forEach(item => {
        queue.enqueue(item.cb());
    })

    return queue._arr;
}



// ----- BST -----

// EJERCICIO 5
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function() {

    const array = [];
    
    function pushValue(value) {
        array.push(value);
    }

    this.depthFirstForEach(pushValue, "in-order");

    return array;
}



// ----- Algoritmos -----

// Ejercicio 6
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(num) {
    if (num <= 3) return num > 1;
    if ((num % 2 === 0) || (num % 3 === 0)) return false;

    let count = 5;

    while (Math.pow(count, 2) <= num) {
        if (num % count === 0 || num % (count + 2) === 0) return false;
        count += 6;
    }
    return true;
}


// EJERCICIO 7
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(array) {

    // Base case
    if (array.length <= 1) {
        return array;
    }

    // Define the Pivot
    let pivot = array[Math.floor(Math.random() * array.length)];

    // Define left, center and right arrays
    const left = [];
    const equal = [];
    const right = [];

    // Populate the arrays
    for (i = 0; i < array.length; i++) {
        if (array[i] < pivot) {
            right.unshift(array[i]);
        } else if (array[i] > pivot) {
            left.unshift(array[i]);
        } else {
            equal.push(array[i]);
        }
    }

    // Recursion
    return [...quickSort(left), ...equal, ...quickSort(right)];
}




// ----- EXTRA CREDIT -----

// EJERCICIO 8
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(num, lastNum=0){
    let revNumber = lastNum;

    while (num > 0) {
        revNumber = (revNumber * 10) + (num % 10);
        num = Math.floor(num / 10);
    }
    return revNumber;
}

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    BinarySearchTree
}
