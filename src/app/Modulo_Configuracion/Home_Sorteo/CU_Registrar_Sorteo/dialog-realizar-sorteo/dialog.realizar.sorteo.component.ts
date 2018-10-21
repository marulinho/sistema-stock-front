import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-realizar-sorteo",
    templateUrl: './dialog.realizar.sorteo.component.html',
    styleUrls: ['./dialog.realizar.sorteo.component.scss']
})
export class DialogRealizarSorteoComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;

    errorMessage="";

    label_ganador = Constantes.LABEL_GANANDOR;
    label_posicion = Constantes.LABEL_POSICION;
    label_lugar = Constantes.LABEL_LUGAR;
    label_realizar_sorteo = Constantes.BOTON_SORTEO;
    label_datos_sorteo = Constantes.LABEL_DATOS_SORTEO;
    label_participantes = Constantes.LABEL_PARTICIPANTES;
    label_ganadores = Constantes.LABEL_GANADORES;

    cantidad_premios: number = 0;
    sorteo_realizado: Boolean = false;
    participantes:string;
    cantidad_participantes:number;
    ganadores = [];

    constructor(private dialogRef: MdDialogRef<DialogRealizarSorteoComponent>) {
    }

    ngOnInit(): void {
        if(this.cantidad_premios <= 0){
            this.errorMessage = Constantes.ERROR_CANTIDAD_PREMIOS;
        }
    }

    getSorteoRealizado(){
        return this.sorteo_realizado;
    }

    apretarRealizarSorteo(){
        this.participantes = this.participantes.replace("</p>","");
        this.participantes = this.participantes.replace("<p>","");
        this.participantes = this.participantes.replace("<br>","");
        let participantes = this.participantes.split(",");
        this.cantidad_participantes = participantes.length;
        
        if(this.cantidad_participantes < this.cantidad_premios){
            this.errorMessage = Constantes.ERROR_CANTIDAD_PARTICIPANTES_PREMIO;
        }
        else{
            for(var i=0; i<this.cantidad_premios;i++){
                let index_ganador = Math.floor(Math.random() * participantes.length);
                this.ganadores.push(participantes[index_ganador])
                //eliminamos el participante
                participantes = participantes.filter(item => item !== participantes[index_ganador]);
                
            }
            if(this.ganadores.length>=1){
                this.sorteo_realizado=true;
            }
        }
    }
}
