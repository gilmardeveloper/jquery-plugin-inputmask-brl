/**
 *  @author Gilmar Carlos
 *  
 *  @description Plugin para mascarar dados de um input no formato de moeda BRL
 *  @requires jquery.js
 * 
 *  
 */

var store = '';

 /**
  * @method mask()
  * @description binding do plugin
  * @param {Object} selector elemento do HTML 
  */
$.fn.mask = function () {

    var symbol = $(this).attr('data-symbol');
    this.on('keyup', (event) => init(this, symbol));
    this.blur(() => store = '');

};

/**
  * @method init()
  * @description inicializa as funções 
  * @param {Object} element elemento do HTML 
  * @param {String} symbol valor do atributo data-symbol especificado no elemento HTML 
  */
function init(element, symbol) {

    var value = validate(event, element);
    var comma = value.search(/,/g);
    var point = value.search(/\./g);
    var verificador = value.charAt(value.length - 1);

    symbol = parse(symbol);

    value = value.replace(symbol, '');

    if (verificador.search(/\D/g) != -1) {
        value = value.substring(0, value.length - 1);
    }
        
    value = commaManager(value);

    value = pointManager(value, comma, point, symbol);

    element.val(changeElementValue(symbol, value));

    store = value;
};

/**
  * @method changeElementValue()
  * @description altera o valor do elemento HTML 
  * @param {String} symbol valor do atributo data-symbol especificado no elemento HTML 
  * @param {String} value valor do elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function changeElementValue(symbol, value) {
    if (value.length == 0) {
        return '';
    } else {
        return symbol + value;
    }
};

/**
  * @method parse()
  * @description faz a conversão do simbolo para String, caso o atributo não tenha sido especificado 
  * @param {String} symbol valor do atributo data-symbol especificado no elemento HTML 
  * @return {String} valor do atributo data-symbol especificado no elemento HTML 
  */
function parse(symbol) {
    if (symbol == undefined) {
        return '';
    } else {
        return symbol;
    }
};

/**
  * @method commaManager()
  * @description insere ou remove vírgulas no valor 
  * @param {String} value valor do elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function commaManager(value) {
    var comma = value.search(/,/g);

    if (value.length > 2) {
        if (comma >= -1) {
            value = addComma(value);
        }
    }


    if (value.length == 3 && comma == 1) {
        value = removeComma(value);
    }

    return value;
};

/**
  * @method addComma()
  * @description insere vírgulas no valor 
  * @param {String} value valor do elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function addComma(value) {
    value = value.replace(/,/g, '');
    value = value.substring(0, value.length - 2) + ',' + value.substring(value.length - 2, value.length);
    return value;
};

/**
  * @method removeComma()
  * @description remove vírgulas do valor 
  * @param {String} value valor do atributo data-symbol especificado no elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function removeComma(value) {
    value = value.substring(1, value.length);
    return value;
};

/**
  * @method pointManager()
  * @description insere ou remove pontos no valor 
  * @param {String} value valor do elemento HTML 
  * @param {String} comma posição no valor do elemento HTML 
  * @param {String} point posição no valor do elemento HTML 
  * @param {String} symbol valor do atributo data-symbol especificado no elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function pointManager(value, comma, point, symbol) {

    if (comma > -1) {

        if(value.length >= 7 && value.length - (comma - symbol.length) == 3){
            value = addPoint(value, comma - symbol.length);
        }

        if (value.length >= 7 && value.length - comma == (4 - symbol.length)) {
            value = addPoint(value, comma - symbol.length);
        }

        if (point > -1 && value.length - comma == (2 - symbol.length)) {
            value = removePoint(value);
        }

        if (point > -1 && value.length - comma == (3 - symbol.length)) {
            value = removePoint(value);
        }
    }

    return value;

};

/**
  * @method addPoint()
  * @description insere pontos no valor 
  * @param {String} value valor do elemento HTML 
  * @param {String} comma posição no valor do elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function addPoint(value, comma) {

    var left = '';
    var right = '';

    left = value.substring(0, comma + 1);
    right = value.substring(comma + 1, value.length);
    left = left.replace(/\./g, '');

    var temporary = '';
    var count = 0;
    for (var i = left.length - 1; i >= 0; i--) {
        temporary = left.charAt(i) + temporary;
        count++;
        if (count == 3 && i > 0) {
            temporary = '.' + temporary;
            count = 0;
        }
    }
    value = temporary + right;

    return value;

};

/**
  * @method removePoint()
  * @description remove pontos no valor 
  * @param {String} value valor do elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function removePoint(value) {

    var left = '';
    var right = '';

    value = value.replace(/\./g, '');
    left = value.substring(0, value.length - 3);
    right = value.substring(value.length - 3, value.length);

    var temporary = '';
    var count = 0;

    for (var i = left.length - 1; i >= 0; i--) {
        temporary = left.charAt(i) + temporary;
        count++;
        if (count == 3 && i > 0) {
            temporary = '.' + temporary;
            count = 0;
        }
    }
    value = temporary + right;
    return value;
};

/**
  * @method validate()
  * @description valida a entrada de dados 
  * @param {Object} event evento do elemento HTML 
  * @param {Object} element elemento do HTML
  * @return {String} valor do elemento HTML  
  */
function validate(event, element) {
    if (event.key.search(/[\d]/g) != -1) {
        return element.val();
    } else if (event.key == 'Backspace') {
        return element.val();
    } else if (event.key == 'Delete') {
        return element.val();
    } else {
        return store;
    }
};