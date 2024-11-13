import json
import logging
import os
import uuid
import threading
from django.http import HttpResponse
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
    
def add_count(request):
    if request.method == "POST":
        json_str = request.body
        json_dict = json.loads(json_str)
        data = json_dict.get('data', None)
        print(data)
        
        # Extract the device_id value from the data
        device_id = None
        if data:
            for item in data.split(','):
                if item.strip().startswith('device_id='):
                    device_id = item.split('=')[1].strip()
                    break
        
        if not device_id:
            return HttpResponse("No device_id found in data.", status=400)
        
        # Check if the device_id already exists in count.csv
        with file_lock:
            with open('./count.csv', 'r') as file:
                if any(f"device_id={device_id}" in line for line in file):
                    return HttpResponse("Duplicate device_id found, not added.")
            
            # Append the new data as a new line if device_id is unique
            with open('./count.csv', 'a') as file:
                file.write(f"{data}\n")
        
    return HttpResponse("success")