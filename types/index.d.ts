/**
 * A simple NodeJS framework for the NodeJS Discord API wrapper Eris, which makes bot development easier for developers.
 * @author Midnight Development <contact.midnightdev@gmail.com>
 * @copyright
 * @license Apache-2.0
 * @version 1.0.0
 */
declare module "midnight.js" {
    import {
        AllowedMentions,
        Client,
        Command,
        Constants,
        Message as ErisMessage,
    } from "eris";
    import { Collection } from "@discordjs/collection";
    import { EventEmitter } from "events";
    import Database from "repl";

    // Package Information
    export const author: string;
    export const contributors: string[];
    export const description: string;
    export const homepage: string;
    export const keywords: string[];
    export const license: string;
    export const maintainers: string[];
    export const name: string;
    export const version: string;

    // Options
    namespace Options {
        // Bot Related
        export interface BotOptions {
            allowedMentions?: AllowedMentions;
            database?: boolean;
            description?: string;
            defaultImageFormat?: Types.ImageFormat;
            defaultImageSize?: number;
            filterMessages?: boolean;
            getAllUsers?: boolean;
            owners: string[];
            platform?: Types.BotPlatform;
            prefix: string | string[];
            sharding?: boolean;
            token: string;
        }

        export interface BotStatusOptions {
            status?: Types.BotStatus;
            text: string;
            type: Types.BotActivity;
            url?: string;
        }

        // Command Related
        export interface ArgumentOptions {
            description: string;
            name: string;
            prompt: ArgumentPrompt;
            required: boolean;
            type: Types.ArgumentType;
        }

        export interface ArgumentPrompt {
            cancel?: string;
            start: (...args: any[]) => string;
            retry: (...args: any[]) => string;
            required?: boolean;
            timeout?: number;
        }

        export interface CommandOptions {
            // Information
            aliases?: string | string[];
            category?: string;
            description?: string;
            examples?: string | string[];
            name: string;
            usage?: string;

            // Restrictions
            allowBots?: boolean;
            allowedChannels?: Types.CommandChannel;
            clientPermissions?:
                | keyof Constants["Permissions"]
                | (keyof Constants["Permissions"])[];
            cooldownLength?: number;
            ownerOnly?: boolean;
            userPermissions?:
                | keyof Constants["Permissions"]
                | (keyof Constants["Permissions"])[];

            // Restriction Exceptions
            ignoreCooldowns?: string | string[];
            ignorePermissions?: string | string[];

            // Extra
            args: Options.ArgumentOptions | Options.ArgumentOptions[]; // Create class for arguments later
            prefix?:
                | string
                | ((message: Structures.Message) => Promise<string>);
        }

        export interface EventOptions {
            event: string | symbol;
            listener: (...args: any[]) => void;
        }
    }

    // Structures
    namespace Structures {
        class Command {
            public constructor(bot: Bot, options: Options.CommandOptions);
            public bot: Bot;

            public aliases: string | string[];
            public category: string;
            public description: string;
            public examples: string | string[];
            public name: string;
            public usage: string;

            public allowBots: boolean;
            public allowedChannels: Types.CommandChannel;
            public clientPermissions:
                | keyof Constants["Permissions"]
                | (keyof Constants["Permissions"])[];
            public cooldownLength: number;
            public ownerOnly: boolean;
            public userPermissions:
                | keyof Constants["Permissions"]
                | (keyof Constants["Permissions"])[];

            public ignoreCooldowns: string | string[];
            public ignorePermissions: string | string[];

            public args: Options.ArgumentOptions | Options.ArgumentOptions[]; // Create class for arguments later
            public prefix?:
                | string
                | ((message: Structures.Message) => Promise<string>);

            public exec(
                args: object,
                message: Structures.Message
            ): any | Promise<any>;
        }

        class Listener {
            public constructor(bot: Bot, options: Options.EventOptions);
        }

        class Message extends ErisMessage {
            public bot: Bot;

            public lineReply(content: any, options: any): Promise<any>;
            public lineReplyNoMention(content: any, options: any): Promise<any>;
        }
    }

    // Types
    namespace Types {
        // Bot Related
        export type BotActivity =
            | "watching"
            | "listening"
            | "playing"
            | "streaming"
            | "competing";
        export type BotPlatform = "desktop" | "web" | "mobile";
        export type BotStatus = "online" | "idle" | "dnd" | "offline";

        // Command Related
        export type ArgumentType =
            | "textChannel"
            | "newsChannel"
            | "anyChannel"
            | "storeChannel"
            | "inviteChannel"
            | "categoryChannel"
            | "role"
            | "guildMember"
            | "permission";
        export type CommandChannel = "guild" | "dm" | "all";

        // Module Related
        export type ImageFormat = "png" | "jpg" | "gif" | "webp";
    }

    // Classes
    export class Bot {
        public constructor(options?: Options.BotOptions);
        private client: Client;
        public commands: Collection<string, Structures.Command>;
        public database: Database.REPLCommand;
        public music: any;
        public util: any;

        public description: string;
        public owners: string[];
        public platform: Types.BotPlatform;

        public addCommand(options?: Options.CommandOptions): void;
        public addEvent(options: Options.EventOptions): void;
        public addLavalinkServer(
            url: string,
            password: string,
            debug?: boolean
        );
        private init(): void;
        public onMessage(): any;
        public setStatus(options: Options.BotStatusOptions): void;
        public start(): Promise<void>;
    }
}
