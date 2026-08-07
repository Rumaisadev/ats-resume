from starlette.config import Config

from dotenv import load_dotenv

try:
    load_dotenv()
    config = Config(".env")
except FileNotFoundError:
    config = Config()
