//Old API Handler
export interface PointercrateDemon {
    id: number;
    level_id: number;
    name: string;
    position: number;
    publisher: {
        id: number;
        name: string;
        banned: boolean;
    };
    requirement: number;
    verifier: {
        id: number;
        name: string;
        banned: boolean;
    };
    video: string | null;
}

export interface DemonListAPI{
    message: string
    data: {
        levels: DemonListLevel[]
    }
}

export interface DemonListLevel {
    id: number
    level_id: number
    position: number
    name: string
    publisher: DemonPublisher
    requirement?: number
    verifier: DemonVerifier
    video: string | null
}

export interface DemonPublisher {
    id?: number
    name: string
    banned?: boolean
}

export interface DemonVerifier {
    id: number
    name: string
    banned?: boolean
}

export interface SimplifiedDemon {
    name: string;
    position: number;
    video: string | null;
    creator: string;
    levelID?: number;
    link?: string;
}

export interface SelectedLists {
    main: boolean;
    extended: boolean;
    legacy: boolean;
}

export interface RouletteState {
    playing: boolean;
    selectedLists: SelectedLists
    demons: SimplifiedDemon[];
    current: number;
    percent: number;
    percents: number[];
}
