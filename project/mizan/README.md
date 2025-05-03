To Do to get started:

* Copy mizan folder to your group repo
* run: npm install
* *Progessively* define your DB model in schema.prisma (under prisma subfolder). As you progress run:
  * **npx prisma migrate dev**
  * to apply the model changes to your database and regenrate the Prisma Client
* To generate the Prisma Client use: ***npx prisma generate***
* To reninitialize the dabase use: *npx prisma db seed*
* To run Prisma studio use: *npx prisma studio*
