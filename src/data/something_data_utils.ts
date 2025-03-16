import assert from "assert"
import { NextURL } from "next/dist/server/web/next-url"

export type UserType = "citizen" | "expert" | "institution" | "admin"
export type IdType = number

export type User = {
    id: IdType,
    name: number,
    type: UserType,
    communities: [ IdType ]
}

export type Community = {
    id: IdType,
    name: string,
    description: string,
    memberCount: number
}

export type CommunityMembers = {
    id: IdType,
    members: [ IdType ]
}

export type News = {
    id: IdType,
    title: string,
    content: string,
    dateCreated: Date,
    dateModified: Date
}

export type ServerResponse<T> = {
    status: string,
    statusCode: number,
    response?: T
}

// TODO: SWITCH TO AN ACTUAL DATABASE IN PRODUCTION!!
const SERVER_USERS = "http://localhost:3001/users"
const SERVER_COMMUNITIES = "http://localhost:3001/communities"
const SERVER_COMMUNITY_MEMBERS = "http://localhost:3001/community_members"
const SERVER_NEWS = "http://localhost:3001/news"

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

export async function getUser(id: IdType): Promise<ServerResponse<User>> {    
    const url = new NextURL(SERVER_USERS + "/" + encodeURIComponent(id));
    return getSomething<User>(url);
}

export async function getCommunity(id: IdType): Promise<ServerResponse<Community>> {    
    const url = new NextURL(SERVER_COMMUNITIES + "/" + encodeURIComponent(id));
    return getSomething<Community>(url);
}

export async function getCommunityMembers(id: IdType): Promise<ServerResponse<CommunityMembers>> {    
    const url = new NextURL(SERVER_COMMUNITY_MEMBERS + "/" + encodeURIComponent(id));
    return getSomething<CommunityMembers>(url);
}

export async function getNews(id: IdType): Promise<ServerResponse<News>> {    
    const url = new NextURL(SERVER_NEWS + "/" + encodeURIComponent(id));
    return getSomething<News>(url);
}

export const DEFAULT_PAGE = 0;
export const DEFAULT_LIMIT = 10;

export async function getPopularCommunities(page?: number, limit?: number): Promise<ServerResponse<Community[]>> {
    const url = new NextURL(SERVER_COMMUNITIES + `?_sort=memberCount&_order=desc&_page=${page || DEFAULT_PAGE}&_limit=${limit || DEFAULT_LIMIT}`);
    return getSomething<Community[]>(url);
}

export async function getLatestNews(page?: number, limit?: number): Promise<ServerResponse<News[]>> {
    const url = new NextURL(SERVER_NEWS + `?_sort=dateCreated&_order=desc&_page=${page || DEFAULT_PAGE}&_limit=${limit || DEFAULT_LIMIT}`);
    return getSomething<News[]>(url);
}

export async function getUsers(id: IdType[]): Promise<ServerResponse<User[]>> {
    const thing = id.map((x) => (`id=${x}`));
    const url = new NextURL(SERVER_COMMUNITIES + `?${thing.join("&")}`);
    return getSomething<User[]>(url);
}

export function isSuccess<T>(x: ServerResponse<T>): boolean {
    return 200 <= x.statusCode && x.statusCode < 300;
}