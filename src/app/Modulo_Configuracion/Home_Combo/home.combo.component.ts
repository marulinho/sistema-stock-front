import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService, Categoria} from '../modulo.configuracion.service';

@Component({
    selector:'homeCombo',
    templateUrl: './home.combo.component.html',
    styleUrls:['./home.combo.component.css'] 
    
})

export class HomeComboComponent implements OnInit{
    
    errorMessageCombo = '';
    snackBarRef: any;
    tooltipAgregarCombo = Constantes.LABEL_AGREGAR_COMBO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_precio = Constantes.LABEL_PRECIO_VENTA;
    label_peso = Constantes.LABEL_PESO;
    label_combo = Constantes.LABEL_COMBO;
    label_detalle_combo = Constantes.DESCRIPCION_COMBO;
    label_tabla_combo = Constantes.LABEL_BUSCAR_TABLA_COMBO;
    label_productos = Constantes.LABEL_PRODUCTOS_COMBO;
    
    label_navegar_combo = Constantes.LABEL_NAVEGAR_COMBO;
    combos = [];
    combos_temp = [];


    label_productos_categoria = Constantes.LABEL_PRODUCTOS_CATEGORIA;

    

    constructor(private router:Router,
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_HOME_COMBO;
    }

    ngOnInit(){
        this.moduloConfiguracion.obtenerCombosVigentes()
        .then(
            response => {
                this.combos = response.datos_operacion;
                this.combos_temp = [...response.datos_operacion];
            }
        )
        .catch(
            error => {
                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                    this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                    this.router.navigate([Constantes.URL_LOGIN]);
                }
                else{
                    this.errorMessageCombo = error.error_description;
                }

            }
        );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.combos_temp.filter(function(d) {
            return d['combo_cabecera'].nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.combos = temp;
      }

    apretarIrCombo(codigo){
        this.router.navigate([Constantes.URL_HOME_COMBO_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarCombo(){
        this.router.navigate([Constantes.URL_AGREGAR_COMBO]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


