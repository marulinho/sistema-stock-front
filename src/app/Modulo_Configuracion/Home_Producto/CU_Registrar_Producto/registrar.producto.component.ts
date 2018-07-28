import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService, UnidadMedida } from '../../modulo.configuracion.service'

@Component({
    selector: 'app-registrar-producto',
    templateUrl: './registrar.producto.component.html',
    styleUrls: ['./registrar.producto.component.scss']

})

export class RegistrarProductoComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    errorMessage = '';
    label_registrar_producto = Constantes.LABEL_REGISTRAR_PRODUCTO;
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_datos_producto = Constantes.LABEL_DATOS_PRODUCTO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_unidad_medida = Constantes.LABEL_UNIDAD_MEDIDA;
    label_respuesta_unidad_medida = Constantes.LABEL_UNIDAD_MEDIDA;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;

    nombre: string;
    marca: string;
    medida: number;
    id_unidad_medidad: number;
    unidades_medidas: UnidadMedida;

    constructor(private appService: AppService,
        private moduloConfiguracion: ModuloConfiguracionService,
        private snackBar: MdSnackBar,
        private router: Router) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_PRODUCTO;
    }

    ngOnInit() {
        this.moduloConfiguracion.obtenerUnidadesMedidas()
            .then(
                response=>{
                    this.unidades_medidas = response.datos_operacion;
                }
            )
            .catch(
                error=>{
                    this.errorMessage = error.error_description;
                }
            )
    }


    apretarRegistrarProducto() {
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.nombre,this.marca,this.medida);
        if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.errorMessage = "";

            this.moduloConfiguracion.registrarProducto(this.nombre, this.marca,this.medida,this.id_unidad_medidad)
                .then(
                    response => {
                        this.router.navigate([Constantes.URL_HOME_PRODUCTO]);
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
        this.router.navigate([Constantes.URL_HOME_PRODUCTO]);
    }


}



