/* eslint-disable no-useless-escape */

export default {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    phone: /^[\d\(\) +-]+$/,
    text: /^'*[a-zA-Z\s][a-zA-Z'\s]*$/,
    url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    twoDecimal: /^\d+(\.\d{1,2})?$/,
    personName: /^[a-zA-Z0-9.'_]{2,}$/,
    password: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])((?=.*[a-zA-Z])|(?=.*\d+)).*$/,
    image: /\.(gif|jpg|jpeg|tiff|png)$/i,
    thousandsDelimiter: /\B(?=(\d{3})+(?!\d))/g,
    browserLangDelimiter: /[_-]+/,
    positiveNumber: /^\+?(0|[1-9]\d*)$/,
    characterAndNumber: /^[a-zA-Z0-9]+$/,
    number: /^\d+$/,
    isHighlighted: /<em>.+<\/em>/i,
    upperCaseAndNumber: /^[A-Z0-9]*$/,
    allSymbols: /^.+$/,
};
