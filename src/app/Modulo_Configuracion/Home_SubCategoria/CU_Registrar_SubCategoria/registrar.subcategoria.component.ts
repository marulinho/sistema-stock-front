import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService } from '../../modulo.configuracion.service'

@Component({
    selector: 'app-registrar-subcategoria',
    templateUrl: './registrar.subcategoria.component.html',
    styleUrls: ['./registrar.subcategoria.component.scss']

})

export class RegistrarSubCategoriaComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    errorMessage = '';
    label_registrar_subcategoria = Constantes.LABEL_REGISTRAR_SUBCATEGORIA;
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_datos_subcategoria = Constantes.LABEL_DATOS_SUBCATEGORIA;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;

    nombre: string;
    descripcion: string;

    constructor(private appService: AppService,
        private moduloConfiguracion: ModuloConfiguracionService,
        private snackBar: MdSnackBar,
        private router: Router) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_SUBCATEGORIA;
    }

    ngOnInit() {

    }


    apretarRegistrarSubCategoria() {
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.nombre);
        if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.errorMessage = "";

            this.moduloConfiguracion.registrarSubCategoria(this.nombre, this.descripcion)
                .then(
                    response => {
                        this.router.navigate([Constantes.URL_HOME_SUBCATEGORIA]);
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                    }
                )
                .catch(
                    error => {
                        if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                            this.router.navigate([Constantes.URL_LOGIN]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, { duration: 3000, });
                        }
                        else {
                            this.errorMessage = error.error_description;
                        }
                    }
                );
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_SUBCATEGORIA]);
    }


}



