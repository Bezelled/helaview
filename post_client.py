from asyncio.runners import run

from aiohttp.client import ClientSession

post_url: str = 'http://127.0.0.1/api/tourists/register'

# userRegistrationKeys = ['first name', 'last name', 'email', 'password', 'password confirmation', 'passport number', 'gender', 'age', 'country', 'address', 'contact number'];
# jotelRegistrationKeys = ['full name', 'password', 'email', 'address', 'contact number', 'hotel type', 'rating'];

# ${firstName}, ${lastName}, ${email}, ${password}, ${passportNo}, ${age}, ${gender}, ${country}, ${address}, ${contactNo}
post_data: dict[str, str | int] = {
    'first name': 'Shane',
    'last name': 'Dawson',
    'email': 'shane@google.com',
    'password': 'Tryst!123',
    'password confirmation': 'Tryst123',
    'passport number': 'A21 90457',
    'age': 13,
    'gender': 'M',
    'country': 'LK',
    'address': '4433/1, Test Road, Test, Testcity',
    'contact number': '0773002117'
}

async def main() -> None:

    async with ClientSession() as session:
        
        async with session.post(post_url, json=post_data) as response:
            resp: bytes = await response.read()
            print(resp.decode())

if __name__ == '__main__':
    run(main())
