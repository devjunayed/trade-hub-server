import { UiConfig } from "./uiconfig.model";

const updateSettingsIntoDB = async(settings: any) => {
    const uiconfig = await UiConfig.findOne({});
    if (uiconfig) {
        await UiConfig.updateOne({}, { $set: settings });
    } else {
        await UiConfig.create(settings);
    }
    return uiconfig;
}

const increaseSiteViewCountIntoDb = async () => {
    const uiconfig = await UiConfig.find();
    if (uiconfig.length === 0) {
        await UiConfig.create({ views: 1 });
    } else {
        await UiConfig.updateOne({}, { $inc: { views: 1 } });
    }

    return uiconfig
}

export const UiConfigServices = {
    increaseSiteViewCountIntoDb,
    updateSettingsIntoDB
}