import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService} from '../modulo.finanzas.services';

@Component({
    selector:'homeRemitoDetalle',
    templateUrl: './home.remito.detalle.component.html',
    styleUrls:['../Home_Remito_Detalle/home.remito.detalle.component.css']
    
})

export class HomeRemitoDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    selectedOption : string;
    codigo_remito : number;
    estado :string;
    tooltipCancelarRemito = Constantes.LABEL_CANCELAR_REMITO;
    position = 'above';
    label_remito_detalle = Constantes.LABEL_REMITO_DETALLE;
    label_codigo_remito = Constantes.LABEL_CODIGO;
    label_fecha_creacion = Constantes.LABEL_FECHA;
    label_usuario = Constantes.LABEL_USUARIO;
    label_estado = Constantes.LABEL_ESTADO;
    label_buscar_producto_tabla = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_codigo_producto = Constantes.LABEL_CODIGO;
    label_nombre_producto = Constantes.LABEL_NOMBRE;
    label_marca_producto = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    
    remito_cabecera = [];
    remito_detalles = [];
    remito_detalles_temp = [];
    
    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo_remito = (params['id_remito']) 
                this.obtenerRemito();
                });    
                appService.getState().topnavTitle = Constantes.LABEL_REMITO_DETALLE;
    }

    ngOnInit(){}

    obtenerRemito() {
        this.moduloFinanzas.obtenerRemitoId(this.codigo_remito)
            .then(
                response => {
                    this.remito_cabecera = response.datos_operacion['movimiento_cabecera'];
                    this.remito_cabecera['fecha_creacion'] = this.remito_cabecera['fecha_creacion'].substring(0,10).concat('  ',this.remito_cabecera['fecha_creacion'].substring(11,19));
                    this.estado = this.remito_cabecera['estado'];
                    this.remito_detalles= response.datos_operacion['movimiento_detalles'];
                    this.remito_detalles_temp = [...this.remito_detalles];
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
        const temp = this.remito_detalles_temp.filter(function(d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.remito_detalles = temp;
    }
    
 
    apretarCancelarRemito(){
        this.openDialogCancelarRemito();
    }
    
    openDialogCancelarRemito() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_CANCELAR_REMITO;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_CANCELAR_REMITO;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.cancelarRemito(this.codigo_remito)
                        .then(
                            response => {
                                this.obtenerRemito();
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
        this.router.navigate([Constantes.URL_HOME_REMITO]);
    }
    
    
}


