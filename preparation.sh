#! /bin/bash

echo "=== AWARE Light Configurator Setup Script ==="
echo "Starting preparation process..."

CUR_PATH=$(pwd)
echo "Current working directory: $CUR_PATH"

REPLACEABLE_STATIC_ROOT="$(echo "$CUR_PATH" | sed 's/\//\\\//g')\/static"
REPLACEABLE_ROOT_PATH="$(echo "$CUR_PATH" | sed 's/\//\\\//g')"

# please enter the correct ip address
REPLACEABLE_IP_ADDR=""   # please enter the ip address or host url

# please enter the certificate file name for ssl setting
REPLACEABLE_CERTIFICATE=""
REPLACEABLE_CERTIFICATE_KEY=""

# please correct the nginx path if you install nginx in other place.
NGINX_PATH=/etc/nginx/

echo "Configuration parameters:"
echo "  IP Address/Host: $REPLACEABLE_IP_ADDR"
echo "  Certificate: $REPLACEABLE_CERTIFICATE"
echo "  Certificate Key: $REPLACEABLE_CERTIFICATE_KEY"
echo "  Nginx Path: $NGINX_PATH"

useEncryption="false"
echo "Parsing command line options..."
while getopts ":e" opt
do
    case $opt in
        e)
        useEncryption="true"
        echo "  Encryption enabled (HTTPS mode)"
        ;;
        ?)
        echo "unknown parameter"
        exit 1;;
    esac
done

if [ "$useEncryption" == "false" ]; then
    echo "  Using HTTP mode (no encryption)"
fi

# Function to check if a directory should be excluded
should_exclude_directory() {
    local dir_name="$1"
    case "$dir_name" in
        "node_modules"|".git"|"__pycache__"|"static"|"saved_json_files"|"cert"|"django_test")
            return 0  # exclude
            ;;
        *)
            return 1  # include
            ;;
    esac
}

# Function to check if a file should be excluded
should_exclude_file() {
    local file_path="$1"
    local file_name=$(basename "$file_path")
    
    # Exclude by file name patterns
    case "$file_name" in
        "sed"*|"nohup.out"|".DS_Store"|"db.sqlite3"|"*.pyc"|"*.pyo"|"*.log"|"*.tmp")
            return 0  # exclude
            ;;
    esac
    
    # Exclude by file extensions that don't need parameter replacement
    case "$file_name" in
        *.jpg|*.jpeg|*.png|*.gif|*.ico|*.svg|*.pdf|*.zip|*.tar|*.gz|*.bz2)
            return 0  # exclude
            ;;
    esac
    
    # Exclude very large files (over 10MB) as they're likely not config files
    if [ -f "$file_path" ]; then
        local file_size=$(stat -f%z "$file_path" 2>/dev/null || stat -c%s "$file_path" 2>/dev/null || echo 0)
        if [ "$file_size" -gt 10485760 ]; then  # 10MB
            return 0  # exclude
        fi
    fi
    
    return 1  # include
}

# Function to check if file contains replaceable parameters
file_needs_processing() {
    local file_path="$1"
    if [ -f "$file_path" ] && [ -r "$file_path" ]; then
        if grep -q "\[REPLACEABLE_" "$file_path" 2>/dev/null; then
            return 0  # needs processing
        fi
    fi
    return 1  # doesn't need processing
}

replace_parameter(){
    local current_dir="$1"
    
    # Skip if directory should be excluded
    local dir_name=$(basename "$current_dir")
    if should_exclude_directory "$dir_name"; then
        echo "  Skipping directory: $current_dir"
        return
    fi
    
    if [ ! -d "$current_dir" ]; then
        return
    fi
    
    local files=$(ls "$current_dir" 2>/dev/null)
    for file in $files
    do
        local full_path="$current_dir/$file"
        
        if test -d "$full_path"
        then
            replace_parameter "$full_path"
        else
            # Skip files that should be excluded
            if should_exclude_file "$full_path"; then
                continue
            fi
            
            # Only process files that actually contain replaceable parameters
            if file_needs_processing "$full_path"; then
                echo "  Processing file: $full_path"
                sed -i "s/\[REPLACEABLE_IP_ADDR\]/$REPLACEABLE_IP_ADDR/" "$full_path"
                if [ "$useEncryption" == "true" ]
                then
                  sed -i "s/\[REPLACEABLE_PROTOCOL\]/https/" "$full_path"
                  sed -i "s/\[REPLACEABLE_PORT_NUM\]/443/" "$full_path"
                else
                  sed -i "s/\[REPLACEABLE_PROTOCOL\]/http/" "$full_path"
                  sed -i "s/\[REPLACEABLE_PORT_NUM\]/80/" "$full_path"
                fi
                sed -i "s/\[REPLACEABLE_ROOT_PATH\]/$REPLACEABLE_ROOT_PATH/" "$full_path"
                sed -i "s/\[REPLACEABLE_STATIC_ROOT\]/$REPLACEABLE_STATIC_ROOT/" "$full_path"
                sed -i "s/\[REPLACEABLE_CERTIFICATE\]/$REPLACEABLE_CERTIFICATE/" "$full_path"
                sed -i "s/\[REPLACEABLE_CERTIFICATE_KEY\]/$REPLACEABLE_CERTIFICATE_KEY/" "$full_path"
            fi
        fi
    done
}

echo ""
echo "=== Step 1: Replacing configuration parameters in files ==="
replace_parameter "$CUR_PATH"
echo "Configuration parameter replacement completed."

# install dependencies and build the package for react
echo ""
echo "=== Step 2: Building React application ==="
echo "Changing to React app directory: $CUR_PATH/reactapp"
cd "$CUR_PATH/reactapp" || exit
echo "Installing npm dependencies..."
npm install
echo "Building React application..."
npm run build
echo "React build completed."

echo ""
echo "=== Step 3: Setting up Django environment ==="
echo "Returning to project root: $CUR_PATH"
cd "$CUR_PATH" || exit
echo "Installing Python dependencies from requirements.txt..."
# install dependencies for django
pip install -r requirements.txt
echo "Collecting Django static files..."
# collect static files to target directory
echo yes | python manage.py collectstatic
echo "Django setup completed."

echo ""
echo "=== Step 4: Configuring Nginx ==="
# create shortcut for nginx config file
if [ "$useEncryption" == "true" ]
then
  echo "Setting up HTTPS nginx configuration..."
  echo "Removing existing nginx config files..."
  sudo rm "$NGINX_PATH/sites-available/AWARE-Light-Configurator_nginx"
  sudo rm "$NGINX_PATH/sites-enabled/AWARE-Light-Configurator_nginx"
  echo "Creating symbolic links for HTTPS configuration..."
  sudo ln -s "$CUR_PATH/util/nginx_config_https" "$NGINX_PATH/sites-available/AWARE-Light-Configurator_nginx"
  sudo ln -s "$CUR_PATH/util/nginx_config_https" "$NGINX_PATH/sites-enabled/AWARE-Light-Configurator_nginx"
  echo "HTTPS nginx configuration applied."
else
  echo "Setting up HTTP nginx configuration..."
  echo "Removing existing nginx config files..."
  sudo rm "$NGINX_PATH/sites-available/AWARE-Light-Configurator_nginx"
  sudo rm "$NGINX_PATH/sites-enabled/AWARE-Light-Configurator_nginx"
  echo "Creating symbolic links for HTTP configuration..."
  sudo ln -s "$CUR_PATH/util/nginx_config_http" "$NGINX_PATH/sites-available/AWARE-Light-Configurator_nginx"
  sudo ln -s "$CUR_PATH/util/nginx_config_http" "$NGINX_PATH/sites-enabled/AWARE-Light-Configurator_nginx"
  echo "HTTP nginx configuration applied."
fi
echo "Restarting nginx service..."
sudo systemctl restart nginx
echo "Nginx restart completed."

echo ""
echo "=== Setup Complete! ==="
echo "AWARE Light Configurator has been successfully configured and deployed."
if [ "$useEncryption" == "true" ]; then
    echo "Access your application at: https://$REPLACEABLE_IP_ADDR"
else
    echo "Access your application at: http://$REPLACEABLE_IP_ADDR"
fi
