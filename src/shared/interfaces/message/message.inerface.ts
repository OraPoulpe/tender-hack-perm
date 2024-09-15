export interface IMessage {
  created_datetime: string;
  from: "user" | "system";
  id: number;
  text: string;
  buttons?: IButtonMessage[];
  input?: IInputMessage;
  type: "form" | "input" | "table";
  placeholder?: string;

}

export interface IButtonMessage {
  text: string;
  color: string;
  to: number;
}

export interface IVariantsSelect {
  label: string;
  value: string;
}

export interface IInputMessage {
  type: "text" | "date" | "select";
  variants?: IVariantsSelect[];
  placeholder: string;
  url?: string;
}

export interface IMessagePops extends IMessage {
  disabled?: boolean;
  handleNewAction: (state: string) => void;
  table?: true

}
