## Description

Facebook-API is REST API using [NestJS](https://github.com/nestjs/nest).

## Installation

```bash
$ yarn install
$ yarn prisma generate
$ yarn prisma migrate dev
```

## Running the app

```bash
# docker
$ docker-compose up

# development
$ yarn start:dev

# production mode
$ yarn start
```

## API Routes


## `/api/v1/authentication`
### DTOs
| name          | schema                               |
|:--------------|:-------------------------------------|
| `LoginDto`    |`{ email: string, password: string }` |
| `RegisterDto` |`{ email: string, password: string }` |

### URIs
| method | endpoint    | headers   | body         | Response                          | description                              |
|:-------|:------------|:----------|:-------------|:----------------------------------|:-----------------------------------------|
| `POST` | `/login`    | `null`    |`LoginDto`    | `{ user: User, token: JwtToken }` | return a JWT Token for authentication.   |
| `POST` | `/register` | `null`    |`RegisterDto` | `{ user: User}`                   | register a new User.                     |

## `/api/v1/users`

### DTOs
| name            | schema                                      |
|:----------------|:--------------------------------------------|
| `UpdateProfile` | `{ firstName?: string, lastName?: string }` |

### URIs
| method  | endpoint       | headers                | body            | Response               | description                    |
|:--------|:---------------|:-----------------------|:----------------|:-----------------------|:-------------------------------|
| `GET`   | `/:id/posts`   | `Authorization: TOKEN` | `null`          | `{ posts: Post[] }`    | return a list of User's posts. |
| `GET`   | `/:id/profile` | `Authorization: TOKEN` | `null`          | `{ profile: Profile }` | return a User's profile.       |
| `PATCH` | `/:id/profile` | `Authorization: TOKEN` | `UpdateProfile` | `{ profile: Profile }` | update a User's profile.       |

## `/api/v1/posts`

### DTOs
| name            | schema                  |
|:----------------|:------------------------|
| `CreatePostDto` | `{ message: string }`   |
| `UpdatePostDto` | `{ message?: string }`  |

### URIs
| method   | endpoint | headers                | body            | Response            | description            |
|:---------|:---------|:-----------------------|:----------------|:--------------------|:-----------------------|
| `POST`   | `/`      | `Authorization: TOKEN` | `CreatePostDto` | `{ post: Post }`    | create a new Post.     |
| `GET`    | `/:id`   | `Authorization: TOKEN` | `null`          | `{ post: Post }`    | return a Post.         |
| `GET`    | `/`      | `Authorization: TOKEN` | `null`          | `{ posts: Post[] }` | return a list of Post. |
| `PATCH`  | `/:id`   | `Authorization: TOKEN` | `UpdatePostDto` | `{ post: Post }`    | update a Post.         |
| `DELETE` | `/:id`   | `Authorization: TOKEN` | `null`          | `null`              | delete a Post.         |
