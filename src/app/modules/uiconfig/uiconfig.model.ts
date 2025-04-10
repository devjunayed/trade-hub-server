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
        required: true,
    },
    darkLogoUrl: {
        type: String,
        required: true, 
    },
    banners: {
        type: [bannerSchema],
        required: true,
    },
    isDeveloperModeOn: {
        type: Boolean,
        required: true,
    },
    views: {
        type: Number,
        required: true,
    }
})

export const UiConfig = model<TUiConfig>("uiconfig", uiConfigSchema);