import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService, Combo} from '../modulo.configuracion.service';

@Component({
    selector:'homeComboDetalle',
    templateUrl: './home.combo.detalle.component.html',
    styleUrls:['../Home_Combo_Detalle/home.combo.detalle.component.css']
    
})

export class HomeComboDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipEditarCombo = Constantes.LABEL_EDITAR_COMBO;
    tooltipEliminarCombo = Constantes.LABEL_ELIMINAR_COMBO;
    position = 'above';
    codigo : number;
    selectedOption: string;
    label_combo_detalle = Constantes.LABEL_COMBO_DETALLE;
    label_codigo_combo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_precio = Constantes.LABEL_PRECIO_VENTA;
    label_peso = Constantes.LABEL_PESO;
    label_productos_combo = Constantes.LABEL_PRODUCTOS_COMBO;
    combo : Combo;

    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;

    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo = (params['id_combo']) 
                });    
                this.obtenerCombo();
                appService.getState().topnavTitle = Constantes.LABEL_COMBO_DETALLE;
    }

    ngOnInit(){}

    obtenerCombo(){
        this.moduloConfiguracion.obtenerComboId(this.codigo)
        .then(
            response => {
                this.combo = response.datos_operacion;
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


    apretarEliminarCombo(){
        this.openDialogEliminarCombo(Constantes.TITLE_ELIMINAR_COMBO,Constantes.PREGUNTA_ELIMINAR_COMBO);
    }

    openDialogEliminarCombo(title,description) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = description ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.eliminarCombo(this.codigo)
                        .then(
                        response => {
                            this.router.navigate([Constantes.URL_HOME_COMBO]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_COMBO_ELIMINADO, Constantes.MENSAJE_OK, {duration: 3000,});
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

    apretarEditarCombo(){
        this.router.navigate([Constantes.URL_EDITAR_COMBO+this.codigo+'/']);
    }

   
    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_COMBO]);
    }
    
    
}


