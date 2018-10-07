import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-registrar-combo",
    templateUrl: './dialog.registrar.combo.component.html',
    styleUrls: ['./dialog.registrar.combo.component.scss']
})
export class DialogRegistrarComboComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;

    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_peso = Constantes.LABEL_PESO;
    label_porcentaje = Constantes.LABEL_PORCENTAJE;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_accion = Constantes.LABEL_ACCION;

    productos = [];
    productos_temp = [];

    constructor(private dialogRef: MdDialogRef<DialogRegistrarComboComponent>) {
    }

    ngOnInit(): void {
        this.productos_temp = [...this.productos];
        let longitud = this.productos.length;
        for(var i = 0; i<longitud ; i++){
            this.productos[i]['checked'] = false;
        }
        
    }

    getProductosSeleccionados(){
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
