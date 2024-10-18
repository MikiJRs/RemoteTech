import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IQuestionPackage extends Document {
    packageName: string;
    questions: string[];
}

interface IQuestion {
    questionText: string;
    
    question_time: {
        hours: number,
        minutes: number,
        seconds: number
    }
}

const questionSchema = new Schema<IQuestion>({
    questionText: { type: String, required: true },
    question_time: {
        hours: { type: Number },
        minutes: { type: Number },
        seconds: { type: Number },

    },
});


const questionPackageSchema = new Schema<IQuestionPackage>({
    packageName: { type: String, required: true, unique: true },
    questions: [questionSchema],
  }, { timestamps: true });
  

const QuestionPackage = mongoose.model<IQuestionPackage>('QuestionPackage', questionPackageSchema);

export default QuestionPackage;