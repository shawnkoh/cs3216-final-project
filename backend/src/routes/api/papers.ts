import { Router } from "express";
import * as AllocationsController from "../../controllers/AllocationsController";
import * as PapersController from "../../controllers/PapersController";
import * as PaperUsersController from "../../controllers/PaperUsersController";
import * as QuestionTemplatesController from "../../controllers/QuestionTemplatesController";
import * as ScriptsController from "../../controllers/ScriptsController";
import * as ScriptTemplatesController from "../../controllers/ScriptTemplatesController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.use(checkBearerToken(BearerTokenType.AccessToken));

router.get("/:id/markers", PaperUsersController.getMarkers);
router.get("/:id/students", PaperUsersController.getStudents);
router.get(
  "/:id/unmatched_students",
  PaperUsersController.getUnmatchedStudents
);
router.post("/:id/users", PaperUsersController.create);
router.delete("/:id/all_students", PaperUsersController.discardStudents);

router.post("/", PapersController.create);
router.get("/", PapersController.index);
router.get("/:id", PapersController.show);
router.patch("/:id", PapersController.update);
router.delete("/:id", PapersController.discard);
router.patch("/:id/undiscard", PapersController.undiscard);

router.get("/:id/question_templates", QuestionTemplatesController.index);

router.get("/:id/grading", PapersController.grading);

router.get(
  "/:id/root_question_templates",
  QuestionTemplatesController.rootQuestionTemplates
);

router.post("/:id/script_templates", ScriptTemplatesController.create);
router.get(
  "/:id/script_templates/active",
  ScriptTemplatesController.showActive
);

router.post("/:id/scripts", ScriptsController.create);
router.get("/:id/scripts", ScriptsController.index);
router.patch("/:id/scripts/match", ScriptsController.match);
router.delete("/:id/all_scripts", ScriptsController.discardScripts);
router.patch("/:id/publish_scripts", ScriptsController.publishScripts);

router.get("/:id/allocations", AllocationsController.index);
router.get("/:id/root_allocations", AllocationsController.getRootAllocations);

router.get(
  "/:id/script_template/setup",
  ScriptTemplatesController.getSetupData
);

export default router;
