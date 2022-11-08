import IProjeto from "@/objects/interface/IProjeto";

export default interface ITarefa {
    duracaoEmSegundos: number;
    descricao: string;
    projeto: IProjeto
}