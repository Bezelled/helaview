from asyncio.runners import run

from aiohttp.client import ClientSession

post_url: str = 'http://127.0.0.1/api/users/register'
post_data: dict[str, str | int] = {
    'username': 'Test account',
    'password': 'Test password'
}

async def main() -> None:

    async with ClientSession() as session:
        
        async with session.post(post_url, json=post_data) as response:
            resp: bytes = await response.read()
            print(resp.decode())

if __name__ == '__main__':
    run(main())
