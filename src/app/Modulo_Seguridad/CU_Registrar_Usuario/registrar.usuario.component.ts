import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { Constantes } from '../../Datos_Sistema/constantes';
import { Utils } from '../../Datos_Sistema/utils';
import { PreguntaSeguridad,ModuloSeguridadService } from '../moludo.seguridad.service';

@Component({
    selector:'app-registrar',
    templateUrl: './registrar.usuario.component.html',
    styleUrls:['./registrar.usuario.component.scss']
    
})

export class RegistrarUsuarioComponent implements OnInit, OnDestroy{
    
    label_nombre = Constantes.LABEL_NOMBRE;
    label_apellido = Constantes.LABEL_APELLIDO;
    label_usuario = Constantes.LABEL_USUARIO;
    label_contrasenia = Constantes.LABEL_CONTRASENIA;
    label_repetir_contrasenia = Constantes.LABEL_REPETIR_CONTRASENIA;
    label_pregunta = Constantes.LABEL_PREGUNTA_SEGURIDAD;
    label_respuesta_pregunta = Constantes.LABEL_RESPUESTA_PREGUNTA_SEGURIDAD;
    label_registrar_usuario = Constantes.LABEL_REGISTRAR_USUARIO;
    label_datos_personales = Constantes.LABEL_DATOS_PERSONALES;
    label_datos_usuario = Constantes.LABEL_DATOS_USUARIO;
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_resumen = Constantes.LABEL_RESUMEN;
    label_paso_1 = Constantes.LABEL_PASO_1;
    label_paso_2 = Constantes.LABEL_PASO_2;
    label_paso_3 = Constantes.LABEL_PASO_3;

    boton_atras = Constantes.BOTON_ATRAS;
    boton_siguiente = Constantes.BOTON_SIGUIENTE;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;

    snackBarRef: any;
    errorMessage: string;
    selectIndex: number = 0;
    nombre: string;
    apellido: string;
    usuario: string;
    password1: string;
    password2: string;
    preguntasSeguridad : PreguntaSeguridad;
    id_pregunta: number;
    nombrePregunta : string;
    respuestaPregunta: string;
       
    arrayVerificar = [];
    utils =  new Utils();

    constructor(private appService: AppService,
                private moduloSeguridad : ModuloSeguridadService,
                private snackBar: MdSnackBar,
                private router:Router){
        this.appService.getState().pageFullscreen = true;

    }

    ngOnInit(){
        this.moduloSeguridad.obtenerPreguntasSeguridad()
            .then(
                response => {
                    this.preguntasSeguridad = response.datos_operacion;
                }
            )
            .catch(
                error => {
                    this.errorMessage = error.error_description;
                }
            );
    }

    ngOnDestroy(){
        this.appService.getState().pageFullscreen = false;
    }

    apretarPregunta(){
        this.moduloSeguridad.buscarPreguntaDescripcion(this.nombrePregunta)
            .then(
                response => {
                    this.id_pregunta = response.datos_operacion.id_pregunta;
                }
            )
            .catch(
                error => {
                    this.errorMessage = error.error_description;
                }
            );
    }

    apretarRegistrarUsuario() {
        this.moduloSeguridad.registrarUsuario(this.nombre, this.apellido, this.usuario, this.password1, this.id_pregunta, this.respuestaPregunta)
          .then(
            response => {
                this.router.navigate([Constantes.URL_LOGIN]);
                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_EXITOSA, Constantes.MENSAJE_OK, {duration: 3000,});
            }
          )
          .catch(
            error => {
                this.errorMessage = error.error_description;
            }
          );
    }

    apretarSalir(){
        this.router.navigate([Constantes.URL_LOGIN]);
    }

    apretarAtrasRegistrar(){
        this.errorMessage = "";
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.selectIndex = this.selectIndex - 1;
    }
    apretarNextRegistrar() {
        if (this.selectIndex == 0) {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.arrayVerificar.push(this.nombre,this.apellido);
            if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
                this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
            }
            else {
                this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
                this.selectIndex = this.selectIndex + 1;
                this.errorMessage = "";
            }
        }
        else{
            if (this.selectIndex == 1) {
                this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
                this.arrayVerificar.push(this.usuario,this.password1,this.password2,this.respuestaPregunta,this.id_pregunta);
                if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
                    this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
                }
                else {
                    if (this.password1 != this.password2) {
                        this.errorMessage = Constantes.ERROR_CONTRASENIAS_DISTINTAS;
                    }
                    else {
                        if (this.usuario == this.password1) {
                        this.errorMessage = Constantes.ERROR_USUARIO_CONTRASENIA_IGUAL;
                        }
                        else {
                            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
                            this.selectIndex = this.selectIndex + 1;
                            this.errorMessage = "";
                        }
                    }
                }
            }
        }
    }
         
}



