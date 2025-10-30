# LogHub - task-api

![bun](https://img.shields.io/badge/bun-1.3+-white?style=plastic)
![GitHub License](https://img.shields.io/github/license/loghub-me/task-api?style=plastic&logo=github&color=lightgray)
![GitHub Tag](https://img.shields.io/github/tag/loghub-me/task-api?style=plastic&logo=github&color=lightgray)

#### Repositories

[![GitHub Repo](https://img.shields.io/badge/GitHub-Web-f94949?style=plastic&logo=github)](https://github.com/loghub-me/web-next)
[![GitHub Repo](https://img.shields.io/badge/GitHub-API-6db240?style=plastic&logo=github)](https://github.com/loghub-me/api)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Task_API-aab2ff?style=plastic&logo=github)](https://github.com/loghub-me/task-api)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Markdown_Renderer-2d79c7?style=plastic&logo=github)](https://github.com/loghub-me/markdown-renderer)

## 개발 환경 설정

### 개발 환경

- Bun 1.3 이상

### 환경 변수

|         변수명         | 설명              | 예시                        |
| :--------------------: | ----------------- | --------------------------- |
|       `APP_NAME`       | 애플리케이션 이름 | `PORT`                      |
|         `PORT`         | 서버 포트         | `8082`                      |
|     `CLIENT_HOST`      | 클라이언트 호스트 | `http://localhost:8080`     |
|    `INTERNAL_TOKEN`    | 내부 통신 토큰    | `your-internal-token`       |
|      `S3_BUCKET`       | S3 버킷 이름      | `your-s3-bucket`            |
|      `S3_REGION`       | S3 리전           | `your-s3-region` or `auto`  |
|     `S3_ENDPOINT`      | S3 엔드포인트     | `your-s3-endpoint`          |
|   `S3_ACCESS_KEY_ID`   | S3 액세스 키 ID   | `your-s3-access-key-id`     |
| `S3_SECRET_ACCESS_KEY` | S3 비밀 액세스 키 | `your-s3-secret-access-key` |

> `.env` 파일을 생성하여 위 환경 변수를 설정해주세요.

### 설치 및 실행

```bash
$ bun install --frozen-lockfile
$ bun dev
```
