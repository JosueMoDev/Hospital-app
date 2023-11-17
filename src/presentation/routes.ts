import { Router } from "express";
import { AccountRoutes, AppointmentRoutes, AuthenticationRoutes, ClinicAssignmentRoutes, ClinicRoutes, FileRoutes, RecordRoutes } from "./app";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();

        router.use('/api/account', AccountRoutes.routes);
        router.use('/api/appointment', AppointmentRoutes.routes);
        router.use('/api/authentication', AuthenticationRoutes.routes);
        router.use('/api/clinic-assignment', ClinicAssignmentRoutes.routes);
        router.use('/api/clinic', ClinicRoutes.routes);
        router.use('/api/file', FileRoutes.routes);
        router.use('/api/record', RecordRoutes.routes);


        return router;
    }
}