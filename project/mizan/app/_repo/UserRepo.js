import fs from "fs-extra";
import path from "path";

/* ToDo: Refactor this code to use a database instead of a JSON file.
   When refactoring to use a database, remove private method: 
    #readUsers
   Implement database queries for getUser and login instead.
*/
class UserRepo {
  constructor() {
    this.filePath = path.join(process.cwd(), "data/users.json");
  }

  // Private method to fetch all users from the JSON file
  async #readUsers() {
    return fs.readJSON(this.filePath);
  }

  async getUser(id) {
    const users = await this.#readUsers();
    return users.find((user) => user.id === id);
  }

  // Public method to authenticate a user by email and password
  async login(email, password) {
    const users = await this.#readUsers();
    const user = users.find((user) => user.email === email);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      throw new Error("Incorrect username or password.");
    }
    // Remove password from user object for security
    delete user.password;
    user.name = `${user.firstName} ${user.lastName}`;
    user.isStudent = user.role === "Student";
    user.isInstructor = user.role === "Instructor";
    user.isCoordinator = user.role === "Coordinator";
    return user;
  }
}

export default new UserRepo();
