import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogYesNoComponent } from '../../Datos_Sistema/dialog-yes-no/dialog.yes.no.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService , Resultado} from '../modulo.finanzas.services';

@Component({
    selector:'homeRetiroDetalle',
    templateUrl: './home.retiro.detalle.component.html',
    styleUrls:['../Home_Retiro_Detalle/home.retiro.detalle.component.css']
    
})

export class HomeRetiroDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    selectedOption : string;
    codigo_retiro : number;
    estado :string;
    tooltipCancelarRetiro = Constantes.LABEL_CANCELAR_RETIRO;
    position = 'above';
    label_retiro_detalle = Constantes.LABEL_RETIRO_DETALLE;
    label_codigo_retiro = Constantes.LABEL_CODIGO;
    label_fecha_creacion = Constantes.LABEL_FECHA;
    label_total = Constantes.LABEL_TOTAL;
    label_peso = Constantes.LABEL_PESO;
    label_usuario = Constantes.LABEL_USUARIO;
    label_estado = Constantes.LABEL_ESTADO;
    label_descripcion = Constantes.LABEL_DESCRIPCION;

    retiro : Resultado;
    
    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo_retiro = (params['id_retiro']) 
                });    
                appService.getState().topnavTitle = Constantes.LABEL_RETIRO_DETALLE;
    }

    ngOnInit(){
        this.obtenerRetiro();
    }

    obtenerRetiro() {
        this.moduloFinanzas.obtenerRetiroId(this.codigo_retiro)
            .then(
                response => {
                    this.retiro = response.datos_operacion;
                    this.retiro['fecha_creacion'] = this.retiro['fecha_creacion'].substring(0,10).concat('  ',this.retiro['fecha_creacion'].substring(11,19));
                    this.estado = this.retiro['estado'];
                    let detalles = this.retiro['descripcion'].split(' ');
                    let descripcion = '';
                    let separador = ' ';
                    for (var x = 3; x < detalles.length; x++){
                        descripcion = descripcion.concat(detalles[x],separador)
                    }
                    this.retiro['descripcion'] = descripcion;
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

    getEstadoPagado(){
        if (this.estado === Constantes.ESTADO_PAGADO){
            return true;
        }
        else{
            return false;
        }
    }
 
    apretarCancelarRetiro(){
        this.openDialogCancelarRemito();
    }
    
    openDialogCancelarRemito() {
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_CANCELAR_RETIRO;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_CANCELAR_RETIRO;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.cancelarRetiro(this.codigo_retiro)
                        .then(
                            response => {
                                this.obtenerRetiro();
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
        this.router.navigate([Constantes.URL_HOME_RETIRO]);
    }
    
    
}