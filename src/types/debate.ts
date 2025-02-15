export type History = {
  title: string;
  content: string;
}[];

export type GetPrompt = (
  motino: string,
  history: History,
  limit: number
) => string;

export type DebateTool = {
  id: string;
  actinon: string;
  getPrompt: GetPrompt;
};
