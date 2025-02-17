import { GetPrompt, Arg } from "@/types/debate";

const showArgs = (args: Arg[]): string => {
  let explanation = "";

  args.map((arg) => {
    explanation += `【${arg.title}】
    ${arg.title}
    
    `;
  });

  return explanation;
};

const govArgumentPrompt: GetPrompt = (
  motion: string,
  _args: Arg[],
  limit: number
): string => {
  const prompt = `あなたの役割: 
あなたはディベートの賛成側チームの最初の立論者です。

指示: 
以下の条件に従って、論理的で説得力のある賛成立論を作成してください。

1. 「${motion}」に賛成の立場 で主張を展開してください。
2. 理由を複数提示し、それぞれに対して論理的な説明を行ってください。
3. 各理由には具体的な論拠や事例を示し、読者が納得しやすいようにしてください。
4. ${limit}文字以内で記述してください（空白や改行は0文字としてカウント）。
5. 出力フォーマット:
  ・マークダウン記法を用いること（見出し・箇条書き・強調などを適宜活用）。
  ・読みやすく整理された構成にすること。`;

  return prompt;
};

const oppArgumentPrompt: GetPrompt = (
  motion: string,
  args: Arg[],
  limit: number
): string => {
  const prompt = `あなたの役割:
あなたはディベートの反対側チームの最初の立論者です。

指示:
以下の条件に従って、論理的で説得力のある反対立論を作成してください。

1. 「${motion}」に反対の立場 で主張を展開してください。
2. 理由を複数提示し、それぞれに対して論理的な説明を行ってください。
3. 各理由には具体的な論拠や事例を示し、読者が納得しやすいようにしてください。
4. 以下の賛成側立論に対する反論も加えてください:
${showArgs(args)}

5. ${limit}文字以内で記述してください（空白や改行は0文字としてカウント）。
6. 出力フォーマット:
  ・マークダウン記法を用いること（見出し・箇条書き・強調などを適宜活用）。
  ・読みやすく整理された構成にすること。`;

  return prompt;
};

const govRebuttalPrompt: GetPrompt = (
  motion: string,
  args: Arg[],
  limit: number
): string => {
  const prompt = `あなたの役割:
あなたはディベートの賛成側チームの二番目の立論者です。

指示:
以下の条件に従って、反対側チームに反論してください。

1. 「${motion}」に賛成の立場で主張を展開してください。
2. 反対側立論に対する反論を行い、以下のディベートの続きを行って下さい:
${showArgs(args)}

3. 理由を複数提示し、それぞれに対して論理的な説明を行ってください。
4. 各理由には具体的な論拠や事例を示し、読者が納得しやすいようにしてください。
5. ${limit}文字以内で記述してください（空白や改行は0文字としてカウント）。
6. 出力フォーマット:
  ・マークダウン記法を用いること（見出し・箇条書き・強調などを適宜活用）。
  ・読みやすく整理された構成にすること。`;

  return prompt;
};

const oppRebuttalPrompt: GetPrompt = (
  motion: string,
  args: Arg[],
  limit: number
): string => {
  const prompt = `あなたの役割:
あなたはディベートの反対側チームの二番目の立論者です。

指示:
以下の条件に従って、賛成側チームに反論してください。

1. 「${motion}」に反対の立場で主張を展開してください。
2. 賛成側反論に対する反論を行い、以下のディベートの続きを行って下さい:
${showArgs(args)}

3. 理由を複数提示し、それぞれに対して論理的な説明を行ってください。
4. 各理由には具体的な論拠や事例を示し、読者が納得しやすいようにしてください。
5. ${limit}文字以内で記述してください（空白や改行は0文字としてカウント）。
6. 出力フォーマット:
  ・マークダウン記法を用いること（見出し・箇条書き・強調などを適宜活用）。
  ・読みやすく整理された構成にすること。`;

  return prompt;
};

const govSummaryPrompt: GetPrompt = (
  motion: string,
  args: Arg[],
  limit: number
): string => {
  const prompt = `あなたの役割:
あなたはディベートの賛成側チームの三番目の立論者です。

指示:
以下の条件に従って、なぜ賛成側チームがディベートの勝者か説明してください。

1. 「${motion}」に賛成の立場で主張を展開してください。
2. 以下のディベート経緯を踏まえて、なぜ賛成側チームがディベートの勝者か説明してください。:
${showArgs(args)}

3. 以下のディベート経緯を踏まえて、必要に応じて反対側反論への反論も加えてください:
${showArgs(args)}

4. 理由を複数提示し、それぞれに対して論理的な説明を行ってください。
5. 各理由には具体的な論拠や事例を示し、読者が納得しやすいようにしてください。
6. ${limit}文字以内で記述してください（空白や改行は0文字としてカウント）。
7. 出力フォーマット:
  ・マークダウン記法を用いること（見出し・箇条書き・強調などを適宜活用）。
  ・読みやすく整理された構成にすること。`;

  return prompt;
};

const oppSummaryPrompt: GetPrompt = (
  motion: string,
  args: Arg[],
  limit: number
): string => {
  const prompt = `あなたの役割:
あなたはディベートの反対側チームの三番目の立論者です。

指示:
以下の条件に従って、なぜ反対側チームがディベートの勝者か説明してください。

1. 「${motion}」に反対の立場で主張を展開してください。
2. 以下のディベート経緯を踏まえて、なぜ反対側チームがディベートの勝者か説明してください。:
${showArgs(args)}

3. 理由を複数提示し、それぞれに対して論理的な説明を行ってください。
4. 各理由には具体的な論拠や事例を示し、読者が納得しやすいようにしてください。
5. ${limit}文字以内で記述してください（空白や改行は0文字としてカウント）。
6. 出力フォーマット:
  ・マークダウン記法を用いること（見出し・箇条書き・強調などを適宜活用）。
  ・読みやすく整理された構成にすること。`;

  return prompt;
};

const judgePrompt: GetPrompt = (
  motion: string,
  args: Arg[],
  limit: number
): string => {
  const prompt = `あなたの役割:
あなたはディベートの審判です。

指示:
以下の条件に従って、どちらのチームが勝者か判定してください。

1. 「${motion}」が議題です。
2. 以下のディベート経緯を踏まえて、勝利チームを判定してください。:
${showArgs(args)}

3. 理由を複数提示し、それぞれに対して論理的な説明を行ってください。
4. 各理由には具体的な論拠や事例を示し、読者が納得しやすいようにしてください。
5. ${limit}文字以内で記述してください（空白や改行は0文字としてカウント）。
6. 出力フォーマット:
  ・マークダウン記法を用いること（見出し・箇条書き・強調などを適宜活用）。
  ・読みやすく整理された構成にすること。`;

  return prompt;
};

export const debateTools = [
  {
    id: "gov_argument",
    action: "賛成側立論",
    getPrompt: govArgumentPrompt,
  },
  {
    id: "opp_argument",
    action: "反対側立論",
    getPrompt: oppArgumentPrompt,
  },
  {
    id: "gov_rebuttal",
    action: "賛成側反論",
    getPrompt: govRebuttalPrompt,
  },
  {
    id: "opp_rebuttal",
    action: "反対側反論",
    getPrompt: oppRebuttalPrompt,
  },
  {
    id: "gov_summary",
    action: "賛成側まとめ",
    getPrompt: govSummaryPrompt,
  },
  {
    id: "opp_summary",
    action: "反対側まとめ",
    getPrompt: oppSummaryPrompt,
  },
  {
    id: "judge",
    action: "判定",
    getPrompt: judgePrompt,
  },
];
