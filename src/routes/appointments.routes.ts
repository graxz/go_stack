import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find();
  
  return res.json(appointment);
})

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider
    })
    
    return res.json(appointment);
  } catch (err) {
    return res.json({ error: err.message });
  }
})

export default appointmentsRouter;
