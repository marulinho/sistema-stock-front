import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloSeguridadService, Usuario, PreguntaSeguridad, RespuestaSeguridad } from '../../moludo.seguridad.service';

@Component({
    selector:'app-modificar-usuario',
    templateUrl: './modificar.usuario.component.html',
    styleUrls:['./modificar.usuario.component.css']
    
})

export class ModificarUsuarioComponent implements OnInit{
    
    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    label_modificar_usuario = Constantes.LABEL_MODIFICAR_USUARIO;
    label_datos_personales = Constantes.LABEL_DATOS_PERSONALES;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_apellido = Constantes.LABEL_APELLIDO;
    label_pregunta = Constantes.LABEL_PREGUNTA_SEGURIDAD;
    label_respuesta_pregunta = Constantes.LABEL_RESPUESTA_PREGUNTA_SEGURIDAD;
    boton_modificar = Constantes.BOTON_MODIFICAR;
    boton_salir = Constantes.BOTON_SALIR;
    tooltipEditarUsuario=Constantes.LABEL_EDITAR_USUARIO;

    id_usuario = JSON.parse(localStorage.getItem('idUsuario'));
    errorMessage: string="";
    usuarioActual: Usuario;
    preguntaActual: PreguntaSeguridad;
    respuestaActual: RespuestaSeguridad;
    nombre: string;
    apellido: string;
    pregunta: string;
    id_pregunta: number;
    respuestaPregunta: string;
   

    constructor(private router:Router,
                private moduloSeguridad:ModuloSeguridadService,
                private appService:AppService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog){
    appService.getState().topnavTitle = Constantes.LABEL_MODIFICAR_USUARIO;
        
    }

    ngOnInit(){
        this.moduloSeguridad.obtenerUsuarioId(this.id_usuario)
            .then(
                response => {
                    this.usuarioActual = response.datos_operacion;
                    this.nombre=this.usuarioActual['nombre'];
                    this.apellido=this.usuarioActual['apellido'];
                    this.id_pregunta=this.usuarioActual['id_pregunta'];
                    this.buscarPregunta();
                    this.buscarRespuestaPregunta();
                }
            )
            .catch(
                error => {
                    if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                        this.router.navigate([Constantes.URL_LOGIN]);
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                    }
                    else{
                        this.errorMessage = error.error_description;
                    }
                    
                }
            );
    }

    buscarPregunta(){
        this.moduloSeguridad.obtenerPreguntaId(this.id_pregunta)
            .then(
                response=>{
                    this.preguntaActual = response.datos_operacion;
                    this.pregunta = this.preguntaActual['descripcion'];
                }
            )
            .catch(
                error=>{
                    this.errorMessage = error.error_description;
                }
            );
    }

    buscarRespuestaPregunta(){
        this.moduloSeguridad.obtenerRespuestaPreguntaUsuario(this.id_usuario,this.id_pregunta)
            .then(
                response=>{
                    this.respuestaActual = response.datos_operacion;
                    this.respuestaPregunta = this.respuestaActual['descripcion'];
                }
            )
            .catch(
                error=>{
                    this.errorMessage = error.error_description;
                }
            );
    }


    apretarModificarUsuario(){
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.nombre,this.apellido,this.respuestaPregunta);
            if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
                this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
            }
            else {
                this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
                this.errorMessage = "";

                this.moduloSeguridad.modificarUsuario(this.id_usuario,this.nombre,this.apellido,this.respuestaPregunta)
                    .then(
                        response=>{
                            this.router.navigate([Constantes.URL_PERFIL]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_MODIFICACION_EXITOSA, Constantes.MENSAJE_OK, {duration: 3000,});
                        }
                    )
                    .catch(
                        error=>{
                            if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                                this.router.navigate([Constantes.URL_LOGIN]);
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                            }
                            else{
                                this.errorMessage=error.error_description;
                            }
                        }
                    );
            }
    }
    
    apretarSalir(){
        this.router.navigate([Constantes.URL_PERFIL]);
        
      }    
}
