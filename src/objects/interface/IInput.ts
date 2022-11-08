export enum inputType {
    text = 'text',
    number = 'number',
    select = 'select',
    toggle = 'toggle',
    option = 'option'
}

export default interface IInput {
    title: string;
    type: inputType;
    placeholder: string;
    children: string[] | null
}