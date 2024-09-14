import SteamId from "./index.js";

console.log(SteamId.toLegacy(76561197960410044n));
console.log(SteamId.toLegacy("76561197960410044"));
console.log(SteamId.toLegacy(144316));

console.log(SteamId.to64("STEAM_0:0:72158"));
console.log(SteamId.to64(144316));

console.log(SteamId.to32("STEAM_0:0:72158"));
console.log(SteamId.to32(76561197960410044n));
console.log(SteamId.to32("76561197960410044"));

console.log(SteamId.toProfileURL(76561197960410044n));
console.log(SteamId.toProfileURL("STEAM_0:0:72158"));
console.log(SteamId.toProfileURL("76561197960410044"));
console.log(SteamId.toProfileURL(144316));
