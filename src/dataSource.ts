import { DataSource } from "typeorm";
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: parseInt(process.env.POSTGRESDB_PORT!),
	username: process.env.POSTGRESDB_USER,
	password: process.env.POSTGRESDB_PASSWORD,
	database: process.env.POSTGRESDB_DATABASE,
	synchronize: true,
	logging: true,
	entities: [User],
	subscribers: [],
	migrations: ["src/migrations/**/*.ts"],
});

// export const initDb = async (cb: () => void) => {
// 	try {
// 		await AppDataSource.initialize();
// 		cb();
// 	} catch (error) {
// 		console.log("❌ Database connection error: ", error);
// 	}
// };

export const userRepo = AppDataSource.getRepository(User);
