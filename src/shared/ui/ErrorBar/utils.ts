import { TIcon } from "@/assets/Icons/types";
import { StyleTheme } from "./ErrorBar";

interface Theme { Logo: TIcon, Border: string }
const YellowTheme: Theme = {
    Logo: 'AttentionYellow',
    Border: '2px solid #FFC107'
}
const BlueTheme: Theme = {
    Logo: 'AttentionBlue',
    Border: '2px solid #196D88'

}
const RedTheme: Theme = {
    Logo: 'AttentionRed',
    Border: '2px solid #FF7878'

}

export const BarStyle = (type: StyleTheme) => {
    switch (type) {
        case 'Yellow':
            return YellowTheme
            break;
        case 'Blue':
            return BlueTheme
            break;
        case 'Red':
            return RedTheme
            break;

    }
}