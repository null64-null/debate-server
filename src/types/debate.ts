export type Arg = {
  title: string;
  content: string;
};

export type GetPrompt = (
  motino: string,
  history: Arg[],
  limit: number
) => string;

export type DebateTool = {
  id: string;
  actinon: string;
  getPrompt: GetPrompt;
};
