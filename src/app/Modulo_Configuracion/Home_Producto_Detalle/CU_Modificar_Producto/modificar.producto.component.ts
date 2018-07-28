import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService, UnidadMedida } from '../../modulo.configuracion.service';

@Component({
    selector: 'app-modificar-producto',
    templateUrl: './modificar.producto.component.html',
    styleUrls: ['./modificar.producto.component.css']

})

export class ModificarProductoComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    label_modificar_producto = Constantes.LABEL_MODIFICAR_PRODUCTO;
    label_datos_producto = Constantes.LABEL_DATOS_PRODUCTO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_codigo = Constantes.LABEL_CODIGO;
    label_marca = Constantes.LABEL_MARCA;
    label_unidad_medida = Constantes.LABEL_UNIDAD_MEDIDA;
    label_respuesta_unidad_medida = Constantes.LABEL_MEDIDA;
    label_medida = Constantes.LABEL_MEDIDA;
    boton_modificar = Constantes.BOTON_MODIFICAR;
    boton_salir = Constantes.BOTON_SALIR;

    errorMessage: string = "";
    codigo : number;
    nombre: string;
    marca: string;
    medida: number;
    id_unidad_medidad: number;
    unidades_medidas: UnidadMedida;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private moduloConfiguracion: ModuloConfiguracionService,
        private appService: AppService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) {

        this.route.params.subscribe(params => {
        this.codigo = (params['id_producto'])
        });
        this.obtenerProducto();
        appService.getState().topnavTitle = Constantes.LABEL_MODIFICAR_PRODUCTO;

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

    obtenerProducto(){
        this.moduloConfiguracion.obtenerProductoId(this.codigo)
        .then(
            response => {
                this.nombre = response.datos_operacion['nombre'];
                this.marca = response.datos_operacion['marca'];
                this.codigo = response.datos_operacion['codigo'];
                this.medida = response.datos_operacion['medida'];
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


    apretarModificarProducto() {
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.nombre,this.marca,this.medida);
        if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.errorMessage = "";

            this.moduloConfiguracion.modificarProducto(this.codigo,this.nombre,this.marca,this.id_unidad_medidad,this.medida)
                .then(
                    response => {
                        this.router.navigate([Constantes.URL_HOME_PRODUCTO_DETALLE+'/'+this.codigo]);
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
        this.router.navigate([Constantes.URL_HOME_PRODUCTO_DETALLE+'/'+this.codigo]);
    }
}
