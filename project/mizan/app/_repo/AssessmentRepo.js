import fs from "fs-extra";
import path from "path";
import prisma from "@/lib/prisma";
import sectionRepo from "@/app/_repo/SectionRepo";
import { capitalize } from "@/app/actions/utils";

class AssessmentRepo {
  async getAssessmentTypes() {
    return await prisma.assessmentType.findMany();
    //const filePath = path.join(process.cwd(), "data/assessment-types.json");
    //return fs.readJson(filePath);
  }

  constructor() {
    this.assessmentFilePath = path.join(process.cwd(), "data/assessments.json");
  }

  async #readAssessments() {
    return fs.readJson(this.assessmentFilePath);
  }

  async #writeAssessments(assessments) {
    await fs.writeJson(this.assessmentFilePath, assessments);
  }

  async getAssessmentById(id) {
    const assessments = await this.#readAssessments();
    return assessments.find((a) => a.id == id);
  }

  async getAssessmentsBySection(sectionCRN) {
    const assessments = await this.#readAssessments();
    return assessments.filter((a) => a.sectionCRN === sectionCRN);
  }

  async countAssessmentsByType(sectionCRN, type) {
    const assessments = await this.getAssessmentsBySection(sectionCRN);
    return assessments.filter((a) => a.type === type).length;
  }

  async countAssessmentsByDueDate(sectionCRN, dueDate) {
    const assessments = await this.getAssessmentsBySection(sectionCRN);
    return assessments.filter((a) => a.dueDate === dueDate).length;
  }

  async #getUserAssessments(user, semesterId) {
    const userSections = await sectionRepo.getSections(user, semesterId);
    const sectionCRNs = userSections.map((s) => s.crn);
    const assessments = await this.#readAssessments();
    return assessments.filter((a) => sectionCRNs.includes(a.sectionCRN));
  }

  async getAssessments(user, semesterId, sectionCRN) {
    if (!user && (!sectionCRN || sectionCRN === "all")) return [];

    const assessments =
      sectionCRN && sectionCRN !== "all"
        ? await this.getAssessmentsBySection(sectionCRN)
        : await this.#getUserAssessments(user, semesterId);

    // Sort by section CRN
    assessments.sort((a, b) => a.sectionCRN.localeCompare(b.sectionCRN));

    // Enrich with section data
    for (const assessment of assessments) {
      assessment.section = await sectionRepo.getSectionById(
        assessment.sectionCRN
      );
    }

    return assessments;
  }

  async addAssessment(assessment) {
    assessment.id = Date.now();
    const assessments = await this.#readAssessments();
    assessments.push(assessment);
    await this.#writeAssessments(assessments);
    return assessment;
  }

  async updateAssessment(updatedAssessment) {
    const assessments = await this.#readAssessments();
    const index = assessments.findIndex((a) => a.id === updatedAssessment.id);

    if (index === -1) throw new Error("Assessment not found");

    assessments[index] = updatedAssessment;
    await this.#writeAssessments(assessments);
    return updatedAssessment;
  }

  async deleteAssessment(id) {
    const assessments = await this.#readAssessments();
    const updatedAssessments = assessments.filter((a) => a.id !== id);
    await this.#writeAssessments(updatedAssessments);
  }

  async generateAssessmentTitle(sectionCRN, type) {
    const count = (await this.countAssessmentsByType(sectionCRN, type)) + 1;
    return type === "project"
      ? `Project Phase ${count}`
      : `${capitalize(type)} ${count}`;
  }

  async getAssessmentSummary(user, semesterId) {
    const assessments = await this.getAssessments(user, semesterId, "all");
    // Group assessments by sectionCRN and type then compute
    // the count and total effort hours
    const summary = assessments.reduce((acc, assessment) => {
      const key = `${assessment.sectionCRN}-${assessment.type}`;

      if (!acc[key]) {
        acc[key] = {
          sectionCRN: assessment.sectionCRN,
          courseName: `${assessment.section.courseCode} - ${assessment.section.courseName}`,
          type: assessment.type,
          count: 0,
          effortHours: 0,
        };
      }

      acc[key].count += 1;
      acc[key].effortHours += assessment.effortHours;
      return acc;
    }, {});

    console.log("Assessment Summary:", Object.values(summary));
    return Object.values(summary);
  }
}

export default new AssessmentRepo();
