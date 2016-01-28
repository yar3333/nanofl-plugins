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

#filepath=""
#check_existing=True
#option_vertices=True
#option_faces=True
#option_normals=True
#option_colors=False
#option_mix_colors=False
#option_uv_coords=True
#option_materials=False
#option_face_materials=False
#option_maps=False
#option_skinning=False
#option_bones=False
#option_extra_vgroups=""
#option_apply_modifiers=True
#option_index_type='Uint16Array'
#option_scale=1
#option_round_off=True
#option_round_value=6
#option_logging='disabled'
#option_geometry_type='geometry'
#option_export_scene=False
#option_embed_animation=True
#option_copy_textures=True
#option_texture_folder=""
#option_lights=False
#option_cameras=False
#option_hierarchy=False
#option_animation_morph=False
#option_blend_shape=False
#option_animation_skeletal='off'
#option_keyframes=False
#option_frame_index_as_time=False
#option_frame_step=1
#option_indent=True
#option_compression='None'
#option_influences=2
bpy.ops.export.three(filepath=sys.argv[i+1], option_hierarchy=True, option_face_materials=True, option_maps=True, option_skinning=True, option_bones=True)
