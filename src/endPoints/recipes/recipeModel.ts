import * as types from "../../types";
import { dryAgerModel } from "../../db/schemas";
import { ObjectId } from "mongodb";

export async function getActiveRecipe(dryAgerId: ObjectId) {
  try {
    const id = new ObjectId(dryAgerId);
    const res = await dryAgerModel.aggregate([
      {
        $match: {
          _id: id,
          "recipes.endDate": { $gte: new Date() },
        },
      },
      {
        $project: {
          name: 1,
          recipeTitle: { $arrayElemAt: ["$recipes.title", -1] },
          progress: {
            $multiply: [
              {
                $divide: [
                  {
                    $subtract: [
                      new Date(),
                      { $arrayElemAt: ["$recipes.startDate", -1] },
                    ],
                  },
                  {
                    $subtract: [
                      { $arrayElemAt: ["$recipes.endDate", -1] },
                      { $arrayElemAt: ["$recipes.startDate", -1] },
                    ],
                  },
                ],
              },
              100,
            ],
          },
        },
      },
    ]);
    console.log(res);
    return [null, res];
  } catch (error) {
    console.error(error);
    return [error, null];
  }
}
