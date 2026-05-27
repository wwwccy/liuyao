"""
Local development server for 六爻排盘.
Usage: python server.py [port]
Then open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import sys
import os
import webbrowser
from pathlib import Path


DEFAULT_PORT = 8000


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print(f"  {self.address_string()} — {fmt % args}")

    def end_headers(self):
        # Allow local file access without CORS issues
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    root = Path(__file__).parent

    os.chdir(root)

    with socketserver.TCPServer(("", port), Handler) as httpd:
        url = f"http://localhost:{port}"
        print(f"\n  六爻排盘 — serving at {url}")
        print(f"  Root: {root}")
        print("  Press Ctrl+C to stop.\n")
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped.")


if __name__ == "__main__":
    main()
