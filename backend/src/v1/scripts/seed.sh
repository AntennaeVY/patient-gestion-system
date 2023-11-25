export PGPASSWORD="password"

psql -h 0.0.0.0 -U postgres -d evaluex -f ./data/Contact.sql
psql -h 0.0.0.0 -U postgres -d evaluex -f ./data/Account.sql
psql -h 0.0.0.0 -U postgres -d evaluex -f ./data/Doctor.sql
psql -h 0.0.0.0 -U postgres -d evaluex -f ./data/DoctorShift.sql
psql -h 0.0.0.0 -U postgres -d evaluex -f ./data/Service.sql
psql -h 0.0.0.0 -U postgres -d evaluex -f ./data/DoctorsOnServices.sql
psql -h 0.0.0.0 -U postgres -d evaluex -f ./data/Appointment.sql
psql -h 0.0.0.0 -U postgres -d evaluex -f ./data/AppointmentsOnServices.sql
