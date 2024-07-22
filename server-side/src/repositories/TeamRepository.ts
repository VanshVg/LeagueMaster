import { teams } from "@prisma/client";
import BaseRepository from "./base/BaseRepository";
import prisma from "../../prisma/script";

export default class TeamRepository extends BaseRepository<teams> {
  constructor() {
    super(prisma.teams);
  }
}
