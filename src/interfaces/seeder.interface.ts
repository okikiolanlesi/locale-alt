export default interface ISeeder {
  seed: () => Promise<String>;
}
