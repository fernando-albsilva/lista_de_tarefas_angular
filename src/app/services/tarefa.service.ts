import { Injectable } from '@angular/core';
import { MatSnackBar }  from '@angular/material/snack-bar';
import { EventEmitter } from '@angular/core';
import { TarefaModel } from '../model/TarefaModel';


@Injectable({ providedIn: 'root'})
export class TarefaService{


    emitirTarefaAdicionada = new EventEmitter<any>();

    _listaDeTarefas:any[]=[];


    
    constructor(private snackBar: MatSnackBar){
        // for (let index = 0; index < 3; index++) {
            
        //     this._listaDeTarefas.push( {nome_tarefa: ("tarefa "+index) , prioridade: (""+index)  , descricao: ("descrição da tarefa "+index), indice:(index*2) } );
            
        //   }
    }

    get listaDeTarefas() : any[]{
        
        return this._listaDeTarefas;
    }

    adicionaTarefa(tarefa:TarefaModel){
        
        this._listaDeTarefas.push({nome_tarefa: (tarefa.nomeTarefa) , prioridade: (tarefa.prioridade)  , descricao: (tarefa.descricao), indice:("99") })
        this.emitirTarefaAdicionada.emit({nome_tarefa: (tarefa.nomeTarefa) , prioridade: (tarefa.prioridade)  , descricao: (tarefa.descricao), indice:("99") })
        console.log("LISTA ATUALIZADA");
        console.log(this._listaDeTarefas);
        this.mostraMensagem();
        this.verifica();
    }

    verifica(){
        return this._listaDeTarefas;
    }

    mostraMensagem():void {  

        this.snackBar.open('Tarefa adicionada com sucesso!','',{
            duration:3000,
            horizontalPosition: "center",
            verticalPosition: "bottom"
        });
    }
}