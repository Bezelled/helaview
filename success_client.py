from asyncio.runners import run

from aiohttp.client import ClientSession

post_url: str = 'http://127.0.0.1:7788/api/tourists/register'

post_data: dict[str, str | int] = {
    'first name': 'Hela',
    'last name': 'Dude',
    'email': 'shanecna@gmail.com',
    'password': 'Apiit!123',
    'password confirmation': 'Apiit!123',
    'passport number': 'A4167D57',
    'age': 20,
    'gender': 'M',
    'country': 'LK',
    'address': '4433/1, Test Road, Test, Testcity',
    'contact number': '0781437529'
}

async def main() -> None:

    async with ClientSession() as session:
        
        async with session.post(post_url, json=post_data) as response:
            resp: bytes = await response.read()
            print(resp.decode())

if __name__ == '__main__':
    run(main())
