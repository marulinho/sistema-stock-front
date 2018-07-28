import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { MdSnackBar } from '@angular/material';
import { ModuloSeguridadService } from '../../moludo.seguridad.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';

@Component({
    selector: 'app-modificar-contrasenia',
    templateUrl: './modificar.contrasenia.compontent.html',
    styleUrls: ['./modificar.contrasenia.component.css']

})

export class ModificarContraseniaComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    id_usuario = JSON.parse(localStorage.getItem('idUsuario'));
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_modificar_contrasenia = Constantes.LABEL_CAMBIAR_CONTRASENIA;
    label_datos_nueva_contrasenia = Constantes.LABEL_DATOS_NUEVA_CONTRASENIA;
    label_contrasenia_actual = Constantes.LABEL_CONTRASENIA_ACTUAL;
    label_contrasenia_nueva = Constantes.LABEL_CONTRASENIA_NUEVA;
    label_repetir_contrasenia = Constantes.LABEL_REPETIR_CONTRASENIA;
    boton_salir = Constantes.BOTON_SALIR;
    boton_modificar = Constantes.BOTON_MODIFICAR;
    errorMessage: string = "";
    passwordVieja: string;
    password1: string;
    password2: string;

    constructor(private router: Router,
        private moduloSeguridad: ModuloSeguridadService,
        private snackBar: MdSnackBar,
        private appService: AppService) {
        appService.getState().topnavTitle = Constantes.LABEL_MODIFICAR_CONTRASENIA;;
    }

    ngOnInit() { }

    apretarModificarContrasenia() {
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.passwordVieja,this.password1,this.password2);
        if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
                this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else {
            if (this.password1 != this.password2) {
                this.errorMessage = Constantes.ERROR_CONTRASENIAS_DISTINTAS;
            }
            else {
                if (this.password1 == this.passwordVieja){
                    this.errorMessage = Constantes.ERROR_CONTRASENIAS_IGUAL;
                }
                else{
                    this.moduloSeguridad.modificarContrasenia(this.id_usuario,this.passwordVieja,this.password1)
                        .then(
                            response=>{ 
                                this.router.navigate([Constantes.URL_LOGIN]);
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_MODIFICACION_EXITOSA, Constantes.MENSAJE_OK, {duration: 3000,});
                            }
                        )
                        .catch(
                            error=>{
                                this.errorMessage = error.error_description;
                            }
                        );
                }
                
            }
        }
    }

    apretarSalir(){
        this.router.navigate([Constantes.URL_PERFIL]);
    }
}
