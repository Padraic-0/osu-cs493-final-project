import { connection, executeQuery } from "../firebase.js";
import { QueryOptions } from "../types/database.js";
import { FirestoreCollection } from "../util/constants.js";
import { Model, ModelType } from "./model.js";

export interface CourseType extends ModelType {
  subject: string;
  classNumber: number;
  title: string;
  term: string;
  instructorId: number;
}

export class Course extends Model implements CourseType {
  //Fields
  subject: string;
  classNumber: number;
  title: string;
  term: string;
  instructorId: number;

  constructor(data: CourseType) {
    super(data.id, FirestoreCollection.COURSES);
    this.subject = data.subject;
    this.classNumber = data.classNumber;
    this.title = data.title;
    this.term = data.term;
    this.instructorId = data.instructorId;
  }

  toJSON(): CourseType {
    return {
      id: this.id,
      subject: this.subject,
      classNumber: this.classNumber,
      title: this.title,
      term: this.term,
      instructorId: this.instructorId,
    };
  }

  static async findById(id: string): Promise<Course> {
    return (await Course.findAll({ where: { id }, limit: 1 }))[0];
  }

  static async findAll(options?: QueryOptions<CourseType>): Promise<Course[]> {
    const query = connection.collection(FirestoreCollection.COURSES);
    return (await executeQuery<CourseType>(query, options)).map((data) => {
      return new Course(data);
    });
  }
}
