import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = appointmentsRepository.find();

  return res.status(200).json(appointment);
})

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider,
      date: parsedDate
    })
    
    return res.status(200).json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
})
