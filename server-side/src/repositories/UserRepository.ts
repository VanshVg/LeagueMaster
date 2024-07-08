import { users } from "@prisma/client";
import BaseRepository from "./base/BaseRepository";
import prisma from "../../prisma/script";

export default class UserRepository extends BaseRepository<users> {
  constructor() {
    super(prisma.users);
  }
}
