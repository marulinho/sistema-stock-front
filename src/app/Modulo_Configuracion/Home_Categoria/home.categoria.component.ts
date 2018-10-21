import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService, Categoria} from '../modulo.configuracion.service';

@Component({
    selector:'homeCategoria',
    templateUrl: './home.categoria.component.html',
    styleUrls:['./home.categoria.component.css']
    
})

export class HomeCategoriaComponent implements OnInit{
    
    errorMessageCategoria = '';
    snackBarRef: any;
    tooltipAgregarCategoria = Constantes.LABEL_AGREGAR_CATEGORIA;
    tooltipIrCategoria = Constantes.LABEL_NAVEGAR_CATEGORIA;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_categoria = Constantes.LABEL_CATEGORIA;
    label_detalle_categoria = Constantes.DESCRIPCION_CATEGORIA;
    label_tabla_categoria = Constantes.LABEL_BUSCAR_TABLA_CATEGORIA;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    label_codigo = Constantes.LABEL_CODIGO;
    label_accion = Constantes.LABEL_ACCION;
    label_buscar_categoria = Constantes.LABEL_BUSCAR_CATEGORIA;
    categorias = [];
    categorias_temp = [];


    label_productos_categoria = Constantes.LABEL_PRODUCTOS_CATEGORIA;

    

    constructor(private router:Router,
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_CATEGORIA;
    }

    ngOnInit(){
        this.moduloConfiguracion.obtenerCategorias()
        .then(
            response => {
                this.categorias = response.datos_operacion;
                this.categorias_temp = [...response.datos_operacion];
            }
        )
        .catch(
            error => {
                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                    this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                    this.router.navigate([Constantes.URL_LOGIN]);
                }
                else{
                    this.errorMessageCategoria = error.error_description;
                }

            }
        );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.categorias_temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.categorias = temp;
      }

    apretarIrCategoria(codigo){
        this.router.navigate([Constantes.URL_HOME_CATEGORIA_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarCategoria(){
        this.router.navigate([Constantes.URL_AGREGAR_CATEGORIA]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


