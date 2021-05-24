export class TarefaModel {

    private _nomeTarefa: string ='';
    private _prioridade: string  ='';
    private _descricao: string  ='';
    private _id: string = '';
    
    constructor () {}

    // constructor(nomeTarefa:string, prioridade:string, descricao:string) {
    //     this.nomeTarefa =nomeTarefa;
    //     prioridade: string;
    //     descricao: string;
    // }

    get nomeTarefa() { return this._nomeTarefa};
    get prioridade() { return this._prioridade};
    get descricao() { return this._descricao};
    get id() { return this._id};
    
    set nomeTarefa( nomeTarefa : string ) { this._nomeTarefa = nomeTarefa };
    set prioridade( prioridade : string ) { this._prioridade = prioridade };
    set descricao( descricao : string ) { this._descricao = descricao};
    set id( idTarefa : string ) { this._id = idTarefa};
}

