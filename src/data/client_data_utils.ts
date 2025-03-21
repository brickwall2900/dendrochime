import { NextURL } from "next/dist/server/web/next-url"

export type UserType = "citizen" | "expert" | "institution" | "admin"
export type IdType = number

export interface User {
    id: IdType,
    name: number,
    type: UserType,
    communities: IdType[]
}

export interface Community {
    id: IdType,
    name: string,
    description: string,
    memberCount: number
}

export interface CommunityMembers {
    id: IdType,
    members: IdType[]
}

export interface News {
    id: IdType,
    title: string,
    author: string,
    content: string,
    dateCreated: Date | number,
    dateModified: Date | number
}

export interface EducationalVideo {
    id: IdType,
    title: string,
    description: string,
    videoId: string
}

export interface LocationData {
    lat: number,
    long: number
}

export interface GreenSpace {
    name: string,
    location: LocationData,
    id: number
}

export interface TreeSpecies {
    species: string,
    id: number,
    biomass: number,
    c_stock: number,
    co2_stock: number,
    scientific_name: string,
    common_names: string[],
    family: string,
    native_location: string
}   

export interface ServerResponse<T> {
    status: string,
    statusCode: number,
    response?: T
}

export type IdSystem = {
    users: number,
    news: number,
    communities: number,
    educational_videos: number,
    green_spaces: number
}

function forwardResponse<T, U>(from: ServerResponse<T>): ServerResponse<U> {
    return {
        status: from.status,
        statusCode: from.statusCode
    }
}

// TODO: SWITCH TO AN ACTUAL DATABASE IN PRODUCTION!!
const SERVER_ID = "http://localhost:3000/api/v0/id"
const SERVER_USERS = "http://localhost:3000/api/v0/users"
const SERVER_COMMUNITIES = "http://localhost:3000/api/v0/communities"
const SERVER_COMMUNITY_MEMBERS = "http://localhost:3000/api/v0/community/members"
const SERVER_NEWS = "http://localhost:3000/api/v0/news"
const SERVER_EDUCATIONAL_VIDEOS = "http://localhost:3000/api/v0/educational-videos"
const SERVER_GREEN_SPACES = "http://localhost:3000/api/v0/green-spaces"
const SERVER_TREE_SPECIES = "http://localhost:3000/api/v0/cseq/tree-species"

function parseData<T>(data: T): T {
    if (Array.isArray(data)) {
        return data.map(parseData) as T;
    } else if (typeof data === "object" && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
                // if (key === "id" && typeof value === "string" && !isNaN(Number(value))) {
                //     return [key, Number(value)];
                // }
                if (typeof value === "number" && key.startsWith("date") && value > 0 && Number.isInteger(value)) {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                        return [key, date];
                    }
                }
                return [key, parseData(value)];
            })
        ) as T;
    }
    return data;
}

function serializeData<T>(data: T): T {
    if (Array.isArray(data)) {
        return data.map(serializeData) as T;
    } else if (typeof data === "object" && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
                // if (key === "id" && typeof value === "number") {
                //     return [key, value.toString()];
                // }
                if (value instanceof Date) {
                    return [key, value.getTime()];
                }
                return [key, serializeData(value)];
            })
        ) as T;
    }
    return data;
}

async function getSomething<T>(url: NextURL): Promise<ServerResponse<T>> {
    const response = await fetch(url);
    if (!response.ok) {
        return {
            status: response.statusText,
            statusCode: response.status
        }
    }

    const data0 = await response.json();

    // IF EVER...
    // const data = Array.isArray(data0)
    //     ? data0.map(item => ({ ...item, id: item.id ? parseInt(item.id) : item.id }))
    //     : { ...data0, id: data0.id ? parseInt(data0.id) : data0.id };
    // FOR NOW...
    const data = parseData(data0);

    return {
        status: response.statusText,
        statusCode: response.status,
        response: data
    };
}

export async function getId(): Promise<ServerResponse<IdSystem>> {
    return await getSomething<IdSystem>(new NextURL(SERVER_ID));
}

export const DEFAULT_PAGE = 0;
export const DEFAULT_LIMIT = 10;

export async function getTreeSpecies(query: string, page?: number, limit?: number): Promise<ServerResponse<TreeSpecies[]>> {
    const url = new NextURL(SERVER_TREE_SPECIES + `?q=${query}&page=${page || DEFAULT_PAGE}&limit=${limit || DEFAULT_LIMIT}`);
    return getSomething<TreeSpecies[]>(url);
}

export async function getGreenSpaces(): Promise<ServerResponse<GreenSpace[]>> {
    const url = new NextURL(SERVER_GREEN_SPACES);
    return getSomething<GreenSpace[]>(url);
}

export function isSuccess<T>(x: ServerResponse<T>): boolean {
    return 200 <= x.statusCode && x.statusCode < 400;
}

// POST

export async function postSomething<T>(url: NextURL, something: T): Promise<ServerResponse<T>> {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(serializeData(something)),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        return {
            status: response.statusText,
            statusCode: response.status
        }
    }

    return {
        status: response.statusText,
        statusCode: response.status,
        response: something
    };   
}

export async function addGreenSpace(greenSpace: GreenSpace): Promise<ServerResponse<GreenSpace>> {
    const url = new NextURL(SERVER_GREEN_SPACES);
    return await postSomething(url, greenSpace);
}