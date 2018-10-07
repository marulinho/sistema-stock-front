import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogYesNoComponent } from '../../Datos_Sistema/dialog-yes-no/dialog.yes.no.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService} from '../modulo.finanzas.services';

@Component({
    selector:'homeVentaDetalle',
    templateUrl: './home.venta.detalle.component.html',
    styleUrls:['../Home_Venta_Detalle/home.venta.detalle.component.css']
    
})

export class HomeVentaDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    selectedOption : string;
    codigo_venta : number;
    estado :string;
    tooltipCancelarVenta = Constantes.LABEL_CANCELAR_VENTA;
    tooltipCobrarVenta = Constantes.LABEL_COBRAR_VENTA;
    position = 'above';
    label_venta_detalle = Constantes.LABEL_VENTA_DETALLE;
    label_codigo_venta = Constantes.LABEL_CODIGO;
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
    label_precio = Constantes.LABEL_PRECIO_COMPRA;
    label_subtotal = Constantes.LABEL_SUBTOTAL;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    
    venta_cabecera = [];
    venta_detalles = [];
    venta_detalles_temp = [];
    
    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo_venta = (params['id_venta']) 
                this.obtenerVenta();
                });    
                appService.getState().topnavTitle = Constantes.LABEL_VENTA_DETALLE;
    }

    ngOnInit(){}

    obtenerVenta() {
        this.moduloFinanzas.obtenerVentaId(this.codigo_venta)
            .then(
                response => {
                    this.venta_cabecera = response.datos_operacion['movimiento_cabecera'];
                    this.venta_cabecera['fecha_creacion'] = this.venta_cabecera['fecha_creacion'].substring(0,10).concat('  ',this.venta_cabecera['fecha_creacion'].substring(11,19));
                    this.estado = this.venta_cabecera['estado'];
                    this.venta_detalles= response.datos_operacion['movimiento_detalles'];
                    this.venta_detalles_temp = [...this.venta_detalles];
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
        if (this.estado != Constantes.ESTADO_CANCELADO){
            return true;
        }
        else{
            return false;
        }
    }


    updateFilterProducto(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.venta_detalles_temp.filter(function(d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.venta_detalles = temp;
    }
    
 
    apretarCancelarVenta(){
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_CANCELAR_VENTA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_CANCELAR_VENTA;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.cancelarVenta(this.codigo_venta)
                        .then(
                            response => {
                                this.obtenerVenta();
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

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_VENTA]);
    }
    
    
}


