#Step-by-step setup

Pre-requisite: Download and install docker. You will use it to run a local PostgreSQL database.
Before running the following commands, please start docker.

### installing all the required npm dependencies:
npm install
### starting local database:
docker run --name my_postgres_db -e POSTGRES_PASSWORD=database_username -d -p 5432:5432 postgres (if you set a different password, update the .env file as necessary)
### generating the necessary table structure:
npx prisma migrate reset
### openning database web client:
npx prisma studio

You can also test and read details of the API endpoints using Swagger, by oppenning your browser and typing:
http://localhost:3333/docs
