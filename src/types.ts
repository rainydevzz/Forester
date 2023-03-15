export interface EventOptions {
    name: string;
    run: Function;
}

export interface CooldownOptions {
    timestamp: number;
    cooldown: number;
    command: string;
}