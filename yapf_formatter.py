"""
Formats all .py files from file's directory recursively.
"""
# pylint: skip-file
import os
import re
import sys
from yapf.yapflib.yapf_api import FormatFile

PATHS = '.' if len(sys.argv) == 0 else sys.argv[1:]
FILES = []
for PATH in PATHS:
    for r, d, f in os.walk(PATH):
        for file in f:
            if re.match(r".*.py$", file):
                FILES.append(os.path.join(r, file))
    for filename in FILES:
        print(f"Formatting: {filename}")
        try:
            FormatFile(filename, in_place=True)
        except:
            print("Error! Continuing with other files!")