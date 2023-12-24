// controller.d.ts
declare module '/controller' {

  interface Doctor {
    personId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    emailAddress: string;
    phoneNumber: string;
    gender: string;
    license: string;
    specialty: string;
  }

  interface Patient {
    personID: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    emailAddress: string;
    phoneNumber: string;
    gender: string;
    insurerAccountNumber: string;
    insurerName: string;
    medicalRecordNumber: string;
  }

  interface Appointment {
    personID: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    emailAddress: string,
    phoneNumber: string,
    gender: string,
    insurerAccountNumber: string,
    insurerName: string,
    medicalRecordNumber: string,
  }

  interface DoctorHandler {
    getDoctors: () => Promise<Doctor[]>;
  }

  interface PatientHandler {
    getPatients: () => Promise<Patient[]>;
  }

  interface AppointmentHandler {
    getAppointments: () => Promise<Appointment[]>;
  }

  const getDoctors: () => Promise<Doctor[]>;
  const getPatients: () => Promise<Patient[]>;
  const getAppointments: () => Promise<Appointments[]>;

  export { Doctor, DoctorHandler };
  export { Patient, PatientHandler };
  export { Appointment, AppointmentHandler };

  export = getDoctors;
  export = getPatients;
  export = getAppointments;
  }
  