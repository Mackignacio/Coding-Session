import { Get, Patch, Post, Delete, Put, Check } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { TodosServices } from "./todos.service";

@Controller({
  model: "./todos.model",
  route: "/todos",
})
export class TodosController {
  constructor(private services: TodosServices) {}

  @Get({ path: "/", middlewares: [] })
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.send(await this.services.allTodos());
    } catch (error) {
      res.json(error);
    }
  }

  @Post({ path: "/", middlewares: [Check("title").isString().notEmpty().required(), Check("completed").isBoolean().notEmpty().required()] })
  async addTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await this.services.addTodo(req.body));
    } catch (error) {
      res.json(error);
    }
  }

  @Get({ path: "/:id" })
  async getTodosbyId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      res.json(await this.services.todobyId(id));
    } catch (error) {
      res.json(error);
    }
  }

  @Patch({ path: "/:id", middlewares: [Check("title").isString().notEmpty(), Check("completed").isBoolean().notEmpty()] })
  async updateTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      res.json(await this.services.updateTodo(id, req.body));
    } catch (error) {
      res.json(error);
    }
  }

  @Delete({ path: "/:id" })
  async deleteTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      res.json(await this.services.deleteTodo(id));
    } catch (error) {
      res.json(error);
    }
  }
}
