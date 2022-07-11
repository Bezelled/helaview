"use strict";

import { Router } from "express";

const routes = Router();

routes.get("/", (req: any, res: any) => {
    res.send("Welcome to HelaView!")
});

export const router = routes;