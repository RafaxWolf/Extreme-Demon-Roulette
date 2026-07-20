import type { DemonListLevel, SimplifiedDemon } from "../models/types";

export function simplifyDemon(demon: DemonListLevel): SimplifiedDemon {
    const match = demon.video?.match(/https:\/\/www\.youtube\.com\/watch\?v=(.{11})/);
    return {
        name: demon.name,
        creator: demon.publisher.name,
        position: demon.position,
        levelID: demon.level_id,
        video: match ? match[1] : null,
    };
}