import { league_types } from "@prisma/client";

import BaseRepository from "./base/BaseRepository";
import prisma from "../../prisma/script";

export default class LeagueTypesRepository extends BaseRepository<league_types> {
  constructor() {
    super(prisma.league_types);
  }
}
