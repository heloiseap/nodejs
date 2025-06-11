export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g 
    // depois dos dois pontos tem uma ou mais letras de a-z maiusculas ou minusculas /g global

    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)') 
    //um ou mais:letras numeros hifens
    //<id> da o nome para o parametro, <$1> primeiro retorno

    // console.log(Array.from(path.matchAll(routeParametersRegex)))

    // return new RegExp()
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`) 
    // ^ valida que começa com o regex, (?<query>)? 3o ? mostra que é opcional, $ precisa terminar com essa verificação, .* qqr caractere n vezes
    
    return pathRegex
}