import { Constantes } from './constantes';

export class Utils{

    verificarDatosIncompletos(atributos){
        let longitud  = atributos.length;
        for(var i = 0; i<longitud; i++){
            if(atributos[i] == '' || atributos[i] == null){
               return true; 
            }
        }
    }

    limpiarArray(atributos){
        atributos = [];
        return atributos;
    }

    compararValores(operador,atributo1,atributo2){
        if(operador == Constantes.OPERADOR_IGUAL){
            if(atributo1==atributo2){
                return true;
            }
            else{
                return false;
            }
        }
        if(operador == Constantes.OPERADOR_MAYOR){
            if(atributo1>atributo2){
                return true;
            }
            else{
                return false;
            }
        }
        if(operador == Constantes.OPERADOR_MAYOR_IGUAL){
            if(atributo1>=atributo2){
                return true;
            }
            else{
                return false;
            }
        }
        if(operador == Constantes.OPERADOR_MENOR){
            if(atributo1<atributo2){
                return true;
            }
            else{
                return false;
            }
        }
        if(operador == Constantes.OPERADOR_MENOR_IGUAL){
            if(atributo1<=atributo2){
                return true;
            }
            else{
                return false;
            }
        }
        if(operador == Constantes.OPERADOR_DISTINTO){
            if(atributo1!=atributo2){
                return true;
            }
            else{
                return false;
            }
        }
    }
}