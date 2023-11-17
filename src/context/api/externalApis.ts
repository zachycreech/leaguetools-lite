import axios from "axios";

export default abstract class LoLExternalApi {
  static async getLolVersion() {
    const response = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json",
    );
    const responseData = response.data;
    const version = responseData[0];

    return version;
  }

  static async getAllChampions() {
    const lolVersion = await LoLExternalApi.getLolVersion();
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${lolVersion}/data/en_US/champion.json`,
    );
    const championsObject = response.data.data;
    const championList = Object.values(championsObject);

    return championList;
  }

  static async getAllRunes() {
    const lolVersion = await LoLExternalApi.getLolVersion();
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${lolVersion}/data/en_US/runesReforged.json`,
    );
    const runes = response.data.data;

    return runes;
  }

  static async getAllItems() {
    const lolVersion = await LoLExternalApi.getLolVersion();
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${lolVersion}/data/en_US/item.json`,
    );
    const items = response.data.data;

    return items;
  }
}
