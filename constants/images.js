import { Image } from "react-native";

const images = {
    landing: require('../assets/images/landing.png')
}
const cacheImages = () => {
    return Object.keys(images).map(key => Image.prefetch(images[key]));
}

export default {
    landing : images.landing,
    cacheImages
}