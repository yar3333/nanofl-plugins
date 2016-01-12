# convert blend to threejs using Blender
#
# Run as follows:
#   blender -b infile.blend -P blend2threejs.py -- outfile.js
 
import bpy
import sys
import addon_utils

if not addon_utils.check("io_three")[1]:
	addon_utils.enable("io_three")

for i in range(1, len(sys.argv)):
    if sys.argv[i] == "--":
        break

bpy.ops.export.three(filepath=sys.argv[i+1])
