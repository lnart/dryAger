import { getAllDryAger } from "../dryAgers/dryAgerModel";

export async function getAllTopics() {
  const dryAgers = await getAllDryAger();
  const topics: string[] = [];
  dryAgers.forEach((dryager: any) => {
    const username = dryager.user?.username.split(" ").join("_");
    const dryAgerId = dryager._id;
    const topic = username + "/" + dryAgerId;
    topics.push(topic);
  });
  return topics;
}
