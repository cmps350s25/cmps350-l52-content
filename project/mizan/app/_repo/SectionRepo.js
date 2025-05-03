import fs from "fs-extra";
import path from "path";

class SectionRepo {
  constructor() {
    this.sectionFilePath = path.join(process.cwd(), "data/sections.json");
  }

  async #readSections() {
    return await fs.readJson(this.sectionFilePath);
  }

  async getSectionById(sectionCRN) {
    const sections = await this.#readSections();
    return sections.find(section => section.crn === sectionCRN);
  }

  async getSections(user, semesterId) {
    console.log("SectionRepo.getSections - Semester ID:", semesterId);
    
    if (!user) return [];

    const sections = await this.#readSections();
    // First filter by semester
    const semesterSections = sections.filter(section => 
      section.semester === semesterId
    );

    // Then filter by user role
    if (user.isStudent) {
      const studentSections = semesterSections.filter(section => 
        user.registeredSections.includes(section.crn)
      );
      console.log("Student Sections:", studentSections);
      return studentSections;
    }

    if (user.isInstructor) {
      return semesterSections.filter(section => 
        section.instructorId === user.id
      );
    }

    if (user.isCoordinator) {
      return semesterSections.filter(section => 
        section.program === user.program
      );
    }
    
    return [];
  }
}

export default new SectionRepo();