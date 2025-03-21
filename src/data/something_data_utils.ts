import assert from "assert"
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

export async function getId(): Promise<ServerResponse<IdSystem>> {
    return await getSomething<IdSystem>(new NextURL(SERVER_ID));
}

async function updateId(id: IdSystem) {
    return await postSomething<IdSystem>(new NextURL(SERVER_ID), id);
}

function forwardResponse<T, U>(from: ServerResponse<T>): ServerResponse<U> {
    return {
        status: from.status,
        statusCode: from.statusCode
    }
}

// TODO: SWITCH TO AN ACTUAL DATABASE IN PRODUCTION!!
const SERVER_ID = "http://localhost:3001/id"
const SERVER_USERS = "http://localhost:3001/users"
const SERVER_COMMUNITIES = "http://localhost:3001/communities"
const SERVER_COMMUNITY_MEMBERS = "http://localhost:3001/community_members"
const SERVER_NEWS = "http://localhost:3001/news"
const SERVER_EDUCATIONAL_VIDEOS = "http://localhost:3001/educational_videos"
const SERVER_GREEN_SPACES = "http://localhost:3001/green_spaces"
const SERVER_TREE_SPECIES = "http://localhost:3001/cseq_tree_species"

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

export async function getEducationalVideo(id: IdType): Promise<ServerResponse<EducationalVideo>> {    
    const url = new NextURL(SERVER_EDUCATIONAL_VIDEOS + "/" + encodeURIComponent(id));
    return getSomething<EducationalVideo>(url);
}

export async function getEducationalVideoList(page?: number, limit?: number): Promise<ServerResponse<EducationalVideo[]>> {
    const url = new NextURL(SERVER_EDUCATIONAL_VIDEOS + `?_page=${page || DEFAULT_PAGE}&_limit=${limit || DEFAULT_LIMIT}`);
    return getSomething<EducationalVideo[]>(url);
}

export async function getGreenSpaces(): Promise<ServerResponse<GreenSpace[]>> {
    const url = new NextURL(SERVER_GREEN_SPACES);
    return getSomething<GreenSpace[]>(url);
}

export async function getTreeSpecies(query: string, page?: number, limit?: number): Promise<ServerResponse<TreeSpecies[]>> {
    const url = new NextURL(SERVER_TREE_SPECIES + `?q=${query}&_page=${page || DEFAULT_PAGE}&_limit=${limit || DEFAULT_LIMIT}`);
    return getSomething<TreeSpecies[]>(url);
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

export async function createNews(news: News): Promise<ServerResponse<News>> {
    const url = new NextURL(SERVER_NEWS);
    // this code gets the ID
    const idResponse = await getId();
    if (!isSuccess(idResponse)) {
        return forwardResponse<IdSystem, News>(idResponse);
    }

    // this code assigns new ID to news object
    const idSystem = idResponse.response;
    if (!idSystem) { throw new Error("tf"); }
    idSystem.news += 1
    news.id = idSystem.news;
    updateId(idSystem);

    const date = new Date();
    news.dateCreated = date;
    news.dateModified = date;

    // if all successful, go!
    return postSomething(url, news);
}

export async function addGreenSpace(greenSpace: GreenSpace): Promise<ServerResponse<GreenSpace>> {
    const url = new NextURL(SERVER_GREEN_SPACES);
    // this code gets the ID
    const idResponse = await getId();
    if (!isSuccess(idResponse)) {
        return forwardResponse<IdSystem, GreenSpace>(idResponse);
    }

    // this code assigns new ID to news object
    const idSystem = idResponse.response;
    if (!idSystem) { throw new Error("tf"); }
    idSystem.green_spaces += 1
    greenSpace.id = idSystem.green_spaces;
    updateId(idSystem);

    // if all successful, go!
    return postSomething(url, greenSpace);
}

export async function createCommunity(community: Community): Promise<ServerResponse<Community>> {
    const url = new NextURL(SERVER_COMMUNITIES);
    // this code gets the ID
    const idResponse = await getId();
    if (!isSuccess(idResponse)) {
        return forwardResponse<IdSystem, Community>(idResponse);
    }

    // this code assigns new ID to community object
    const idSystem = idResponse.response;
    if (!idSystem) { throw new Error("tf"); }
    idSystem.communities += 1
    community.id = idSystem.communities;
    community.memberCount = 0;
    updateId(idSystem);

    // create new community member relationship
    const communityMembers = {} as CommunityMembers;
    communityMembers.members = [];
    communityMembers.id = community.id;

    const communityMembersUrl = new NextURL(SERVER_COMMUNITY_MEMBERS);
    const response = await postSomething(communityMembersUrl, communityMembers);
    if (!isSuccess(response)) {
        return forwardResponse<CommunityMembers, Community>(response);
    }

    // if all successful, go!
    return postSomething(url, community);
}


// PATCH
export async function patchSomething<T>(url: NextURL, something: T): Promise<ServerResponse<T>> {
    const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(serializeData(something)),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return {
        status: response.statusText,
        statusCode: response.status
    }
}

// TODO: giving users unchecked permission if they could update the news or not...
interface NewsPatch {
    title?: string,
    content?: string,
    dateModified: number
}

export async function updateNews(
    id: IdType,
    title?: string | null,
    content?: string | null): Promise<ServerResponse<News>> {

    const url = new NextURL(SERVER_NEWS + "/" + encodeURIComponent(id));
    const now = Date.now();
    const updated = {} as NewsPatch
    if (title) { updated.title = title; }
    if (content) { updated.content = content; }
    updated.dateModified = now;

    return await patchSomething<News>(url, updated as News /* Trick TypeScript into thinking this is the correc type */ );
}

// DELETE
export async function deleteSomething<T>(url: NextURL): Promise<ServerResponse<T>> {
    const response = await fetch(url, {
        method: "DELETE"
    });

    return {
        status: response.statusText,
        statusCode: response.status
    }
}

export async function deleteNews(id: IdType): Promise<ServerResponse<News>> {
    const url = new NextURL(SERVER_NEWS + "/" + encodeURIComponent(id));
    return deleteSomething<News>(url);
}

export async function deleteCommunity(id: IdType): Promise<ServerResponse<Community>> {
    const url = new NextURL(SERVER_COMMUNITIES + "/" + encodeURIComponent(id));
    const membersUrl = new NextURL(SERVER_COMMUNITY_MEMBERS + "/" + encodeURIComponent(id));
    const response = await deleteSomething<CommunityMembers>(membersUrl);
    if (!isSuccess(response)) {
        return forwardResponse<CommunityMembers, Community>(response);
    }

    return deleteSomething<Community>(url);
}