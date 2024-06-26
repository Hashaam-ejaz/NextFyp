import { Schema, Types, model, Document, models } from "mongoose";

interface IBankInfo extends Document {
    shopName: string;
    shopAddress: string;
    returnAddress: string;
    customerCarePhone?: string;
    bankName: string;
    iban: string;
    accName: string;
    userID: Types.ObjectId;
    cnic: string;
}

const bankInfoSchema = new Schema<IBankInfo>({
    shopName: {
        type: String,
        required: true,
    },
    shopAddress: {
        type: String,
        required: true,
    },
    returnAddress: {
        type: String,
        required: true,
    },
    customerCarePhone: {
        type: String,
        required: false,
    },
    bankName: {
        type: String,
        required: true,
    },
    iban: {
        type: String,
        required: true,
    },
    accName: {
        type: String,
        required: true,
    },
    userID: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
});

const BankInfo = models.BankInfo || model<IBankInfo>("BankInfo", bankInfoSchema);

export { BankInfo };
export type { IBankInfo };