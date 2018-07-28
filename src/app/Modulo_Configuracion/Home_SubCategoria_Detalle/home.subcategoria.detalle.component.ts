import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService, SubCategoria} from '../modulo.configuracion.service';

@Component({
    selector:'homeSubCategoriaDetalle',
    templateUrl: './home.subcategoria.detalle.component.html',
    styleUrls:['../Home_SubCategoria_Detalle/home.subcategoria.detalle.component.css']
    
})

export class HomeSubCategoriaDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipEditarSubCategoria = Constantes.LABEL_EDITAR_SUBCATEGORIA;
    tooltipEliminarSubCategoria = Constantes.LABEL_ELIMINAR_SUBCATEGORIA;
    position = 'above';
    codigo : number;
    selectedOption: string;
    label_codigo_subcategoria = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    label_subcategoria_detalle = Constantes.LABEL_SUBCATEGORIA_DETALLE;
    subcategoria : SubCategoria;

    errorMessageProducto = '';
    label_accion = Constantes.LABEL_ACCION;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    tooltipDesAsignarProducto = Constantes.LABEL_DESASGINAR_PRODUCTO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    label_producto = Constantes.LABEL_PRODUCTOS_SUBCATEGORIA;
    label_detalle_producto = Constantes.DESCRIPCION_PRODUCTO_CATEGORIA;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    productos = [];
    productos_temp = [];

    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo = (params['id_subcategoria']) 
                });   
                this.obtenerSubCategoria();
                this.obtenerProductos();
                appService.getState().topnavTitle = Constantes.LABEL_SUBCATEGORIA_DETALLE;
    }

    ngOnInit(){}

    obtenerSubCategoria(){
        this.moduloConfiguracion.obtenerSubCategoriaId(this.codigo)
        .then(
            response => {
                this.subcategoria = response.datos_operacion;
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

    obtenerProductos(){
        this.moduloConfiguracion.obtenerProductosSubCategoriaId(this.codigo)
            .then(
                response=>{
                    this.productos = response.datos_operacion;
                    this.productos_temp = [...response.datos_operacion];
                }
            )
            .catch(
                error=>{
                    this.errorMessageProducto = error.error_description;
                }
            );
    }

    apretarEliminarSubCategoria(){
        this.openDialogSubCategoria(Constantes.TITLE_ELIMINAR_SUBCATEGORIA,Constantes.PREGUNTA_ELIMINAR_SUBCATEGORIA);
    }

    openDialogSubCategoria(title,description) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = description ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.eliminarSubCategoria(this.codigo)
                        .then(
                        response => {
                            this.router.navigate([Constantes.URL_HOME_SUBCATEGORIA]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_SUBCATEGORIA_ELIMINADA, Constantes.MENSAJE_OK, {duration: 3000,});
                        }
                        )
                        .catch(
                            error => {
                                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                                    this.router.navigate([Constantes.URL_LOGIN]);
                                }
                                else{
                                    this.errorMessage = error.error_description;
                                }
                            }
                        );
                }
            });
        }

    apretarEditarSubCategoria(){
        this.router.navigate([Constantes.URL_EDITAR_SUBCATEGORIA+this.codigo+'/']);
    }

    apretarAgregarProducto(){
        this.router.navigate([Constantes.URL_ASIGNAR_PRODUCTO_SUBCATEGORIA+this.codigo+'/'])
    }

    apretarDesAsignarProducto(codigo_producto){
        this.openDialogProducto(Constantes.TITLE_DESASIGNAR_PRODUCTO,Constantes.PREGUNTA_DESASIGNAR_PRODUCTO,codigo_producto);
    }

    openDialogProducto(title,description,codigo_producto) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = description ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.desasignarProductoSubCategoria(this.codigo,codigo_producto)
                        .then(
                        response => {
                            this.obtenerProductos();
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_DESASIGNACION_EXISTOSA, Constantes.MENSAJE_OK, {duration: 3000,});
                        }
                        )
                        .catch(
                            error => {
                                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                                    this.router.navigate([Constantes.URL_LOGIN]);
                                }
                                else{
                                    this.errorMessage = error.error_description;
                                }
                            }
                        );
                }
            });
        }

    updateFilterProducto(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_temp.filter(function (d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos = temp;
    }
    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_SUBCATEGORIA]);
    }
    
    
}


