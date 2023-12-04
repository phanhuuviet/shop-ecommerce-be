const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const {
    authenticateToken,
    authMiddleware,
} = require("../middlewares/authMiddleware");

//[GET]
router.get("/seller", authMiddleware, requestController.getAllRequestSeller);
router.get("/error", authMiddleware, requestController.getAllRequestError);

// [POST]
router.post(
    "/seller",
    authenticateToken,
    requestController.requestPermissionToSeller
);
router.post("/error", authenticateToken, requestController.reportError);

// [PUT]
router.put(
    "/:id/seller/accept",
    authMiddleware,
    requestController.acceptToSeller
);
router.put(
    "/:id/seller/reject",
    authMiddleware,
    requestController.rejectToSeller
);

module.exports = router;
