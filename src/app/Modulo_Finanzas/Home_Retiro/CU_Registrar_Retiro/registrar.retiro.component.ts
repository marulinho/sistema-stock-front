import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { ModuloFinanzasService } from '../../modulo.finanzas.services';
import { ModuloConfiguracionService } from '../../../Modulo_Configuracion/modulo.configuracion.service';


@Component({
    selector: 'app-registrar-retiro',
    templateUrl: './registrar.retiro.component.html',
    styleUrls: ['./registrar.retiro.component.scss']

})

export class RegistrarRetiroComponent implements OnInit {
    
    errorMessage = '';
    snackBarRef: any;
    selectedOption: string;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    id_usuario = JSON.parse(localStorage.getItem('idUsuario'));
    label_registrar_retiro = Constantes.LABEL_REGISTRAR_RETIRO;
    label_total_disponible = Constantes.LABEL_DINERO_DISPONIBLE;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    label_total = Constantes.LABEL_TOTAL;
    label_peso = Constantes.LABEL_PESO;
    label_usuario = Constantes.LABEL_USUARIO;
    label_error_total_balance = Constantes.MENSAJE_TOTAL_BALANCE;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;
    
    balance: number; 
    total: number = 0;
    descripcion: string;

    constructor(private router:Router,
                private moduloFinanzas: ModuloFinanzasService,
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_RETIRO;
    }

    ngOnInit(){
        this.obtenerUltimaCaja();
    }

    obtenerUltimaCaja(){
        this.moduloFinanzas.obtenerUltimaCaja()
        .then(
            response => {
                let caja_cabecera = response.datos_operacion['caja_cabecera'];
                let resultado = this.llenarCajaDetalle(response.datos_operacion['caja_detalles']);
                let total_apertura = parseFloat(caja_cabecera['total_apertura'].toFixed(2));
                this.balance = total_apertura + resultado;
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

    llenarCajaDetalle(caja_detalles){
        let longitud = caja_detalles.length;
        let total_egreso = 0;
        let total_ingreso = 0;
        
        for (var i = 0; i < longitud; i++) {
            if (caja_detalles[i]['tipo_movimiento'] === Constantes.LABEL_MOVIMIENTO_ENTRADA) {
                total_ingreso += caja_detalles[i]['total'];
            }
            else {
                total_egreso += caja_detalles[i]['total'];
            }
        }

        return (total_ingreso - total_egreso);
    }
    apretarRegistrarRetiro() {
        if(this.total > this.balance){
            this.errorMessage = this.label_error_total_balance;
        }
        else{
            this.moduloFinanzas.registrarRetiro(this.id_usuario,this.descripcion,this.total)
            .then(
                response => {
                    let codigo = response.datos_operacion['codigo'];
                    this.generarDetalleCaja(codigo);
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
    }

    generarDetalleCaja(codigo:number){
        this.moduloFinanzas.generarDetalleCaja(codigo)
        .then(
            response=>{
                this.router.navigate([Constantes.URL_HOME_RETIRO]);
                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
            }
        )
        .catch(
            error=>{
                
            }
        )
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_RETIRO]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_RETIRO]);
    }
}


