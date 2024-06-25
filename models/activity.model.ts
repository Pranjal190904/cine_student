import { Schema, Document, model } from "mongoose";

interface IOrder {
    subject: string;
    order: number[];
}

interface IActivity extends Document {
    userId: string;
    firstLoginTime: Date;
    preferredLanguage: string;
    lastVisited: Date;
    order: IOrder[];
}

const OrderSchema = new Schema<IOrder>({
    subject: { type: String, required: true },
    order: { type: [Number], required: true }
}, { _id: false });  // Disable _id for OrderSchema

const ActivitySchema = new Schema<IActivity>({
    userId: { type: String, required: true },
    firstLoginTime: { type: Date },
    preferredLanguage: { type: String },
    lastVisited: { type: Date },
    order: { type: [OrderSchema] }
});

const ActivityModel = model<IActivity>('Activity', ActivitySchema);

export default ActivityModel;