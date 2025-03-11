import { model, Schema } from "mongoose";

const uiConfigSchema = new Schema<TUiConfig>({
    views: {
        type: Number,
        required: true,
    }
})

export const UiConfig = model<TUiConfig>("uiconfig", uiConfigSchema);