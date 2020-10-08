export type People = Map<string, boolean>;
export type MutateAction = { action: string; person?: string };

export type State = {
  people: People;
  pickerVisible: boolean;
};
