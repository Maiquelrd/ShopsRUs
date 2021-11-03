export function DivideString(string,separador) {
    return string.split(separador);
 }

 export function UpperCase(string) {
    if (typeof string === 'string' || string instanceof String){
        return string.toUpperCase();
    }
    else{
        return string;
    }
 }