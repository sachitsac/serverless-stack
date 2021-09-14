import { AppSyncResolverEvent } from 'aws-lambda';
import { MutationAddChatMessageArgs, Chat } from './types/chats';
import { v4 as uuid } from 'uuid';
import { db } from '@serverless-stack/shared';

export const addChatMessage = async (
  event: AppSyncResolverEvent<MutationAddChatMessageArgs>,
): Promise<Chat> => {
  const chat: Chat = {
    id: uuid(),
    message: event.arguments.input.message,
    username: event.arguments.input.username,
    createdAt: new Date().toISOString(),
  };

  try {
    await db
      .put({
        TableName: process.env.TABLE_NAME!,
        Item: chat,
      })
      .promise();
  } catch (e) {
    throw new Error((e as Error).message);
  }

  return chat;
};
