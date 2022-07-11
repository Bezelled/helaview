"use strict";

import express from "express";
import { router } from "./src/routes";
import { login } from "./src/api/login";
import { PORT } from "./src/config/globals";
import { HDB } from "./src/db";

const app: any = express();

app.use("/", router);
app.use("/api/", login);

app.listen(PORT, () => {
    console.log(`HelaView app is listening on port ${PORT}.`);
});