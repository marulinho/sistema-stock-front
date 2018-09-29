import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar , MdDialog } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService} from '../modulo.finanzas.services';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';


@Component({
    selector:'homeCaja',
    templateUrl: './home.caja.component.html',
    styleUrls:['./home.caja.component.css']
    
})

export class HomeCajaComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    selectedOption: string;
    tooltipAbrirCaja = Constantes.LABEL_ABRIR_CAJA;
    tooltipCerrarCaja = Constantes.LABEL_CERRAR_CAJA;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    tooltipIrCompra = Constantes.LABEL_NAVEGAR_COMPRA;
    tooltipIrVenta = Constantes.LABEL_NAVEGAR_VENTA;
    tooltipIrRetiro = Constantes.LABEL_NAVEGAR_RETIRO;
    position = 'above';
    label_caja = Constantes.LABEL_CAJA;
    label_descripcion_caja = Constantes.DESCRIPCION_CAJA;
    label_detalle_caja = Constantes.LABEL_DETALLE_CAJA;
    label_fecha_apertura = Constantes.LABEL_FECHA_APERTURA;
    label_fecha_cierre = Constantes.LABEL_FECHA_CIERRE;
    label_total_apertura = Constantes.LABEL_TOTAL_APERTURA;
    label_total_cierre = Constantes.LABEL_TOTAL_CIERRE;
    label_total_ingresos = Constantes.LABEL_TOTAL_INGRESOS;
    label_detalle_ingresos = Constantes.LABEL_DETALLE_INGRESOS;
    label_total_egresos = Constantes.LABEL_TOTAL_EGRESOS;
    label_detalle_egresos = Constantes.LABEL_DETALLE_EGRESOS;
    label_balance = Constantes.LABEL_BALANCE;
    label_peso = Constantes.LABEL_PESO;
    label_fecha = Constantes.LABEL_FECHA;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    label_total = Constantes.LABEL_TOTAL;
    label_estado = Constantes.LABEL_ESTADO;
    label_accion = Constantes.LABEL_ACCION;
    total_apertura : number = 0.0;
    total_ingreso : number = 0.0;
    total_egreso : number = 0.0;
    balance : number = 0.0;
    estado = '';
    errorMessageIngresos = '';
    errorMessageEgresos = '';

    caja_cabecera = [];
    caja_detalles = [];
    caja_detalle_ingreso : Array<{ fecha:string, descripcion: string, total: number}> = [];
    caja_detalle_egreso : Array<{ fecha:string, descripcion: string, total: number}> = [];

    constructor(private router:Router,
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private appService:AppService,
                private dialog: MdDialog){
                    
           appService.getState().topnavTitle = Constantes.LABEL_CAJA;
    }

    ngOnInit(){
        this.obtenerUltimaCaja();
    }

    getEstadoCerrada(){
        if(this.estado != ''){
            if(this.estado === Constantes.ESTADO_CERRADA){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return true;
        }
    }

    getBalance(){
        return this.balance;
    }


    obtenerUltimaCaja(){
        this.moduloFinanzas.obtenerUltimaCaja()
        .then(
            response => {
                this.caja_cabecera = response.datos_operacion['caja_cabecera'];
                this.caja_cabecera['fecha_apertura'] = this.caja_cabecera['fecha_apertura'].substring(0,10).concat(' ',this.caja_cabecera['fecha_apertura'].substring(11,19));
                if(this.caja_cabecera['fecha_cierre'] != null){
                    this.caja_cabecera['fecha_cierre'] = this.caja_cabecera['fecha_cierre'].substring(0,10).concat(' ',this.caja_cabecera['fecha_cierre'].substring(11,19));
                } 
                else{
                    this.caja_cabecera['fecha_cierre'] = Constantes.LABEL_FECHA_CIERRE_SIN_DEFINIR;
                }
                this.estado = this.caja_cabecera['estado'];
                this.caja_detalles = response.datos_operacion['caja_detalles'];
                this.llenarCajaDetalle();
                this.caja_cabecera['total_apertura'] = parseFloat(this.caja_cabecera['total_apertura'].toFixed(2));
                this.total_apertura = this.caja_cabecera['total_apertura'];
                this.balance = this.total_apertura + this.total_ingreso - this.total_egreso;
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
    
    llenarCajaDetalle(){
        let longitud = this.caja_detalles.length;
        let caja_detalle_ingreso_temp : Array<{ fecha:string, descripcion: string, total: number}> = [];
        let caja_detalle_egreso_temp : Array<{ fecha:string, descripcion: string, total: number}> = [];
        this.caja_detalle_egreso = [];
        this.caja_detalle_ingreso = [];
        this.total_egreso = 0;
        this.total_ingreso = 0;
        
        for (var i = 0; i < longitud; i++) {
            if (this.caja_detalles[i]['tipo_movimiento'] === Constantes.LABEL_MOVIMIENTO_ENTRADA) {
                caja_detalle_ingreso_temp.push({fecha: this.caja_detalles[i]['fecha_creacion'].substring(0, 10).concat(' ', this.caja_detalles[i]['fecha_creacion'].substring(11, 19)),
                                                descripcion: this.caja_detalles[i]['detalle'],
                                                total: this.caja_detalles[i]['total']
                                            });
                this.total_ingreso += this.caja_detalles[i]['total'];
                this.caja_detalle_ingreso = this.caja_detalle_ingreso.concat(caja_detalle_ingreso_temp);
                caja_detalle_ingreso_temp.pop();

            }
            else {
                let descripcion = '';
                let separador = ' ';
                let detalles = this.caja_detalles[i]['detalle'].split(' ');
                if (this.caja_detalles[i]['detalle'].includes('Retiro')){
                    for (var x = 0; x < 3; x++){
                        descripcion = descripcion.concat(detalles[x],separador)
                    }
                    this.caja_detalles[i]['detalle'] = descripcion;
                }
                caja_detalle_egreso_temp.push({fecha: this.caja_detalles[i]['fecha_creacion'].substring(0, 10).concat(' ', this.caja_detalles[i]['fecha_creacion'].substring(11, 19)),
                                                descripcion: this.caja_detalles[i]['detalle'],
                                                total: this.caja_detalles[i]['total']
                                            });
                this.total_egreso += this.caja_detalles[i]['total'];
                this.caja_detalle_egreso = this.caja_detalle_egreso.concat(caja_detalle_egreso_temp);
                caja_detalle_egreso_temp.pop();
            }
        }
        
        this.total_egreso = parseFloat(this.total_egreso.toFixed(2));
        this.total_ingreso = parseFloat(this.total_ingreso.toFixed(2));

        if (this.caja_detalle_ingreso.length == 0) {
            this.errorMessageIngresos = Constantes.LABEL_NO_HAY_INGRESOS;
        }
        if (this.caja_detalle_egreso.length == 0) {
            this.errorMessageEgresos = Constantes.LABEL_NO_HAY_EGRESOS;
        }
    }

    apretarAbrirCaja(){
        this.openDialogAbrirCaja();
    }

    openDialogAbrirCaja() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ABRIR_CAJA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ABRIR_CAJA;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.abrirCaja()
                        .then(
                            response => {
                                this.errorMessage = '';
                                this.obtenerUltimaCaja();
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
            });
    }


    apretarCerrarCaja(){
        this.openDialogCerrarCaja();
    }

    openDialogCerrarCaja() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_CERRAR_CAJA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_CERRAR_CAJA;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.cerrarCaja()
                        .then(
                            response => {
                                this.obtenerUltimaCaja();
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_CIERRE, Constantes.MENSAJE_OK, { duration: 3000, });
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


    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }

    apretarIrCompra(descripcion){
        let codigo : number = descripcion.substring(descripcion.length-4, descripcion.length);
        this.router.navigate([Constantes.URL_HOME_COMPRA_DETALLE+'/'+codigo+'/']);
    }

    apretarIrVenta(descripcion){
        let codigo : number = descripcion.substring(descripcion.length-4, descripcion.length);
        this.router.navigate([Constantes.URL_HOME_VENTA_DETALLE+'/'+codigo+'/']);
    }

    apretarIrRemito(descripcion){
        let detalles = descripcion.split(' ');
        let codigo = detalles[3];
        console.log(codigo);
        //this.router.navigate([Constantes.URL_HOME_VENTA_DETALLE+'/'+codigo+'/']);
    }
}


