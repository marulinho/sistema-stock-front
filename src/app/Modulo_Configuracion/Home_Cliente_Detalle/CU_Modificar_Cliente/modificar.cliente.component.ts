import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService, Resultado } from '../../modulo.configuracion.service';

@Component({
    selector: 'app-modificar-cliente',
    templateUrl: './modificar.cliente.component.html',
    styleUrls: ['./modificar.cliente.component.css']

})

export class ModificarClienteComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    label_modificar_cliente = Constantes.LABEL_EDITAR_CLIENTE;
    label_datos_cliente = Constantes.LABEL_DATOS_CLIENTE;
    label_codigo = Constantes.LABEL_CODIGO;
    label_dni = Constantes.LABEL_DNI;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_apellido = Constantes.LABEL_APELLIDO;
    label_telefono = Constantes.LABEL_TELEFONO;
    label_direccion = Constantes.LABEL_DIRECCION;
    boton_modificar = Constantes.BOTON_MODIFICAR;
    boton_salir = Constantes.BOTON_SALIR;

    errorMessage: string = "";
    codigo : number;
    nombre: string;
    apellido: string;
    telefono: number;
    direccion: string;
    dni: number;


    constructor(private router: Router,
        private route: ActivatedRoute,
        private moduloConfiguracion: ModuloConfiguracionService,
        private appService: AppService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) {

        this.route.params.subscribe(params => {
        this.codigo = (params['id_cliente'])
        });
        this.obtenerCliente();
        appService.getState().topnavTitle = Constantes.LABEL_EDITAR_CLIENTE;

    }

    ngOnInit() {

    }

    obtenerCliente(){
        this.moduloConfiguracion.obtenerClienteId(this.codigo)
        .then(
            response => {
                this.nombre = response.datos_operacion['nombre'];
                this.apellido = response.datos_operacion['apellido'];
                this.telefono = response.datos_operacion['telefono'];
                this.direccion = response.datos_operacion['direccion'];
                this.dni = response.datos_operacion['dni'];
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


    apretarModificarCliente() {
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.nombre,this.apellido,this.telefono,this.direccion);
        if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.errorMessage = "";

            this.moduloConfiguracion.modificarCliente(this.codigo, this.nombre, this.apellido,this.telefono,this.direccion)
                .then(
                    response => {
                        this.router.navigate([Constantes.URL_HOME_CLIENTE_DETALLE+'/'+this.codigo]);
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_MODIFICACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                    }
                )
                .catch(
                    error => {
                        if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                            this.router.navigate([Constantes.URL_LOGIN]);
                            this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, { duration: 3000, });
                        }
                        else {
                            this.errorMessage = error.error_description;
                        }
                    }
                );
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_CLIENTE_DETALLE+'/'+this.codigo]);
    }
}
