import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService, Producto} from '../modulo.configuracion.service';

@Component({
    selector:'homeProductoDetalle',
    templateUrl: './home.producto.detalle.component.html',
    styleUrls:['../Home_Producto_Detalle/home.producto.detalle.component.css']
    
})

export class HomeProductoDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipEditarProducto = Constantes.LABEL_EDITAR_PRODUCTO;
    tooltipEliminarProducto = Constantes.LABEL_ELIMINAR_PRODUCTO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    codigo : number;
    estado : string;
    selectedOption: string;
    label_codigo_producto = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_producto_detalle = Constantes.LABEL_PRODUCTO_DETALLE;
    label_stock_minimo = Constantes.LABEL_STOCK_MINIMO;
    label_stock_local = Constantes.LABEL_STOCK_LOCAL;
    label_stock_deposito = Constantes.LABEL_STOCK_DEPOSITO;
    producto : Producto;
    

    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo = (params['id_producto']) 
                });    
                this.obtenerProducto();
                appService.getState().topnavTitle = Constantes.LABEL_PRODUCTO_DETALLE;
    }

    ngOnInit(){}

    obtenerProducto(){
        this.moduloConfiguracion.obtenerProductoId(this.codigo)
        .then(
            response => {
                this.producto = response.datos_operacion;
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

    apretarEliminarProducto(){
        this.openDialog();
    }

    openDialog() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ELIMINAR_PRODUCTO;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ELIMINAR_PRODUCTO;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.eliminarProducto(this.codigo)
                        .then(
                        response => {
                            this.router.navigate([Constantes.URL_HOME_PRODUCTO]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_PRODUCTO_ELIMINADO, Constantes.MENSAJE_OK, {duration: 3000,});
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


    apretarEditarProducto(){
        this.router.navigate([Constantes.URL_EDITAR_PRODUCTO+this.codigo+'/']);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_PRODUCTO]);
    }
    
}


