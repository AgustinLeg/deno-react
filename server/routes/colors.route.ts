import { createRouter, contentTypeFilter } from "../deps.ts";
import { addColor, getAllColors } from "../controllers/colors.controller.ts";

const ColorRouter = createRouter();

ColorRouter.get("/", getAllColors);

ColorRouter.post("/",   contentTypeFilter("application/x-www-form-urlencoded"), addColor);


export { ColorRouter };
