import Region from "../models/region.model";
import ISeeder from "../interfaces/seeder.interface";
import State from "../models/state.model";

class StateSeeder implements ISeeder {
  seed = async () => {
    try {
      const states = [
        {
          state: "Adamawa",
          alias: "adamawa",
          region: "North East",
        },
        {
          state: "Akwa Ibom",
          alias: "akwa_ibom",
          region: "South South",
        },
        {
          state: "Anambra",
          alias: "anambra",
          region: "South East",
        },
        {
          state: "Ogun",
          alias: "ogun",
          region: "South West",
        },
        {
          state: "Ondo",
          alias: "ondo",
          region: "South West",
        },
        {
          state: "Rivers",
          alias: "rivers",
          region: "South South",
        },
        {
          state: "Bauchi",
          alias: "bauchi",
          region: "North East",
        },
        {
          state: "Benue",
          alias: "benue",
          region: "North Central",
        },
        {
          state: "Borno",
          alias: "borno",
          region: "North East",
        },
        {
          state: "Bayelsa",
          alias: "bayelsa",
          region: "South South",
        },
        {
          state: "Cross River",
          alias: "cross_river",
          region: "South South",
        },
        {
          state: "Delta",
          alias: "delta",
          region: "South South",
        },
        {
          state: "Ebonyi",
          alias: "ebonyi",
          region: "South East",
        },
        {
          state: "Edo",
          alias: "edo",
          region: "South South",
        },
        {
          state: "Ekiti",
          alias: "ekiti",
          region: "South West",
        },
        {
          state: "Enugu",
          alias: "enugu",
          region: "South East",
        },
        {
          state: "Federal Capital Territory",
          alias: "abuja",
          region: "North Central",
        },
        {
          state: "Gombe",
          alias: "gombe",
          region: "North East",
        },
        {
          state: "Jigawa",
          alias: "jigawa",
          region: "North West",
        },
        {
          state: "Oyo",
          alias: "oyo",
          region: "South West",
        },
        {
          state: "Imo",
          alias: "imo",
          region: "South East",
        },
        {
          state: "Kaduna",
          alias: "kaduna",
          region: "North West",
        },
        {
          state: "Kebbi",
          alias: "kebbi",
          region: "North West",
        },
        {
          state: "Kano",
          alias: "kano",
          region: "North West",
        },
        {
          state: "Kogi",
          alias: "kogi",
          region: "North Central",
        },
        {
          state: "Osun",
          alias: "osun",
          region: "South West",
        },
        {
          state: "Sokoto",
          alias: "sokoto",
          region: "North West",
        },
        {
          state: "Plateau",
          alias: "plateau",
          region: "North Central",
        },
        {
          state: "Taraba",
          alias: "taraba",
          region: "North East",
        },
        {
          state: "Yobe",
          alias: "yobe",
          region: "North East",
        },
        {
          state: "Zamfara",
          alias: "zamfara",
          region: "North West",
        },
        {
          state: "Lagos",
          alias: "lagos",
          region: "South West",
        },
        {
          state: "Katsina",
          alias: "katsina",
          region: "North West",
        },
        {
          state: "Kwara",
          alias: "kwara",
          region: "North Central",
        },
        {
          state: "Nasarawa",
          alias: "nasarawa",
          region: "North Central",
        },
        {
          state: "Niger",
          alias: "niger",
          region: "North Central",
        },
        {
          state: "Abia",
          alias: "abia",
          region: "South East",
        },
      ];

      const queries: any = [];

      states.forEach(async (state) => {
        const { state: name, alias, region: regionName } = state;
        const region = await Region.findOne({ name: regionName });
        if (!region) {
          throw new Error("Region not found");
        }

        const query = State.create({
          name,
          alias,
          region: region._id,
        });

        queries.push(query);
      });

      await Promise.all(queries);
      return "States seeded successfully";
    } catch (err: any) {
      console.log(err);
      return "Something went wrong while seeding states";
    }
  };
}

export default StateSeeder;
