import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';
import { ModuloConfiguracionService } from '../../modulo.configuracion.service';

@Component({
    selector: 'app-asignar-producto-categoria',
    templateUrl: './asignar.productocategoria.component.html',
    styleUrls: ['./asignar.productocategoria.component.css']

})

export class AsignarProductoCategoriaComponent implements OnInit {

    snackBarRef: any;
    errorMessage: string = "";
    selectedOption: string;
    label_productos = Constantes.LABEL_PRODUCTO;
    label_detalle_productos = Constantes.DESCRIPCION_PRODUCTOS_NO_CATEGORIA;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca= Constantes.LABEL_MARCA;
    label_medida= Constantes.LABEL_MEDIDA;
    label_accion = Constantes.LABEL_ACCION;
    tooltipAsignarProducto = Constantes.LABEL_ASIGNAR_PRODUCTO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    productos = [];
    productos_temp = [];
    codigo_categoria: number;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private moduloConfiguracion: ModuloConfiguracionService,
        private appService: AppService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) {

        this.route.params.subscribe(params => {
            this.codigo_categoria = (params['id_categoria'])
        });
        this.obtenerProductos();
        appService.getState().topnavTitle = Constantes.LABEL_ASIGNAR_PRODUCTO;

    }

    ngOnInit() {

    }

    obtenerProductos() {
        this.moduloConfiguracion.obtenerProductosNoCategoriaId(this.codigo_categoria)
            .then(
                response => {
                    this.productos = response.datos_operacion;
                    this.productos_temp = [...response.datos_operacion];
                }
            )
            .catch(
                error => {
                    if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, { duration: 3000, });
                        this.router.navigate([Constantes.URL_LOGIN]);
                    }
                    else {
                        this.errorMessage = error.error_description;
                    }

                }
            );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_temp.filter(function (d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos = temp;
    }

    openDialog(codigo_producto) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ASIGNAR_PRODUCTO;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ASIGNAR_PRODUCTO;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.asignarProductoCategoria(this.codigo_categoria,codigo_producto)
                        .then(
                            response => {
                                this.router.navigate([Constantes.URL_HOME_CATEGORIA_DETALLE + '/' + this.codigo_categoria]);
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_ASIGNACION_EXISTOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                            }
                        )
                        .catch(
                            error => {
                                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                                    this.router.navigate([Constantes.URL_LOGIN]);
                                }
                                else {
                                    this.errorMessage = error.error_description;
                                }
                            }
                        );
                }
            });
    }


    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_CATEGORIA_DETALLE + '/' + this.codigo_categoria]);
    }
}
