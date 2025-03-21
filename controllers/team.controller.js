import { RESPONSE_TYPES } from "../constants/responceType.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { Team } from "../models/team.models.js";
import { logError } from "../utils/logger.js";

export async function createTeam(req, res) {
  try {
    const { name, description, size, members } = req.body;

    if (!name || !size) {
      logError(import.meta.url, "Please provide all the required fields");
      res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Please provide all the required fields",
        payload: null,
      });
      return;
    }

    const lead = req.user._id;
    console.log("lead", lead);

    const team = await Team.create({
      name,
      description: description || "",
      size,
      members: members || [lead],
    });

    res.status(STATUS_CODES.CREATED).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "Team created successfully",
      payload: team,
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function listTeam(req, res) {
  try {
    const teams = await Team.find();
    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "Team fetched successfully",
      payload: teams,
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function getTeamDetails(req, res) {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Team not found",
        payload: null,
      });
    } else {
      res.status(STATUS_CODES.OK).json({
        type: RESPONSE_TYPES.SUCCESS,
        message: "Team fetched successfully",
        payload: team,
      });
    }
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function updateTeam(req, res) {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!team) {
      res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Team not found",
        payload: null,
      });
    } else {
      res.status(STATUS_CODES.OK).json({
        type: RESPONSE_TYPES.SUCCESS,
        message: "Team updated successfully",
        payload: team,
      });
    }
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function deleteTeam(req, res) {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Team not found",
        payload: null,
      });
    } else {
      res.status(STATUS_CODES.OK).json({
        type: RESPONSE_TYPES.SUCCESS,
        message: "Team deleted successfully",
        payload: team,
      });
    }
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}
