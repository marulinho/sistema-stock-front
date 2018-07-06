import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { Constantes } from '../../Datos_Sistema/constantes';
import { Utils } from '../../Datos_Sistema/utils';
import { Usuario,PreguntaSeguridad,ModuloSeguridadService } from '../moludo.seguridad.service';

@Component({
    selector:'app-recuperar',
    templateUrl: './recuperar.cuenta.component.html',
    styleUrls:['./recuperar.cuenta.component.scss']
    
})

export class RecuperarCuentaComponent implements OnInit{

    label_usuario = Constantes.LABEL_USUARIO;
    label_pregunta = Constantes.LABEL_PREGUNTA_SEGURIDAD;
    label_respuesta_pregunta = Constantes.LABEL_RESPUESTA_PREGUNTA_SEGURIDAD;
    label_contrasenia = Constantes.LABEL_CONTRASENIA;
    label_repetir_contrasenia = Constantes.LABEL_REPETIR_CONTRASENIA;
    label_recuperar_cuenta = Constantes.LABEL_RECUPERAR_CUENTA;
    label_datos_personales = Constantes.LABEL_DATOS_PERSONALES;
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_datos_recuperacion = Constantes.LABEL_DATOS_RECUPERACION;
    label_paso_1 = Constantes.LABEL_PASO_1;
    label_paso_2 = Constantes.LABEL_PASO_2;
    label_paso_3 = Constantes.LABEL_PASO_3;

    boton_atras = Constantes.BOTON_ATRAS;
    boton_siguiente = Constantes.BOTON_SIGUIENTE;
    boton_recuperar = Constantes.BOTON_RECUPERAR_CUENTA;
    boton_salir = Constantes.BOTON_SALIR;

    snackBarRef: any;
    errorMessage: string;
    selectIndex: number = 0;
    usuario: string;
    id_usuario : number;
    password1: string;
    password2: string;
    nombrePregunta : string;
    id_pregunta: number;
    respuestaPregunta: string;
       
    arrayVerificar = [];
    arrayAtributos = [];
    utils =  new Utils();

    constructor(private appService: AppService,
                private moduloSeguridad : ModuloSeguridadService,
                private snackBar: MdSnackBar,
                private router:Router){
        this.appService.getState().pageFullscreen = true;

    }

    ngOnInit(){}

    ngOnDestroy(){
        this.appService.getState().pageFullscreen = false;
    }

    apretarSalir(){
        this.router.navigate([Constantes.URL_LOGIN]);
    }

    apretarAtrasRecuperar(){
        this.errorMessage = "";
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayAtributos = this.utils.limpiarArray(this.arrayAtributos);
        this.selectIndex = this.selectIndex - 1;
    }
    apretarNextRecuperar() {
        if (this.selectIndex == 0) {
            this.arrayAtributos.push(this.usuario);
            if (this.metodoVerificar(this.arrayAtributos) == true){
                this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
            }
            else {
                this.moduloSeguridad.obtenerUsuario(this.usuario)
                    .then(
                        response=>{
                            this.id_usuario = response.datos_operacion.id_usuario;
                            this.id_pregunta = response.datos_operacion.id_pregunta;
                            this.buscarPregunta(this.id_pregunta);
                            this.selectIndex = this.selectIndex + 1;
                        }
                    )
                    .catch(
                        error=>{
                            this.errorMessage = error.error_description;
                        }
                    );
                    
            }
        }
        if (this.selectIndex == 1) {
            this.arrayAtributos.push(this.usuario);
            if (this.metodoVerificar(this.arrayAtributos) == true){
                this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
            }
            else{
                this.selectIndex +=1;
            }
        }   
        
    }

    apretarRecuperarCuenta(){
        this.arrayAtributos.push(this.password1,this.password2);
        if (this.metodoVerificar(this.arrayAtributos) == true){
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else{
            if(this.utils.compararValores(Constantes.OPERADOR_DISTINTO,this.password1,this.password2) == true){
                this.errorMessage = Constantes.ERROR_CONTRASENIAS_DISTINTAS;
            }
            else{
                if(this.utils.compararValores(Constantes.OPERADOR_IGUAL,this.usuario,this.password1) == true){
                    this.errorMessage = Constantes.ERROR_USUARIO_CONTRASENIA_IGUAL;
                }
                else {
                    this.moduloSeguridad.recuperarCuenta(this.id_usuario,this.id_pregunta,this.respuestaPregunta,this.password1)
                    .then(
                        response=>{
                            this.router.navigate([Constantes.URL_LOGIN]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_RECUPERACION_EXITOSA, Constantes.MENSAJE_OK, {duration: 3000,});
                        }
                    )
                    .catch(
                        error=>{
                            this.errorMessage = error.error_description;
                        }
                    )
                }
            }
        }
    }

    metodoVerificar(arrayAtributos){
        let longitud = arrayAtributos.length;
        this.errorMessage = "";
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);

        for(var i = 0; i<longitud; i++){
            this.arrayVerificar.push(arrayAtributos[i]);
        }
        this.arrayAtributos=[];
        return this.utils.verificarDatosIncompletos(this.arrayVerificar);
    }

    buscarPregunta(id_pregunta){
        this.moduloSeguridad.obtenerPreguntaId(id_pregunta)
            .then(
                response=>{
                    this.nombrePregunta = response.datos_operacion.descripcion;
                }
            )
            .catch(
                error=>{
                    this.errorMessage = error.error_description;
                }
            )
    }
}

