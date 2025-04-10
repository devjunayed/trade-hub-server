interface Tbanner{
    imageUrl: string;
    link: string;
    title: string;
    description: string;
}
interface TUiConfig  {
    lightLogoUrl: string;
    darkLogoUrl: string;
    banners: Tbanner[];
    isDeveloperModeOn: boolean;
    views: number;
}