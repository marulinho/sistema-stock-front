import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-registrar-remito",
    templateUrl: './dialog.registrar.remito.component.html',
    styleUrls: ['./dialog.registrar.remito.component.scss']
})
export class DialogRegistrarRemitoComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;

    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_stock_deposito = Constantes.LABEL_STOCK_DEPOSITO;
    label_stock_local = Constantes.LABEL_STOCK_LOCAL;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_accion = Constantes.LABEL_ACCION;

    productos = [];
    productos_temp = [];

    constructor(private dialogRef: MdDialogRef<DialogRegistrarRemitoComponent>) {
    }

    ngOnInit(): void {
        this.productos_temp = [...this.productos];
        let longitud = this.productos.length;
        for(var i = 0; i<longitud ; i++){
            this.productos[i]['checked'] = false;
        }
    }

    getProductosSeleccionados(){
        this.productos_temp = [...this.productos];
        let longitud = this.productos.length;
        let resultado = false;
        for(var i = 0; i<longitud ; i++){
            if(this.productos[i]['checked']===true){
                resultado = true;
                break;
            }
        }
        return resultado;
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos = temp;
    }
}
