import { teams } from "@prisma/client";
import BaseRepository from "./base/BaseRepository";
import prisma from "../../prisma/script";
import { ITeamsData } from "./interfaces";

export default class TeamRepository extends BaseRepository<teams> {
  constructor() {
    super(prisma.teams);
  }
  async createTeams(teamsData: ITeamsData[]) {
    return await prisma.teams.createMany({ data: teamsData });
  }
}
