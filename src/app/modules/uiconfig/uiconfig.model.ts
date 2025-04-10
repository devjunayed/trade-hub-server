import { model, Schema } from "mongoose";

const bannerSchema = new Schema<Tbanner>({
    imageUrl: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }   
});

const uiConfigSchema = new Schema<TUiConfig>({
    lightLogoUrl: {
        type: String,
    },
    darkLogoUrl: {
        type: String,
    },
    banners: {
        type: [bannerSchema],
    },
    isDeveloperModeOn: {
        type: Boolean,
    },
    views: {
        type: Number,
        default: 0
    }
})

export const UiConfig = model<TUiConfig>("uiconfig", uiConfigSchema);