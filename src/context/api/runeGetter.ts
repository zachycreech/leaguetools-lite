import axios from "axios";

export default class RuneApi {
  axiousInstance = axios.create({
    baseURL: "http://51.161.70.66:5000/api/ugg/",
  });

  async getAramRunes(champion: string) {
    const championRunes = (await this.axiousInstance.get(`${champion}-aram`))
      .data;
    return championRunes;
  }

  //   async getChampionRunes(champion: string, lane?: string) {
  //     const championRunes = (await this.axiousInstance.get(`${champion}/${lane}`))
  //       .data;
  //     return championRunes;
  //   }
}
