import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.get('/', ensureAuthenticated, async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find();
  
  return res.json(appointment);
})

appointmentsRouter.post('/', ensureAuthenticated, async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id
    })
    
    return res.json(appointment);
  } catch (err) {
    return res.status(err.status_code).json({ error: err.message });
  }
})

export default appointmentsRouter;
