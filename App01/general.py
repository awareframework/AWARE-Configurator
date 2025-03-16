import json
import logging
import os
import uuid
import threading
import re
from django.http import HttpResponse
from urllib.parse import unquote
from django.views.decorators.csrf import ensure_csrf_cookie

from aware_light_config_Django import settings

logger = logging.getLogger(__name__)
storage_path = settings.STORAGE_DIR
file_lock = threading.Lock()

@ensure_csrf_cookie
def get_token(request):
    return HttpResponse("success")


def save_json_file(request):
    if request.method == "POST":
        json_str = request.body
        json_dict = json.loads(json_str)
        jsonText = json.dumps(json_dict.get('text', None))
        save(jsonText)
    return HttpResponse("success")


def save(content):
    folder = os.path.exists(storage_path)
    if not folder:
        os.makedirs(storage_path)

    file_name = str(uuid.uuid4()) + ".json"
    file = open(os.path.join(storage_path, file_name), 'w')
    file.write(content)
    file.close()
    


def add_count(request, data=None):
    if request.method == "GET":
        if data:
            # URL decode the data
            data = unquote(data)
            # Apply transformation similar to JavaScript's data.replace(/(\s?)(\w+=)/g, ",$2")
            data = re.sub(r'(\s?)(\w+=)', r',\2', data)
            if data.startswith(','):
                data = data[1:]
            
            with file_lock:
                with open('./count.csv', 'a') as file:
                    file.write(f"{data}\n")
            
            return HttpResponse("success")
        return HttpResponse("no data provided", status=400)
