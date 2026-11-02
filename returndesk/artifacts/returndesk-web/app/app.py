import os
import re
from pathlib import Path
import yaml
from flask import (
    Flask,
    abort,
    jsonify,
    redirect,
    render_template,
    request,
    send_from_directory,
    session,
)

BASE_DIR = Path(__file__).resolve().parent
RELEASE_DIR = Path("/opt/returndesk/releases")

RETURN_QUEUE = [
    {
        "id": "RD-10482",
        "vendor": "Northstar Mobile",
        "status": "Supervisor review",
        "age": "42m",
        "risk": "High"
    },
    {
        "id": "RD-10476",
        "vendor": "Meridian Apparel",
        "status": "Awaiting label",
        "age": "1h 18m",
        "risk": "Low"
    },
    {
        "id": "RD-10470",
        "vendor": "Cobalt Home",
        "status": "Archive pending",
        "age": "2h 05m",
        "risk": "Medium"
    },
    {
        "id": "RD-10461",
        "vendor": "Aster Pharma",
        "status": "Quarantine hold",
        "age": "3h 22m",
        "risk": "High"
    },
]

VENDOR_POLICIES = [
    {
        "name": "Northstar Mobile",
        "version": "2026.04",
        "rules": 18,
        "owner": "ops-admin"
    },
    {
        "name": "Meridian Apparel",
        "version": "2026.03",
        "rules": 9,
        "owner": "returns-lead"
    },
    {
        "name": "Aster Pharma",
        "version": "2026.02",
        "rules": 24,
        "owner": "compliance"
    },
]

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]
ADMIN_USERNAME = os.environ["ADMIN_USERNAME"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]

def authenticate_admin():
    username = request.form.get("username", "")
    password = request.form.get("password", "")

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        session["user"] = username
        session["role"] = "admin"
        return True

    return False

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if authenticate_admin():
            return redirect("/admin")
        return render_template("index.html", error="Invalid username or password.")

    return render_template("index.html", error=None)

@app.route("/api/status")
def status():
    return jsonify({
        "status": "degraded",
        "queue_depth": 17,
        "region": "south"
    })

@app.route("/api/build-info")
def build_info():
    return jsonify(
        {
            "version": "2026.04.1",
            "commit": "9f31c7a",
            "artifact": "returndesk-2026.04.1.tar.gz",
            "channel": "warehouse-staging",
        }
    )

@app.route("/releases/")
def releases_index():
    abort(403)

@app.route("/releases/<path:name>")
def releases(name):
    if not re.fullmatch(r"returndesk-\d{4}\.\d{2}\.\d+\.tar\.gz", name):
        abort(404)

    requested = (RELEASE_DIR / name).resolve()

    if not requested.is_file() or RELEASE_DIR not in requested.parents:
        abort(404)

    return send_from_directory(RELEASE_DIR, name, as_attachment=True)

@app.route("/admin")
def admin():
    if session.get("role") != "admin":
        return redirect("/")

    return render_template(
        "admin.html",
        queue=RETURN_QUEUE,
        policies=VENDOR_POLICIES,
    )

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/admin/import-policy", methods=["GET", "POST"])
def import_policy():
    if session.get("role") != "admin":
        abort(403)

    if request.method == "GET":
        return render_template("import_policy.html", policies=VENDOR_POLICIES)

    uploaded = request.files.get("policy")
    raw_body = request.get_data()
    data = uploaded.read() if uploaded else raw_body

    if not data:
        return jsonify({"ok": False, "error": "empty policy"}), 400

    policy = yaml.unsafe_load(data.decode())
    return jsonify({"ok": True, "loaded_type": type(policy).__name__})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
