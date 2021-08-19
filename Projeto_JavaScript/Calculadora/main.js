
function calcular(tipo, valor){
    // var calculo =  [ float , string , float]
    if (tipo == 'acao'){
        switch(valor){
            case 'c':
                document.getElementById('resultado').value = ''
                break;

            default:
                document.getElementById('resultado').value += ' ' + valor + ' '
                break;
            case '=':
                var campo_valor = eval(document.getElementById('resultado').value) 
                document.getElementById('resultado').value = campo_valor
                break;
        }
 
    }else if(valor){
        document.getElementById('resultado').value += valor
    }

}