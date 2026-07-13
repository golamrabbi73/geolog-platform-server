import { UserModel } from "../user/user.model";
import { WellModel } from "../well/well.model";
import { CoreSampleModel } from "../coreSample/coreSample.model";

export const getDashboardAnalytics = async () => {
  // Summary
  const totalUsers = await UserModel.countDocuments();

  const totalWells = await WellModel.countDocuments();

  const totalSamples =
    await CoreSampleModel.countDocuments();

  // Well Status
  const wellStatus = await WellModel.aggregate([
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  // Rock Types
  const rockTypes =
    await CoreSampleModel.aggregate([
      {
        $group: {
          _id: "$rockType",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

  // Recent Wells
  const recentWells =
    await WellModel.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

  // Recent Samples
  const recentSamples =
    await CoreSampleModel.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

  return {
    summary: {
      totalUsers,
      totalWells,
      totalSamples,
    },

    wellStatus,

    rockTypes,

    recentWells,

    recentSamples,
  };
};