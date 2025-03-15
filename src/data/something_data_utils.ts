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
    name: number,
    members: [ IdType ]
}

export type News = {
    id: IdType,
    title: string,
    content: string,
}

export type ServerResponse<T> = {
    status: string,
    statusCode: number,
    response?: T
}

// TODO: SWITCH TO AN ACTUAL DATABASE IN PRODUCTION!!
const SERVER_USERS = "http://localhost:3001/users"
const SERVER_COMMUNITIES = "http://localhost:3001/communities"
const SERVER_NEWS = "http://localhost:3001/news"

export async function getUser(id: IdType): Promise<ServerResponse<User>> {    
    const url = new NextURL(SERVER_USERS + "/" + id);
    const response = await fetch(url);
    if (!response.ok) {
        return {
            status: response.statusText,
            statusCode: response.status
        }
    }

    const data0 = await response.json();
    const data = { ...data0, id: parseInt(data0.id) };

    return {
        status: response.statusText,
        statusCode: response.status,
        response: data
    };
}

export async function getCommunity(id: IdType): Promise<ServerResponse<Community>> {    
    const url = new NextURL(SERVER_COMMUNITIES + "/" + id);
    const response = await fetch(url);
    if (!response.ok) {
        return {
            status: response.statusText,
            statusCode: response.status
        }
    }

    const data0 = await response.json();
    const data = { ...data0, id: parseInt(data0.id) };

    return {
        status: response.statusText,
        statusCode: response.status,
        response: data
    };
}

export async function getNews(id: IdType): Promise<ServerResponse<Community>> {    
    const url = new NextURL(SERVER_NEWS + "/" + id);
    const response = await fetch(url);
    if (!response.ok) {
        return {
            status: response.statusText,
            statusCode: response.status
        }
    }

    const data = await response.json();

    return {
        status: response.statusText,
        statusCode: response.status,
        response: data
    };
}