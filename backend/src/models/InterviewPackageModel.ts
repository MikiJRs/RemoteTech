import mongoose, { Schema, Document, Types } from 'mongoose';

export interface InterviewInterface extends Document {
    interviewTitle: string,
    extraQuestions: extraQuestions[],
    expireDate: Date,
    packageIds: packageIds[]
    
}

interface extraQuestions {
    question: string,
    time: number
}

interface packageIds {
    packageId: string
}

const extraQuestionSchema = new Schema<extraQuestions>({
    question: {type: String, required: true},
    time: {type: Number, required: true}

})
const packageIdSchema = new Schema<packageIds>({
    packageId: {type: String, required: true}

})


const InterviewSchema = new Schema<InterviewInterface>({
    interviewTitle: { type: String, required: true},
    extraQuestions: [extraQuestionSchema],
    expireDate: {type: Date, required: true},
    packageIds: [packageIdSchema]
  }, { timestamps: true });


const Interview = mongoose.model<InterviewInterface>('Interview', InterviewSchema);

export default Interview;