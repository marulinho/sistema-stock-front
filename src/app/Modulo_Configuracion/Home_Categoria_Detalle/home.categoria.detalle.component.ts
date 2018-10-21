import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogYesNoComponent } from '../../Datos_Sistema/dialog-yes-no/dialog.yes.no.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService, Categoria} from '../modulo.configuracion.service';

@Component({
    selector:'homeCategoriaDetalle',
    templateUrl: './home.categoria.detalle.component.html',
    styleUrls:['../Home_Categoria_Detalle/home.categoria.detalle.component.css']
    
})

export class HomeCategoriaDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipEditarCategoria = Constantes.LABEL_EDITAR_CATEGORIA;
    tooltipEliminarCategoria = Constantes.LABEL_ELIMINAR_CATEGORIA;
    tooltipHabilitarCategoria = Constantes.LABEL_HABILITAR_CATEGORIA;
    position = 'above';
    codigo : number;
    estado : string;
    modificar_categoria : boolean = false;
    selectedOption: string;
    label_codigo_categoria = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    label_categoria_detalle = Constantes.LABEL_CATEGORIA_DETALLE;
    categoria : Categoria;

    errorMessageSubCategoria = '';
    label_accion = Constantes.LABEL_ACCION;
    tooltipAgregarSubCategoria = Constantes.LABEL_AGREGAR_SUBCATEGORIA;
    tooltipDesAsignarSubCategoria = Constantes.LABEL_DESASGINAR_SUBCATEGORIA;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    label_subcategoria = Constantes.LABEL_SUBCATEGORIASUBCATEGORIAS_CATEGORIA;
    label_detalle_subcategoria = Constantes.DESCRIPCION_SUB_CATEGORIA_CATEGORIA;
    label_tabla_subcategoria = Constantes.LABEL_BUSCAR_TABLA_SUBCATEGORIA;
    label_nombre_subcategoria = Constantes.LABEL_NOMBRE;
    label_descripcion_subcategoria = Constantes.LABEL_DESCRIPCION;
    label_codigo_subcategoria = Constantes.LABEL_CODIGO;
    label_buscar_subcategoria = Constantes.LABEL_BUSCAR_SUBCATEGORIA;
    subcategorias = [];
    subcategorias_temp = [];

    errorMessageProducto = '';
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    tooltipDesAsignarProducto = Constantes.LABEL_DESASGINAR_PRODUCTO;
    label_producto = Constantes.LABEL_PRODUCTOS_CATEGORIA;
    label_detalle_producto = Constantes.DESCRIPCION_PRODUCTO_CATEGORIA;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_nombre_producto = Constantes.LABEL_NOMBRE;
    label_marca_producto = Constantes.LABEL_MARCA;
    label_codigo_producto = Constantes.LABEL_CODIGO;
    label_medida_producto = Constantes.LABEL_MEDIDA;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    productos = [];
    productos_temp = [];

    

    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo = (params['id_categoria']) 
                });    
                this.obtenerCategoria();
                this.obtenerSubCategorias();
                this.obtenerProductos();
                appService.getState().topnavTitle = Constantes.LABEL_CATEGORIA_DETALLE;
    }

    ngOnInit(){}

    obtenerCategoria(){
        this.moduloConfiguracion.obtenerCategoriaId(this.codigo)
        .then(
            response => {
                this.categoria = response.datos_operacion;
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


    obtenerSubCategorias(){
        this.moduloConfiguracion.obtenerSubCategoriasCategoriaId(this.codigo)
            .then(
                response=>{
                    this.subcategorias = response.datos_operacion;
                    this.subcategorias_temp = [...response.datos_operacion];
                }
            )
            .catch(
                error=>{
                    this.errorMessageSubCategoria = error.error_description;
                }
            );
    }


    obtenerProductos(){
        this.moduloConfiguracion.obtenerProductosCategoriaId(this.codigo)
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

    apretarEliminarCategoria(){
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ELIMINAR_CATEGORIA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ELIMINAR_CATEGORIA ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.eliminarCategoria(this.codigo)
                        .then(
                        response => {
                            this.router.navigate([Constantes.URL_HOME_CATEGORIA]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_CATEGORIA_ELIMINADA, Constantes.MENSAJE_OK, {duration: 3000,});
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

    apretarEditarCategoria(){
        this.router.navigate([Constantes.URL_EDITAR_CATEGORIA+this.codigo+'/']);
    }

    apretarAgregarSubCategoria(){
        this.router.navigate([Constantes.URL_ASIGNAR_SUBCATEGORIA+this.codigo+'/'])
    }

    apretarDesAsignarSubCategoria(codigo_subcategoria){
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_DESASIGNAR_SUBCATEGORIA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_DESASIGNAR_SUBCATEGORIA ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.desasignarSubCategoriaCategoria(this.codigo,codigo_subcategoria)
                        .then(
                        response => {
                            this.obtenerSubCategorias();
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

    apretarAgregarProducto(){
        this.router.navigate([Constantes.URL_ASIGNAR_PRODUCTO_CATEGORIA+this.codigo+'/'])
    }

    apretarDesAsignarProducto(codigo){
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_DESASIGNAR_PRODUCTO;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_DESASIGNAR_PRODUCTO ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.desasignarProductoCategoria(this.codigo,codigo)
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
            }
        );
    }

    updateFilterSubCategoria(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.subcategorias_temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.subcategorias = temp;
      }
    updateFilterProducto(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_temp.filter(function (d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos = temp;
    }
    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_CATEGORIA]);
    }
    
    
}


