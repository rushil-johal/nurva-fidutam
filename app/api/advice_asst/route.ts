import { AssistantResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2 || '',
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  const createdMessage = await openai.beta.threads.messages.create(
    threadId,
    {
      role: 'user',
      content: `Hey`,
    },
    { signal: req.signal },
  );

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      const runStream = openai.beta.threads.runs.stream(
        threadId,
        {
          assistant_id:
            process.env.ASSISTANT_ID ??
            (() => {
              throw new Error('ASSISTANT_ID is not set');
            })(),
        },
        { signal: req.signal },
      );

      let runResult = await forwardStream(runStream);

      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments);

              switch (toolCall.function.name) {
                case 'calculateExpenses': {
                  const { item, individualExpense } = parameters;
                  const totalExpenses = individualExpense * item.length;

                  sendDataMessage({
                    role: 'data',
                    data: {
                      totalExpenses,
                      description: `Total expenses for ${item.length} items at $${individualExpense} each is $${totalExpenses}`,
                    },
                  });

                  return {
                    tool_call_id: toolCall.id,
                    output: totalExpenses.toString(),
                  };
                }

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`,
                  );
              }
            },
          );
        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },
            { signal: req.signal },
          ),
        );
      }
    },
  );
}
