import { Router } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../index.js";
import { data } from "../data/data.js";

const dataRouter = Router();

dataRouter.get("/data", (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      // Pagination but not fully implemented yet
      /* const page = parseInt(req.query.page) || 1;
             let limit = parseInt(req.query.limit) || 3;
             let skip = (page - 1) * limit;
             const newData = data.meals.slice(skip, skip + limit);
             const refinedData = {...data, meals: newData};
            */
      res.json({
        message: data,
        authData,
      });
    }
  });
});

export default dataRouter;
