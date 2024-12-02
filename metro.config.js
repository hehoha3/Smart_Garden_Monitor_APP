const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
    const config = getDefaultConfig(__dirname);

    // Thêm các phần mở rộng cần thiết cho D3
    config.resolver = {
        ...config.resolver,
        sourceExts: [...config.resolver.sourceExts, "cjs", "mjs"], // Thêm support cho CommonJS và ES Modules
    };

    // Kết hợp với cấu hình NativeWind
    return withNativeWind(config, { input: "./global.css" });
})();
