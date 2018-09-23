import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService, Resultado} from '../modulo.configuracion.service';

@Component({
    selector:'homeClienteDetalle',
    templateUrl: './home.cliente.detalle.component.html',
    styleUrls:['../Home_Cliente_Detalle/home.cliente.detalle.component.css']
    
})

export class HomeClienteDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipEditarCliente = Constantes.LABEL_EDITAR_CLIENTE;
    tooltipEliminarCliente = Constantes.LABEL_ELIMINAR_CLIENTE;
    position = 'above';
    codigo : number;
    selectedOption: string;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_apellido = Constantes.LABEL_APELLIDO;
    label_dni = Constantes.LABEL_DNI;
    label_telefono = Constantes.LABEL_TELEFONO;
    label_direccion = Constantes.LABEL_DIRECCION;
    label_tipo_cliente = Constantes.LABEL_TIPO_CLIENTE;
    label_perfil_cliente = Constantes.LABEL_CLIENTE_PERFIL;

    cliente: Resultado;

    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo = (params['id_cliente']) 
                });    
                this.obtenerCliente();
                appService.getState().topnavTitle = Constantes.LABEL_CLIENTE_PERFIL;
    }

    ngOnInit(){}

    obtenerCliente(){
        this.moduloConfiguracion.obtenerClienteId(this.codigo)
        .then(
            response => {
                this.cliente = response.datos_operacion;
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

    apretarEliminarCliente(){
        this.openDialogCliente();
    }

    openDialogCliente() {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ELIMINAR_CLIENTE;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ELIMINAR_CLIENTE ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.eliminarCliente(this.codigo)
                        .then(
                        response => {
                            this.router.navigate([Constantes.URL_HOME_CLIENTE]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_CLIENTE_ELIMINADO, Constantes.MENSAJE_OK, {duration: 3000,});
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

    apretarEditarCliente(){
        this.router.navigate([Constantes.URL_EDITAR_CLIENTE+this.codigo+'/']);
    }

    
    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_CLIENTE]);
    }
    
}