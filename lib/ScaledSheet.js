import {Platform, Dimensions} from 'react-native';
import { moderateScale, scale, verticalScale } from './scalingUtils';
import deepMap from './deepMap';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const validScaleSheetRegex = /^(\-?\d+(\.\d{1,2})?)@(ms(\d+(\.\d{1,2})?)?|s|vs)$/;
const scaleRegex = /^(\-?\d+(\.\d{1,2})?)@s$/;
const verticalScaleRegex = /^(\-?\d+(\.\d{1,2})?)@vs$/;
const moderateScaleRegex = /^(\-?\d+(\.\d{1,2})?)@ms(\d+(\.\d{1,2})?)?$/;


const hasiPhoneXAspectRatio = () => {
    if (platform === "ios") {
        const screenAspectRatio = Number((deviceHeight / deviceWidth).toFixed(2));
        return screenAspectRatio === 2.16;
    }
    return false;
};
  
const isIphoneX = (platform === "ios" 
    && (deviceHeight === 812 || deviceWidth === 812)) || hasiPhoneXAspectRatio();

const scaleByAnnotation = (value) => {
    if (!validScaleSheetRegex.test(value)) {
        return value;
    }
    const size = parseFloat(value.split('@')[0]);

    if (scaleRegex.test(value)) {
        return scale(size);
    }

    if (verticalScaleRegex.test(value)) {
        return verticalScale(size);
    }

    if (moderateScaleRegex.test(value)) {
        const scaleFactor = value.split('ms')[1];
        if (scaleFactor) {
            return moderateScale(size, parseFloat(scaleFactor));
        }
        return moderateScale(size);
    }
};

const ScaledSheet = {
    create: styleSheet => isIphoneX ? styleSheet : deepMap(styleSheet, scaleByAnnotation)
};

export default ScaledSheet;