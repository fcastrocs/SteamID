export default abstract class SteamId {
  private static readonly BASE = BigInt("76561197960265728");

  /**
   * Convert a SteamID64 or SteamID32 to legacy SteamID
   * @param SteamId - The SteamID as steamID64(string or bigint) or SteamID32(number)
   * @returns STEAM_X:Y:Z
   */
  static toLegacy(steamId: string | bigint | number): string {
    let input: bigint;

    if (typeof steamId === "number") {
      input = SteamId.steamID32To64(steamId);
    } else {
      input = BigInt(steamId);
    }

    /**
     * X represents the "Universe" the steam account belongs to. If 'X' is 0, then this is Universe 1 (Public).
     * Y is the lowest bit of the Account ID. Thus, Y is either 0 or 1.
     * Z is the highest 31 bits of the Account ID.
     */

    // Determine Y
    const y = input % BigInt(2) === BigInt(1) ? 1 : 0;

    // Determine z
    const z = (input - BigInt(y) - SteamId.BASE) / BigInt(2);

    return `STEAM_0:${y}:${z.toString()}`;
  }

  /**
   * Convert a legacy SteamID or SteamID32 to SteamID64.
   * @param SteamId - The legacy SteamID or SteamID32
   * @returns The SteamID64 as a decimal string
   */
  static to64(steamId: string | number): string {
    if (typeof steamId === "number") {
      return SteamId.steamID32To64(steamId).toString();
    }

    // Regular expression to match the legacy SteamID format
    const match = steamId.match(/^STEAM_0:([01]):(\d+)$/);

    if (!match) {
      throw new Error("Invalid legacy SteamID format");
    }

    // Extract Y and Z from the matched groups
    const y = Number(match[1]);
    const z = BigInt(match[2]);

    // Calculate SteamID64 based on the provided formula
    const steamId64 = SteamId.BASE + BigInt(y) + z * 2n;

    // Return the SteamID64 as a decimal string
    return steamId64.toString();
  }

  /**
   * Convert a legacy SteamID or SteamID64 to SteamID32
   * @param steamId - The legacy SteamID or SteamID64
   * @returns The SteamID32 as a number
   */
  static to32(steamId: string | bigint): number {
    let id64: bigint;

    if (typeof steamId === "string" && steamId.includes("STEAM")) {
      id64 = BigInt(SteamId.to64(steamId));
    } else {
      id64 = BigInt(steamId);
    }

    const MASK = BigInt(0xffffffff);

    // Calculate the SteamID32
    const id32 = Number(id64 - SteamId.BASE) & Number(MASK);

    // Validate the result
    if (id32 < 0 || id32 > 0xffffffff) {
      throw new Error("Invalid SteamID64");
    }

    return id32;
  }

  /**
   * Convert a legacy SteamID, SteamID32, or SteamID64 to Profile URL
   * @param steamId -The legacy SteamID, SteamID32 or SteamID64
   * @returns The Steam Profile URL
   */
  static toProfileURL(steamId: string | bigint | number) {
    let id64: bigint | string;

    if (typeof steamId === "string" && steamId.includes("STEAM")) {
      id64 = SteamId.to64(steamId);
    } else if (typeof steamId === "number") {
      id64 = SteamId.steamID32To64(steamId);
    } else {
      id64 = steamId;
    }

    return `https://steamcommunity.com/profiles/${id64}`;
  }

  private static steamID32To64(steamID32: number): bigint {
    // Ensure the SteamID32 is within valid range
    if (steamID32 < 0 || steamID32 > 0xffffffff) {
      throw new Error("Invalid SteamID32");
    }

    // Extract Y and Z from the SteamID32
    const y = steamID32 & 1; // Extract the lowest bit
    const z = (steamID32 >> 1) >>> 0; // Extract the remaining bits and ensure it's an unsigned 32-bit integer

    // Calculate SteamID64
    const id64 = SteamId.BASE + BigInt(z) * 2n + BigInt(y);

    // Return the SteamID64 as a decimal string
    return id64;
  }
}
