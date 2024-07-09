import { leagues } from "@prisma/client";

import BaseRepository from "./base/BaseRepository";
import prisma from "../../prisma/script";

export default class LeagueRepository extends BaseRepository<leagues> {
  constructor() {
    super(prisma.leagues);
  }
}
