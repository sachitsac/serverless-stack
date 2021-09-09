import { Query } from "./chats";
import { db } from "./db";

export const messages = async (): Promise<Query["messages"]> => {
  const data = await db
    .scan({
      TableName: process.env.CHAT_TABLE!,
    })
    .promise();

  return data.Items?.map((item) => ({
    __typename: "Chat",
    id: item.id,
    message: item.message,
    createdAt: item.createdAt,
    username: item.username,
  }));
};
