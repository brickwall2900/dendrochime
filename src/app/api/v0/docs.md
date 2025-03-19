Everything here will refer to `/api/v0/`

# Errors
An HTTP code (>=400) will be given for errors.
```
{
    error: string
}
```

# News
## GET `/news`:
Gets the top 10 latest news.

Request:
- `page` (default 10)
- `limit`

Response: HTTP 200
```
[
    {
        id: number,
        title: string,
        author: string,
        content: string,
        dateCreated: number,
        dateModified: number
    }
]
```

## POST `/news`:

Request:
```
{
    title: string,
    author: string,
    content: string
}
```

Response: HTTP 201
```
{
    id: number,
    title: string,
    author: string,
    content: string,
    dateCreated: number,
    dateModified: number
}
```

## GET `/news/[id]`:

No request

Response: HTTP 200
```
{
    id: number,
    title: string,
    author: string,
    content: string,
    dateCreated: number,
    dateModified: number
}
```

## PATCH `/news/[id]`:

Request:
```
{
    title: string?,
    content: string?
}
```

Response: HTTP 200
```
{
    title: string?,
    content: string?,
    dateModified: number
}
```

## DELETE `/news/[id]`:

No request

Response: HTTP 200

# Communities
## GET `/communities`
Gets the top 10 popular communities.

Request:
- `page` (default 10)
- `limit`

Response: HTTP 200
```
[
    {
        id: number,
        name: string,
        description: string,
        memberCount: number
    }
]
```

## POST `/communities`

Request:
```
{
    name: string,
    description: string
}
```

Response: HTTP 201
```
{
    id: number,
    name: string,
    description: string,
    memberCount: number
}
```

## GET `/communities/[id]`

No request

Response: HTTP 200
```
{
    id: number,
    name: string,
    description: string,
    memberCount: number
}
```

## DELETE `/communities/[id]`

No request

Response: HTTP 200