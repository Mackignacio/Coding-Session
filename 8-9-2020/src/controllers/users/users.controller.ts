import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { UsersServices } from "./users.service";

@Controller({
  model: "./users.model",
  route: "/users",
})
export class UsersController {
  constructor(private services: UsersServices) {}

  @Get({ path: "/:id", middlewares: [] })
  async byId(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.byID(req.params.id));
  }

  @Post({ path: "/", middlewares: [] })
  async addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.create(req.body));
  }

  @Patch({ path: "/:id", middlewares: [] })
  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.update(req.params.id, req.body));
  }

  @Delete({ path: "/:id", middlewares: [] })
  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(await this.services.delete(req.params.id));
  }
}
