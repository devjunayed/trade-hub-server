interface banner{
    imageUrl: string;
    link: string;
    title: string;
    description: string;
}
interface TUiConfig  {
    lightLogoUrl: string;
    darkLogoUrl: string;
    banners: banner[];
    views: number;
}