"""
Formats all .py files from file's directory recursively.
"""
# pylint: skip-file
import os
import re
from yapf.yapflib.yapf_api import FormatFile

PATH = '.'
FILES = []
for r, d, f in os.walk(PATH):
    for file in f:
        if re.match(r".*.py$", file):
            FILES.append(os.path.join(r, file))
for filename in FILES:
    print(f"Formatting: {filename}")
    FormatFile(filename, in_place=True)
