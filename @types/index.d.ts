export default abstract class SteamId {
  /**
   * Convert a SteamID64 or SteamID32 to legacy SteamID
   * @param SteamId - The SteamID as steamID64(string or bigint) or SteamID32(number)
   * @returns STEAM_X:Y:Z
   */
  static toLegacy(steamId: string | bigint | number): string;

  /**
   * Convert a legacy SteamID or SteamID32 to SteamID64.
   * @param SteamId - The legacy SteamID or SteamID32
   * @returns The SteamID64 as a decimal string
   */
  static to64(steamId: string | number): string;

  /**
   * Convert a legacy SteamID or SteamID64 to SteamID32
   * @param steamId - The legacy SteamID or SteamID64
   * @returns The SteamID32 as a number
   */
  static to32(steamId: string | bigint): number;

  /**
   * Convert a legacy SteamID, SteamID32, or SteamID64 to Profile URL
   * @param steamId -The legacy SteamID, SteamID32 or SteamID64
   * @returns The Steam Profile URL
   */
  static toProfileURL(steamId: string | bigint | number): string;
}
