import { UiConfig } from "./uiconfig.model";

const updateSettingsIntoDB = async (settings: any) => {
  const uiconfig = await UiConfig.findOne({});
  if (uiconfig) {
    await UiConfig.updateOne({}, { $set: settings, upsert: true });
  } else {
    await UiConfig.create(settings);
  }
  return uiconfig;
};

const increaseSiteViewCountIntoDb = async () => {
    let uiconfig = await UiConfig.findOne();
  
    if (!uiconfig) {
      uiconfig = await UiConfig.create({ views: 1 });
    } else {
      await UiConfig.updateOne({}, { $inc: { views: 1 }, upsert: true });
      uiconfig = await UiConfig.findOne(); // fetch updated document
    }
  
    return uiconfig;
  };
  

export const UiConfigServices = {
  increaseSiteViewCountIntoDb,
  updateSettingsIntoDB,
};
