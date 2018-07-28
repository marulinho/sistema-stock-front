import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService, Categoria } from '../../modulo.configuracion.service';

@Component({
    selector: 'app-modificar-subcategoria',
    templateUrl: './modificar.subcategoria.component.html',
    styleUrls: ['./modificar.subcategoria.component.css']

})

export class ModificarSubCategoriaComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    label_modificar_subcategoria = Constantes.LABEL_MODIFICAR_SUBCATEGORIA;
    label_datos_subcategoria = Constantes.LABEL_DATOS_SUBCATEGORIA;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_codigo = Constantes.LABEL_CODIGO;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    boton_modificar = Constantes.BOTON_MODIFICAR;
    boton_salir = Constantes.BOTON_SALIR;

    errorMessage: string = "";
    codigo : number;
    nombre: string;
    descripcion: string;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private moduloConfiguracion: ModuloConfiguracionService,
        private appService: AppService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) {

        this.route.params.subscribe(params => {
        this.codigo = (params['id_subcategoria'])
        });
        this.obtenerSubCategoria();
        appService.getState().topnavTitle = Constantes.LABEL_MODIFICAR_SUBCATEGORIA;

    }

    ngOnInit() {

    }

    obtenerSubCategoria(){
        this.moduloConfiguracion.obtenerSubCategoriaId(this.codigo)
        .then(
            response => {
                this.nombre = response.datos_operacion['nombre'];
                this.descripcion = response.datos_operacion['descripcion'];
                this.codigo = response.datos_operacion['codigo'];
            }
        )
        .catch(
            error => {
                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                    this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                    this.router.navigate([Constantes.URL_LOGIN]);
                }
                else{
                    this.errorMessage = error.error_description;
                }

            }
        );
    }


    apretarModificarSubCategoria() {
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.nombre);
        if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.errorMessage = "";

            this.moduloConfiguracion.modificarSubCategoria(this.codigo, this.nombre, this.descripcion)
                .then(
                    response => {
                        this.router.navigate([Constantes.URL_HOME_SUBCATEGORIA_DETALLE+'/'+this.codigo]);
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_MODIFICACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
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
        this.router.navigate([Constantes.URL_HOME_SUBCATEGORIA_DETALLE+'/'+this.codigo]);
    }
}
