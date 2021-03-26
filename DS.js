function Queue() {
    this._arr = [];
}

Queue.prototype.enqueue = function(val) {
    this._arr.push(val);
}

Queue.prototype.dequeue = function() {
    return this._arr.shift();
}

Queue.prototype.size = function() {
    return this._arr.length;
}


function BinarySearchTree(value) {
    this.value = value;
    this.left = null;
    this.right = null;
};

BinarySearchTree.prototype.size = function () {
    // Declaro una variable que acumula el tamaño
    var ret = 1;
    // Si existiera izquierda le sumo su tamaño
    if (this.left) ret += this.left.size();
    // Si existiera derecha le sumo su tamaño
    if (this.right) ret += this.right.size();
    // retorno el tamaño
    return ret;
};

BinarySearchTree.prototype.insert = function (value) {
    // Si el valor del arbol acutal es mayor que el valor a ingresar voy a la izquerda
    if (this.value > value) {
        // Y no existe un arbol a la izquierda
        if (!this.left) {
            // Agrego ahi un nuevo arbol que el valor a ingresar
            this.left = new BinarySearchTree(value);
        } else {
            // Pero si existiera un arbol a la izquierda
            // Inserto el valor en ese arbol ese (recursion)
            this.left.insert(value);
        }
    } else {
        // Pero si el valor es menor o igual que el valor a ingresar
        // Y no existe un arbol a la derecha
        if (!this.right) {
            // Agrego ahi un nuevo arbol com el valor a ingresar
            this.right = new BinarySearchTree(value);
        } else {
            // Pero si existiera un arbol a la derecha
            // Inserto el valor en ese arbol (recursion)
            this.right.insert(value);
        }
    }
};

BinarySearchTree.prototype.contains = function(checkValue) {
    // Si el valor del nodo actual es igual que el valor buscado retorno true
    if (this.value === checkValue) return true;
    // Si el valor del nodo actual es mayor que el valor buscado
    // Y existe un nodo a la izquierda
    // recursiono en la izquierda
    if (this.value > checkValue && this.left) return this.left.contains(checkValue);
    // Si el valor del nodo actual es menor que el valor buscado
    // Y existe un nodo a la derecha
    // recursiono en la derecha
    if ( this.value < checkValue && this.right) return this.right.contains(checkValue);
    // Si no quiere decir que termino la busqueda y retorno false
    return false
}

BinarySearchTree.prototype.depthFirstForEach = function(cb, order) {
    if (order === "in-order" || !order) {
        // in-order => left -> actual -> right
        // Si existiera left recursiono en left
        if (this.left) this.left.depthFirstForEach(cb, order);
        // Llamo al callback con el valor actual
        cb(this.value);
        // Si existiera right recursiono en right
        if (this.right) this.right.depthFirstForEach(cb, order);
    } else if (order === "pre-order") {
        // pre-order => actual -> left -> right
        // Llamo al callback con el valor actual
        cb(this.value);
        // Si existiera left recursiono en left
        if (this.left) this.left.depthFirstForEach(cb, order);
        // Si existiera right recursiono en right
        if (this.right) this.right.depthFirstForEach(cb, order);
    } else if (order === "post-order") {
        // post-order => left -> right -> actual
        // Si existiera left recursiono en left
        if (this.left) this.left.depthFirstForEach(cb, order);
        // Si existiera right recursiono en right
        if (this.right) this.right.depthFirstForEach(cb, order);
        // Llamo al callback con el valor actual
        cb(this.value);
    }
}

BinarySearchTree.prototype.breadthFirstForEach = function(cb) {
    // Declaro un for que inicialice un array con this
    // mientras el largo del mismo sea mayor a cero
    // Voy quitando el primer elemento del array 
    // De esta manera cada arbol recorrido va agregando sus subarboles a la ejecucion del for
    for (var pointers = [this]; pointers.length > 0; pointers.shift()) {
        // Llamo al callback con el valor de cada puntero
        cb(pointers[0].value);
        // Y si tubiera derecha o izquierda lo agrego al array
        if(pointers[0].left) pointers.push(pointers[0].left)
        if(pointers[0].right) pointers.push(pointers[0].right)
    }
}

module.exports = {
    Queue,
    BinarySearchTree
};