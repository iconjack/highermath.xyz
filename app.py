import os
from flask import Flask, send_from_directory, abort, redirect, request

# static_folder is disabled so every url is resolved by serve_static_page, which keeps
# the site flat and avoids exposing a duplicate /static/ prefix that surge never served
app = Flask(__name__, static_folder=None)

site_folder = os.path.join(app.root_path, 'static')


@app.before_request
def redirect_www_to_apex():
    host_name = request.host.split(':')[0]
    if host_name.startswith('www.'):
        target_url = f'https://highermath.xyz{request.path}'
        if request.query_string:
            target_url = f'{target_url}?{request.query_string.decode()}'
        return redirect(target_url, code=301)


@app.route('/')
def index():
    return send_from_directory(site_folder, 'index.html')


@app.route('/<path:page_name>')
def serve_static_page(page_name):
    sanitized_page_name = page_name.strip()

    # basic security checks
    if (
        not sanitized_page_name
        or sanitized_page_name.startswith('.')
        or '\\' in sanitized_page_name
        or '..' in sanitized_page_name
    ):
        abort(404)

    # the file exactly as requested
    if os.path.isfile(os.path.join(site_folder, sanitized_page_name)):
        return send_from_directory(site_folder, sanitized_page_name)

    # extensionless urls resolve to .html, matching surge's clean-url behavior
    html_page_name = f'{sanitized_page_name}.html'
    if os.path.isfile(os.path.join(site_folder, html_page_name)):
        return send_from_directory(site_folder, html_page_name)

    abort(404)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
