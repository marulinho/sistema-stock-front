import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService} from '../modulo.configuracion.service';

@Component({
    selector:'homeCliente',
    templateUrl: './home.cliente.component.html',
    styleUrls:['./home.cliente.component.css']
    
})

export class HomeClienteComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipAgregarCliente = Constantes.LABEL_AGREGAR_CLIENTE;
    tooltipIrCliente = Constantes.LABEL_NAVEGAR_CLIENTE;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_cliente = Constantes.LABEL_CLIENTE;
    label_detalle_cliente = Constantes.DESCRIPCION_CLIENTE;
    label_tabla_cliente = Constantes.LABEL_BUSCAR_TABLA_CLIENTE;
    label_buscar_cliente = Constantes.LABEL_BUSCAR_CLIENTE;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_apellido = Constantes.LABEL_APELLIDO;
    label_dni = Constantes.LABEL_DNI;
    label_telefono = Constantes.LABEL_TELEFONO;
    label_direccion = Constantes.LABEL_DIRECCION;
    label_tipo_cliente = Constantes.LABEL_TIPO_CLIENTE;
    label_accion = Constantes.LABEL_ACCION;
    clientes = [];
    clientes_temp = [];


    label_productos_subcategoria = Constantes.LABEL_CLIENTE;

    constructor(private router:Router,
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_SUBCATEGORIA;
    }

    ngOnInit(){
        this.moduloConfiguracion.obtenerClientes()
        .then(
            response => {
                this.clientes = response.datos_operacion;
                this.clientes_temp = [...response.datos_operacion];
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

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.clientes_temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.clientes = temp;
      }

    apretarIrCliente(codigo){
        this.router.navigate([Constantes.URL_HOME_CLIENTE_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarCliente(){
        this.router.navigate([Constantes.URL_AGREGAR_CLIENTE]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


