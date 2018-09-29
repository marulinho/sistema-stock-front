import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService } from '../../modulo.configuracion.service';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';


@Component({
    selector: 'app-modificar-combo',
    templateUrl: './modificar.combo.component.html',
    styleUrls: ['./modificar.combo.component.css']

})

export class ModificarComboComponent implements OnInit {

    snackBarRef: any; 
    arrayVerificar = [];
    utils = new Utils();
    tooltipEditarProducto = Constantes.LABEL_EDITAR_PRODUCTO;
    position = 'above';
    label_modificar_combo = Constantes.LABEL_EDITAR_COMBO;
    label_datos_combo = Constantes.LABEL_DATOS_COMBO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_codigo = Constantes.LABEL_CODIGO;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
    label_marca = Constantes.LABEL_MARCA;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_medida = Constantes.LABEL_MEDIDA;
    label_peso = Constantes.LABEL_PESO;
    label_detalle_combo = Constantes.DESCRIPCION_COMBO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_tabla_combo = Constantes.LABEL_BUSCAR_TABLA_COMBO;
    label_productos = Constantes.LABEL_PRODUCTOS_COMBO;
    label_porcentaje = Constantes.LABEL_PORCENTAJE;
    label_accion = Constantes.LABEL_ACCION;
    boton_aceptar = Constantes.BOTON_ACEPTAR;
    boton_cancelar = Constantes.BOTON_CANCELAR;
    boton_modificar = Constantes.BOTON_MODIFICAR;
    boton_salir = Constantes.BOTON_SALIR;

    errorMessage: string = "";
    selectedOption: string;
    codigo : number;
    nombre: string;
    precio: number;

    combo = [];
    combo_temp = [];
    
    lista_productos = [];
    lista_margen_ganancia = [];
    lista_cantidad_productos = [];

    constructor(private router: Router,
        private route: ActivatedRoute,
        private moduloConfiguracion: ModuloConfiguracionService,
        private appService: AppService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) {

        this.route.params.subscribe(params => {
        this.codigo = (params['id_combo'])
        });
        this.obtenerCombo();
        appService.getState().topnavTitle = Constantes.LABEL_MODIFICAR_COMBO;

    }

    ngOnInit() {

    }

    obtenerCombo(){
        this.moduloConfiguracion.obtenerComboId(this.codigo)
        .then(
            response => {
                this.combo = response.datos_operacion['combo_detalles'];
                let longitud = this.combo.length;
                for(var i = 0; i < longitud; i++){
                    this.combo[i]['precio_producto'] = parseFloat(this.combo[i]['precio_producto']).toFixed(2);
                    this.combo[i]['margen_ganancia'] = parseFloat(this.combo[i]['margen_ganancia']).toFixed(2);
                    this.combo[i]['subtotal'] = parseFloat(this.combo[i]['subtotal']).toFixed(2);
                }
                this.combo_temp = [...response.datos_operacion['combo_detalles']];
                this.nombre = response.datos_operacion['combo_cabecera']['nombre'];
                this.precio = response.datos_operacion['combo_cabecera']['precio'];
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
        const temp = this.combo_temp.filter(function(d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.combo = temp;
      }

    apretarModificarCombo() {
        this.lista_cantidad_productos = [];
        this.lista_productos = [];
        this.lista_margen_ganancia = [];
        this.llenarArrays();
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.arrayVerificar.push(this.nombre);
        if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.errorMessage = "";

            this.moduloConfiguracion.modificarCombo(this.codigo, this.nombre, this.lista_productos, this.lista_margen_ganancia, this.lista_cantidad_productos)
                .then(
                    response => {
                        this.router.navigate([Constantes.URL_HOME_COMBO_DETALLE+'/'+this.codigo]);
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

    apretarEditarProductoCombo(row) {
        this.openDialogEditarProducto(Constantes.TITLE_EDITAR_PRECIO_LISTA, Constantes.DESCRIPCION_EDITAR_PRECIO_LISTA, row);
    }

    openDialogEditarProducto(title, description, row) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.descipcion_lista_precio = description;
        dialogRef.componentInstance.precio_compra = row.precio_producto;
        dialogRef.componentInstance.margen_ganancia = row.margen_ganancia;
        dialogRef.componentInstance.cantidad = row.cantidad;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    if (dialogRef.componentInstance.precio_compra <= 0 || dialogRef.componentInstance.margen_ganancia <= 0 || dialogRef.componentInstance.cantidad <= 0) {
                        //no editamos los precios
                    }
                    else {
                        this.combo[row.$$index]['margen_ganancia'] = dialogRef.componentInstance.margen_ganancia;
                        this.combo[row.$$index]['cantidad'] = dialogRef.componentInstance.cantidad;
                        this.combo[row.$$index]['subtotal'] = this.combo[row.$$index]['precio_producto'] * (1+(this.combo[row.$$index]['margen_ganancia'] / 100.00)) * this.combo[row.$$index]['cantidad'];
                        this.combo[row.$$index]['subtotal'] = parseFloat(this.combo[row.$$index]['subtotal']).toFixed(2);
                        this.actualizarPrecioCombo();
                    }
                }
            }
        );
    }

    llenarArrays(){
        let longitud = this.combo.length;
        for(var i = 0; i< longitud; i++){
            this.lista_productos.push(this.combo[i]['codigo_producto']);
            let margen_ganancia = parseFloat(this.combo[i]['margen_ganancia']);
            this.lista_margen_ganancia.push(margen_ganancia);
            this.lista_cantidad_productos.push(this.combo[i]['cantidad']);
        }
    }

    actualizarPrecioCombo(){
        let longitud = this.combo.length;
        this.precio = 0;
        for(var i = 0; i < longitud; i++){
            this.precio += this.combo[i]['subtotal'] * this.combo[i]['cantidad'];
        }
        //this.precio.toPrecision(2);
    }
    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_COMBO_DETALLE+'/'+this.codigo]);
    }
}
