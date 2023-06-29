import Region from "../models/region.model";
import ISeeder from "../interfaces/seeder.interface";

class RegionSeeder implements ISeeder {
  seed = async () => {
    try {
      const regions = [
        "North Central",
        "North East",
        "North West",
        "South East",
        "South South",
        "South West ",
      ];
      const queries = regions.map((region) => {
        return Region.create({ name: region });
      });
      await Promise.all(queries);
      return "Region seeded successfully";
    } catch (err: any) {
      return err.message as string;
    }
  };
}

export default RegionSeeder;
