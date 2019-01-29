import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
const isPad = Platform.isPad;

//Guideline sizes are based on iPhone X
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

const scale = size => (isPad ? size : (shortDimension / guidelineBaseWidth) * size);
const verticalScale = size => (isPad ? size : (longDimension / guidelineBaseHeight) * size);
const moderateScale = (size, factor = 0.5) => (isPad ? size : size + (scale(size) - size) * factor);

export { scale, verticalScale, moderateScale };
