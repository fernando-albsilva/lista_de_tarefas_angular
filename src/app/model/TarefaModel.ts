export class TarefaModel {

    private _nomeTarefa: string ='';
    private _prioridade: string  ='';
    private _descricao: string  ='';
    
    constructor () {}

    // constructor(nomeTarefa:string, prioridade:string, descricao:string) {
    //     this.nomeTarefa =nomeTarefa;
    //     prioridade: string;
    //     descricao: string;
    // }

    get nomeTarefa() { return this._nomeTarefa};
    get prioridade() { return this._prioridade};
    get descricao() { return this._descricao};

    set nomeTarefa( nomeTarefa : string ) { this._nomeTarefa = nomeTarefa };
    set prioridade( prioridade : string ) { this._prioridade = prioridade };
    set descricao( descricao : string ) { this._descricao = descricao};
}

