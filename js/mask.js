/**
 *  @author Gilmar Carlos
 *  
 *  @description Plugin para mascarar dados de um input no formato de moeda BRL
 *  @requires jquery.js
 * 
 *  
 */

const NO_POSITION = -1;
const FIRST_POSITION = 0;
const SECOND_POSITION = 1;
const THIRD_POSITION = 2;
const FOURTH_POSITION = 3;
const FIFTH_POSITION = 4;

const ONE_POSITION = 1;
const TWO_POSITIONS = 2;
const THREE_POSITIONS = 3;
const FOUR_POSITIONS = 4;
const FIVE_POSITIONS = 5;
const SIX_POSITIONS = 6;
const SEVEN_POSITIONS = 7;
  
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
    var commaPosition = value.search(/,/g);
    var pointPosition = value.search(/\./g);
    const LAST_POSITION = value.length - 1;
    var verify = value.charAt(LAST_POSITION);
    
    
    symbol = parse(symbol);

    value = value.replace(symbol, '');

    if (verify.search(/\D/g) != NO_POSITION) {
        value = value.substring(FIRST_POSITION, LAST_POSITION);
    }
        
    value = commaManager(value);

    value = pointManager(value, commaPosition, pointPosition, symbol);

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
    if (value.length == FIRST_POSITION) {
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
    var commaPosition = value.search(/,/g);

    if (value.length > THIRD_POSITION) {
        if (commaPosition >= NO_POSITION) {
            value = addComma(value);
        }
    }


    if (value.length == FOURTH_POSITION && commaPosition == SECOND_POSITION) {
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
    value = value.substring(FIRST_POSITION, value.length - TWO_POSITIONS) + ',' + value.substring(value.length - TWO_POSITIONS, value.length);
    return value;
};

/**
  * @method removeComma()
  * @description remove vírgulas do valor 
  * @param {String} value valor do atributo data-symbol especificado no elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function removeComma(value) {
    value = value.substring(SECOND_POSITION, value.length);
    return value;
};

/**
  * @method pointManager()
  * @description insere ou remove pontos no valor 
  * @param {String} value valor do elemento HTML 
  * @param {String} commaPosition posição no valor do elemento HTML 
  * @param {String} pointPosition posição no valor do elemento HTML 
  * @param {String} symbol valor do atributo data-symbol especificado no elemento HTML 
  * @return {String} valor do elemento HTML 
  */
function pointManager(value, commaPosition, pointPosition, symbol) {

    if (commaPosition > NO_POSITION) {

        if(value.length >= SEVEN_POSITIONS && value.length - (commaPosition - symbol.length) == THREE_POSITIONS){
            value = addPoint(value, commaPosition - symbol.length);
        }

        if (value.length >= SEVEN_POSITIONS && value.length - commaPosition == (FOUR_POSITIONS - symbol.length)) {
            value = addPoint(value, commaPosition - symbol.length);
        }

        if (pointPosition > NO_POSITION && value.length - commaPosition == (TWO_POSITIONS - symbol.length)) {
            value = removePoint(value);
        }

        if (pointPosition > NO_POSITION && value.length - commaPosition == (THREE_POSITIONS - symbol.length)) {
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
function addPoint(value, commaPosition) {

    var left = '';
    var right = '';

    left = value.substring(FIRST_POSITION, commaPosition + ONE_POSITION);
    right = value.substring(commaPosition + ONE_POSITION, value.length);
    left = left.replace(/\./g, '');

    var temporary = '';
    var count = FIRST_POSITION;
    for (var i = left.length - ONE_POSITION; i >= FIRST_POSITION; i--) {
        temporary = left.charAt(i) + temporary;
        count++;
        if (count == FOURTH_POSITION && i > FIRST_POSITION) {
            temporary = '.' + temporary;
            count = FIRST_POSITION;
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
    left = value.substring(FIRST_POSITION, value.length - THREE_POSITIONS);
    right = value.substring(value.length - THREE_POSITIONS, value.length);

    var temporary = '';
    var count = FIRST_POSITION;

    for (var i = left.length - ONE_POSITION; i >= FIRST_POSITION; i--) {
        temporary = left.charAt(i) + temporary;
        count++;
        if (count == FOURTH_POSITION && i > FIRST_POSITION) {
            temporary = '.' + temporary;
            count = FIRST_POSITION;
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
    if (event.key.search(/[\d]/g) != NO_POSITION) {
        return element.val();
    } else if (event.key == 'Backspace') {
        return element.val();
    } else if (event.key == 'Delete') {
        return element.val();
    } else {
        return store;
    }
};