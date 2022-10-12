import IProjeto from "@/objects/IProjeto";

export default interface ITarefa {
    duracaoEmSegundos: number;
    descricao: string;
    projeto: IProjeto
}