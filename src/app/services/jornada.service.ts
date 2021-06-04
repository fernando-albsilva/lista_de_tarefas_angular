import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { JornadaModel } from 'src/app/model/JornadaModel';

@Injectable({ providedIn : 'root'})
export class JornadaService {

    
    emitirJornadaIniciada = new EventEmitter<any>();
    emitirJornadaFinalizada = new EventEmitter<any>();
    emitirIntervaloIniciado = new EventEmitter<any>();
    emitirIntervaloFinalizado = new EventEmitter<any>();

    private _listaDeJornada : JornadaModel[] = [];
    private _idJornada: number = 0;

    constructor() {  }
    
    iniciarJornada(jornada:JornadaModel){
        jornada.id = this.calculaIdJornada()
        this._listaDeJornada.push(jornada);
        this.emitirJornadaIniciada.emit(jornada.id);
    }

  
    
    finalizarJornada(jornadaFinalizada:JornadaModel){
        this._listaDeJornada.map((jornada)=>{
            if(jornada.id === jornadaFinalizada.id)
            {
                return jornadaFinalizada;
            }
            return jornada;
        });

        this.emitirJornadaFinalizada.emit(jornadaFinalizada.id);

    }

    iniciarIntervalo(jornada:JornadaModel){
        jornada.id = this.calculaIdJornada()
        this._listaDeJornada.push(jornada);
        this.emitirIntervaloIniciado.emit(jornada.id);
    }


    finalizarIntervalo(jornadaFinalizada:JornadaModel){
        this._listaDeJornada.map((jornada)=>{
            if(jornada.id === jornadaFinalizada.id)
            {
                return jornadaFinalizada;
            }
            return jornada;
        });

        this.emitirIntervaloFinalizado.emit(jornadaFinalizada.id);

    }

    calculaIdJornada():string {
        this._idJornada++;
        return this._idJornada.toString();
    }

}