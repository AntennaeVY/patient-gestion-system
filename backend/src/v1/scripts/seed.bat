@echo off

set PGPASSWORD=password

psql -U postgres -d evaluex -f .\data\Contact.sql
psql -U postgres -d evaluex -f .\data\Account.sql
psql -U postgres -d evaluex -f .\data\Doctor.sql
psql -U postgres -d evaluex -f .\data\DoctorShift.sql
psql -U postgres -d evaluex -f .\data\Service.sql
psql -U postgres -d evaluex -f .\data\DoctorsOnServices.sql
psql -U postgres -d evaluex -f .\data\Appointment.sql
psql -U postgres -d evaluex -f .\data\AppointmentsOnServices.sql
