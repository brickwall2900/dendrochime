Everything here will refer to `/api/v0/`

# Errors
An HTTP code (>=400) will be given for errors.
```
{
    error: string
}
```

# News
## POST `/news`:

Request:
```
{
    title: string,
    author: string,
    content: string,
    dateCreated: number,
    dateModified: number
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