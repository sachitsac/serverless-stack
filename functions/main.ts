export async function main(event: unknown): Promise<string> {
  console.log("event 👉", event);

  return "Hello world";
}
