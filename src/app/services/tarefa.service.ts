import { Injectable } from '@angular/core';
import { TarefaModel } from '../model/TarefaModel';

@Injectable({ providedIn: 'root'})
export class TarefaService{

    _listaDeTarefas:any[]=[];


    
    constructor(){
        for (let index = 0; index < 30; index++) {
            
            this._listaDeTarefas.push( {nome_tarefa: ("tarefa "+index) , prioridade: (""+index)  , descricao: ("descrição da tarefa "+index), indice:(index*2) } );
            
          }
    }

    get listaDeTarefas() : any[]{
        
        return this._listaDeTarefas;
    }

    adicionaTarefa(tarefa:TarefaModel){
        
        this._listaDeTarefas.push({nome_tarefa: (tarefa.nomeTarefa) , prioridade: (tarefa.prioridade)  , descricao: (tarefa.descricao), indice:("99") })
        console.log("LISTA ATUALIZADA");
        console.log(this._listaDeTarefas);
        this.verifica();
    }

    verifica():any[]{
        return this._listaDeTarefas;
    }
}