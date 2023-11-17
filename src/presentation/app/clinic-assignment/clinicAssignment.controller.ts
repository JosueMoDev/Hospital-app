import { Request, Response } from "express";
import { ClinicAssignmentService } from "../../services";
import { CreateClinicAssignmentDto, HandlerError } from "../../../domain";

export class ClinicAssignmentController {
  constructor(
    private readonly clinicAssignmentService: ClinicAssignmentService
  ) {}

  createClinicAssignment = (request: Request, response: Response) => {
    const [error, createClinicAssignmentDto] = CreateClinicAssignmentDto.create(
      request.body
    );
    if (error) return response.status(400).json({ error });

    this.clinicAssignmentService
      .creatingClinicAssignment(createClinicAssignmentDto!)
      .then((clinicAssignment) => response.json(clinicAssignment))
      .catch((error) => {
        const { statusCode, errorMessage } = HandlerError.hasError(error);
        return response.status(statusCode).json({ error: errorMessage });
      });
  };
}
