import mongoose, { Schema } from 'mongoose';

export interface IResult extends mongoose.Document {
  status: 'Queued' | 'In Progress' | 'Success' | 'Failure';
  repositoryName: string;
  findings: Record<string, any>;
  queuedAt: Date;
  scanningAt: Date;
  finishedAt: Date;
}

const ResultSchema: Schema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['Queued', 'In Progress', 'Success', 'Failure'],
      required: true,
    },
    repositoryName: {
      type: String,
      required: true,
    },
    findings: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    queuedAt: {
      type: Date,
      required: true,
    },
    scanningAt: {
      type: Date,
      default: null,
    },
    finishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Result = mongoose.model<IResult>('Result', ResultSchema);

export default Result;
