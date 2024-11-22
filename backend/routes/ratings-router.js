import express from "express";
import Rating from "../models/rating-model.js";
import University from "../models/university-model.js";
import { sendErrorResp } from "../utils.js";

const ratingsRouter = express.Router();

ratingsRouter.post("/:univId", async (req, res) => {
  try {
    const univId = req.params.univId;
    const userId = req.query.userId;
    const answers = req.body;

    let noOfQnsAnswered = 0;
    let finalRating = 0;
    const transformedAnswers = Object.keys(answers).map((qnId) => {
      noOfQnsAnswered += 1;
      finalRating += answers[qnId];

      return {
        questionId: qnId,
        answer: answers[qnId],
      };
    });

    await Rating.findOneAndUpdate(
      {
        universityId: univId,
        userId: userId,
      },
      {
        answers: transformedAnswers,
        universityId: univId,
        userId: userId,
        overallRating: finalRating / noOfQnsAnswered,
      },
      {
        upsert: true,
      }
    );

    const ratingRecs = await Rating.find(
      { universityId: univId },
      { overallRating: true }
    );

    const noOfRatings = ratingRecs?.length;
    const overallRating = ratingRecs?.reduce((sum, rec) => {
      sum += rec.overallRating;
      return sum;
    }, 0);

    await University.findByIdAndUpdate(univId, {
      noOfRatings: noOfRatings,
      overallRating: overallRating / noOfRatings,
    });

    return res.send(
      "Your rating has submitted successfully. Thank you for rating!!"
    );
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

ratingsRouter.get("/:univId", async (req, res) => {
  try {
    const univId = req.params.univId;
    const userId = req.query.userId;
    const ratingRec = await Rating.findOne({
      universityId: univId,
      userId: userId,
    });
    const answers = {};
    if (ratingRec) {
      ratingRec.answers.forEach((ans) => {
        answers[ans.questionId] = ans.answer;
      });
    }

    return res.json(answers);
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

export default ratingsRouter;
