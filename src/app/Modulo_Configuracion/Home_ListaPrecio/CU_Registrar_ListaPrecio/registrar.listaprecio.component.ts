import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService } from '../../modulo.configuracion.service';
import { MdDialog } from '@angular/material';
import { DialogEditarPrecioListaComponent } from './dialog-editar-precio-lista-precio/dialog.editar.precio.lista.component';
import { DialogYesNoComponent } from '../../../Datos_Sistema/dialog-yes-no/dialog.yes.no.component';


@Component({
    selector: 'app-registrar-lista-precio',
    templateUrl: './registrar.listaprecio.component.html',
    styleUrls: ['./registrar.listaprecio.component.scss']

})

export class RegistrarListaPrecioComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    errorMessage = '';
    lista_precio_vigente : Boolean = false;
    tooltipEditarPrecio = Constantes.LABEL_EDITAR_PRECIO;
    tooltipEliminarProducto = Constantes.LABEL_ELIMINAR_PRODUCTO;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    position = 'above';
    selectedOption : string;
    label_accion = Constantes.LABEL_ACCION;
    label_registrar_lista_precio = Constantes.LABEL_REGISTRAR_LISTA_PRECIO;
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_datos_lista_precios = Constantes.LABEL_DATOS_LISTA_PRECIO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_tabla_lista_precio = Constantes.LABEL_BUSCAR_TABLA_LISTA_PRECIO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_codigo = Constantes.LABEL_CODIGO;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_peso = Constantes.LABEL_PESO;
    label_porcentaje = Constantes.LABEL_PORCENTAJE;
    label_ganancia = Constantes.LABEL_GANANCIA;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_paso_1  = Constantes.LABEL_PASO_1;
    label_paso_2  = Constantes.LABEL_PASO_2;
    label_paso_3  = Constantes.LABEL_PASO_3;
    label_resumen = Constantes.LABEL_RESUMEN;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_siguiente = Constantes.BOTON_SIGUIENTE;
    boton_atras = Constantes.BOTON_ATRAS;
    boton_salir = Constantes.BOTON_SALIR;

    selectIndex: number = 0;
    nombre: string;
    lista_precio_productos = [];
    lista_precio_compra =[];
    lista_precio_venta =[];
    
    lista_precio: Array<{ codigo:number,
                                nombre: string,
                                marca: string,
                                medida: number,
                                nombre_unidad_medida: string,
                                precio_unitario_compra: number,
                                precio_unitario_venta: number,
                                margen_ganancia:number,
                                ganancia:number}> = [];
    lista_precio_temp = [];

    constructor(private appService: AppService,
        private moduloConfiguracion: ModuloConfiguracionService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog,
        private router: Router) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_LISTA_PRECIO;
    }

    ngOnInit() {
        this.obtenerListaPrecio();
    }

    obtenerListaPrecio(){
        this.moduloConfiguracion.obtenerListaPrecioVigente()
        .then(
            response => {
                this.llenarListaPrecioProductosLista(response.datos_operacion['lista_precio_detalles']);
                this.obtenerProductosNoLista();
                
            }
        )
        .catch(
            //En el caso de que no haya lista de precios vigente, tiene que cargar la lista a mano
            error=>{
                this.lista_precio_vigente = true;
            }
        );

    }

    obtenerProductosNoLista(){
        this.moduloConfiguracion.obtenerProductosNoListaPrecio()
        .then(
            response => {
                this.llenarListaPrecioProductosNoLista(response.datos_operacion)
            }
        )
        .catch(
            error=>{
                this.errorMessage = error.error_description
            }
        );
    }

    llenarListaPrecioProductosLista(productos){
        let longitud = productos.length;
        let lista_precio_temp : Array<{codigo:number,
                                       nombre: string,
                                       marca: string,
                                       medida: number,
                                       nombre_unidad_medida: string,
                                       precio_unitario_compra: number,
                                       precio_unitario_venta: number,
                                       margen_ganancia:number,
                                       ganancia:number}> = [];
        for (var i = 0; i <longitud; i++){
            lista_precio_temp.push({codigo: productos[i]['codigo_producto'],
                                nombre: productos[i]['nombre_producto'],
                                marca:productos[i]['marca_producto'],
                                medida: productos[i]['medida'],
                                nombre_unidad_medida: productos[i]['nombre_medida'],
                                precio_unitario_compra: productos[i]['precio_compra'],
                                precio_unitario_venta: productos[i]['precio_venta'],
                                margen_ganancia: productos[i]['margen_ganancia'],
                                ganancia: productos[i]['ganancia']});
            this.lista_precio = this.lista_precio.concat(lista_precio_temp);
            lista_precio_temp.pop();
        }
        this.lista_precio_temp = [...this.lista_precio];
    }

    llenarListaPrecioProductosNoLista(productos){
        let longitud = productos.length;
        let lista_precio_temp : Array<{codigo:number,
                                       nombre: string,
                                       marca: string,
                                       medida: number,
                                       nombre_unidad_medida: string,
                                       precio_unitario_compra: number,
                                       precio_unitario_venta: number,
                                       margen_ganancia: number,
                                       ganancia:number}> = [];
        for (var i = 0; i <longitud; i++){
            lista_precio_temp.push({codigo: productos[i]['codigo_producto'],
                                nombre: productos[i]['nombre_producto'],
                                marca:productos[i]['marca_producto'],
                                medida: productos[i]['medida'],
                                nombre_unidad_medida: productos[i]['nombre_medida'],
                                precio_unitario_compra: 0,
                                precio_unitario_venta: 0,
                                margen_ganancia: 0,
                                ganancia: 0});
            this.lista_precio = this.lista_precio.concat(lista_precio_temp);
            lista_precio_temp.pop();
        }
        this.lista_precio_temp = [...this.lista_precio];
    }

    getListaPrecioVigente(){
        return this.lista_precio_vigente;
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.lista_precio_temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_precio = temp;
    }

   apretarEditarPrecioProducto(row){
        let dialogRef = this.dialog.open(DialogEditarPrecioListaComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_EDITAR_PRECIO_LISTA;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_EDITAR_PRECIO_LISTA ;
        if(row.precio_unitario_compra === null){
            dialogRef.componentInstance.precio_compra = 0 ;
        }
        else{
            dialogRef.componentInstance.precio_compra = row.precio_unitario_compra ;
        }

        if(row.margen_ganancia === null){
            dialogRef.componentInstance.margen_ganancia = 0 ;
        }
        else{
            dialogRef.componentInstance.margen_ganancia = row.margen_ganancia ;
        }
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    if(dialogRef.componentInstance.precio_compra <= 0 || dialogRef.componentInstance.margen_ganancia <= 0){
                        //dejamos el margen y precios actuales    
                    }
                    else{
                        this.lista_precio[row.$$index]['precio_unitario_compra'] = dialogRef.componentInstance.precio_compra;
                        this.lista_precio[row.$$index]['precio_unitario_venta'] = parseFloat(dialogRef.componentInstance.getPrecioTotal());
                        this.lista_precio[row.$$index]['margen_ganancia'] = dialogRef.componentInstance.margen_ganancia;
                        this.lista_precio[row.$$index]['ganancia'] = parseFloat((this.lista_precio[row.$$index]['precio_unitario_venta'] - this.lista_precio[row.$$index]['precio_unitario_compra']).toFixed(2));
                    }                    
                } 
            }
        );
   }

   apretarEliminarProducto(row){
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ELIMINAR_PRODUCTO;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ELIMINAR_PRODUCTO ;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    let lista = [];
                    let longitud = this.lista_precio.length;
                    let codigo_producto = this.lista_precio[row.$$index]['codigo'];
                    for(var i = 0; i<longitud; i++){
                         if (this.lista_precio[i]['codigo'] == codigo_producto){
                             //no hacemos nada
                         }
                         else{
                             lista.push(this.lista_precio[i]);
                         }
                    }
                    this.lista_precio = lista;
                    this.lista_precio_temp = [...this.lista_precio];
                } 
            }
        );
   }

    apretarAtrasRegistrar(){
        this.errorMessage = "";
        this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
        this.selectIndex = this.selectIndex - 1;
    }
    apretarNextRegistrar() {
        if (this.selectIndex == 0) {
            this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
            this.arrayVerificar.push(this.nombre);
            if (this.utils.verificarDatosIncompletos(this.arrayVerificar) == true) {
                this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
            }
            else {
                this.arrayVerificar = this.utils.limpiarArray(this.arrayVerificar);
                this.selectIndex = this.selectIndex + 1;
                this.errorMessage = "";
            }
        }
    }

    llenarArrays(){
        let longitud = this.lista_precio.length;
        for(var i = 0; i< longitud; i++){
            if(this.lista_precio[i]['precio_unitario_compra'] >= 0 && this.lista_precio[i]['precio_unitario_venta']){
                this.lista_precio_productos.push(this.lista_precio[i]['codigo']);
                this.lista_precio_compra.push(this.lista_precio[i]['precio_unitario_compra']);
                this.lista_precio_venta.push(this.lista_precio[i]['precio_unitario_venta']);
            }
        }
    }

    apretarRegistrarListaPrecio(){
        this.lista_precio_productos = [] ;
        this.lista_precio_compra = [];
        this.lista_precio_venta = [];
        this.llenarArrays();
        if(this.lista_precio_productos.length == this.lista_precio_compra.length &&  this.lista_precio_compra.length == this.lista_precio_venta.length){
            this.moduloConfiguracion.registrarListaPrecio(this.nombre,this.lista_precio_productos,this.lista_precio_compra,this.lista_precio_venta)
                .then(
                    response => {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                        this.router.navigate([Constantes.URL_HOME_LISTA_PRECIO]);
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
        else{
            this.errorMessage = Constantes.ERROR_LISTAS_DIFERENTES;
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_LISTA_PRECIO]);
    }


}
