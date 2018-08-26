import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService} from '../modulo.finanzas.services';

@Component({
    selector:'homeCompraDetalle',
    templateUrl: './home.compra.detalle.component.html',
    styleUrls:['../Home_Compra_Detalle/home.compra.detalle.component.css']
    
})

export class HomeCompraDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    selectedOption : string;
    codigo_compra : number;
    estado :string;
    tooltipCancelarCompra = Constantes.LABEL_CANCELAR_COMPRA;
    tooltipPagarCompra = Constantes.LABEL_PAGAR_COMPRA;
    position = 'above';
    label_compra_detalle = Constantes.LABEL_COMPRA_DETALLE;
    label_codigo_compra = Constantes.LABEL_CODIGO;
    label_fecha_creacion = Constantes.LABEL_FECHA;
    label_total_final = Constantes.LABEL_TOTAL;
    label_total_parcial = Constantes.LABEL_TOTAL_PARCIAL;
    label_descuento = Constantes.LABEL_DESCUENTO;
    label_peso = Constantes.LABEL_PESO;
    label_porcentaje = Constantes.LABEL_PORCENTAJE;
    label_usuario = Constantes.LABEL_USUARIO;
    label_tipo_movimiento = Constantes.LABEL_TIPO_MOVIMIENTO;
    label_estado = Constantes.LABEL_ESTADO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    
    label_codigo_producto = Constantes.LABEL_CODIGO;
    label_nombre_producto = Constantes.LABEL_NOMBRE;
    label_marca_producto = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_precio = Constantes.LABEL_PRECIO_VENTA;
    label_subtotal = Constantes.LABEL_SUBTOTAL;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    
    compra_cabecera = [];
    compra_detalles = [];
    compra_detalles_temp = [];
    
    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo_compra = (params['id_compra']) 
                this.obtenerCompra();
                });    
                appService.getState().topnavTitle = Constantes.LABEL_COMPRA_DETALLE;
    }

    ngOnInit(){}

    obtenerCompra() {
        this.moduloFinanzas.obtenerCompraId(this.codigo_compra)
            .then(
                response => {
                    this.compra_cabecera = response.datos_operacion['compra_cabecera'];
                    this.compra_cabecera['fecha_creacion'] = this.compra_cabecera['fecha_creacion'].substring(0,10).concat('  ',this.compra_cabecera['fecha_creacion'].substring(11,19));
                    this.estado = this.compra_cabecera['estado'];
                    this.compra_detalles= response.datos_operacion['compra_detalles'];
                    this.compra_detalles_temp = [...this.compra_detalles];
                    //this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_DESASIGNACION_EXISTOSA, Constantes.MENSAJE_OK, { duration: 3000, });
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

    getEstadoCancelado(){
        if (this.estado === Constantes.ESTADO_CANCELADO){
            return true;
        }
        else{
            return false;
        }
    }

    getEstadoPagado(){
        if (this.estado === Constantes.ESTADO_PAGADO){
            return true;
        }
        else{
            return false;
        }
    }

    getEstadoCreado(){
        if (this.estado === Constantes.ESTADO_CREADO){
            return true;
        }
        else{
            return false;
        }
    }

    updateFilterProducto(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.compra_detalles_temp.filter(function(d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.compra_detalles = temp;
    }
    
 
    apretarCancelarCompra(){
        this.openDialogCancelarCompra();
    }
    
    openDialogCancelarCompra() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_CANCELAR_COMPRA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_CANCELAR_COMPRA ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.cancelarCompra(this.codigo_compra)
                        .then(
                            response => {
                                this.obtenerCompra();
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_CANCELACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
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
                this.selectedOption = '';
            }
        );
    }

    apretarPagarCompra(){
        //verificamos si existe una caja abierta
        this.moduloFinanzas.obtenerUltimaCaja()
            .then(
                response=>{
                    if(response.datos_operacion['caja_cabecera']['estado'] === Constantes.ESTADO_ABIERTA){
                        this.openDialogPagarCompra();
                    }
                    else{
                        this.openDialogAbrirCaja();
                    }
                }
            )
            .catch(
                error=>{
                    this.openDialogAbrirCaja();
                }
            )        
    }

    openDialogPagarCompra(){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_PAGAR_COMPRA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_PAGAR_COMPRA ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.pagarCompra(this.codigo_compra)
                        .then(
                            response => {
                                if(response.datos_operacion['estado'] === Constantes.ESTADO_PAGADO){
                                    this.generarMovimientoCapital();
                                }
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
                this.selectedOption = '';
            }
        );
    }

    generarMovimientoCapital(){
        this.moduloFinanzas.generarMovimientoStockSalidaCapital(this.codigo_compra)
            .then(
                response=>{
                    if(response.datos_operacion['estado'] === Constantes.ESTADO_PAGADO){
                        let codigo = response.datos_operacion['codigo'];
                        this.generarDetalleCaja(codigo);
                    }
                }
            )
            .catch(
                error=>{
                    this.moduloFinanzas.cambiarEstadoCompra(this.codigo_compra,this.estado)
                        .then(
                            response=>{
                                this.estado = response.datos_operacion['estado'];
                                this.errorMessage = Constantes.ERROR_MOVIMIENTO_CAPITAL_EXISTENTE;
                            }
                        )
                        .catch(
                            error=>{}
                        )
                }
            )
        
    }

    generarDetalleCaja(codigo:number){
        this.moduloFinanzas.generarDetalleCaja(codigo)
        .then(
            response=>{
                this.obtenerCompra();
                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_PAGO_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
            }
        )
        .catch(
            error=>{
                
            }
        )
    }
    openDialogAbrirCaja(){
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ABRIR_CAJA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ABRIR_CAJA_NO_EXISTE;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.abrirCaja()
                        .then(
                            response => {
                                this.openDialogPagarCompra();
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_APERTURA, Constantes.MENSAJE_OK, { duration: 3000, });
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
                this.selectedOption = '';
            }
        );
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_COMPRA]);
    }
    
    
}


