declare module js.three
{
	type CanvasRendererParameters =
	{
		alpha : boolean;
		canvas : HTMLCanvasElement;
		devicePixelRatio : number;
	}
	
	export class Embed
	{
	
	}
	
	export class EmbedMin
	{
	
	}
	
	type LineBasicMaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		color : number;
		depthTest : boolean;
		depthWrite : boolean;
		fog : boolean;
		linecap : string;
		linejoin : string;
		linewidth : number;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		side : THREE;
		transparent : boolean;
		vertexColors : THREE;
		visible : boolean;
	}
	
	type LineDashedMaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		color : number;
		dashSize : number;
		depthTest : boolean;
		depthWrite : boolean;
		fog : boolean;
		gapSize : number;
		linewidth : number;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		scale : number;
		side : THREE;
		transparent : boolean;
		vertexColors : THREE;
		visible : boolean;
	}
	
	type MappingConstructor = () => THREE.Mapping;
	
	type MaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		depthTest : boolean;
		depthWrite : boolean;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		side : THREE;
		transparent : boolean;
		visible : boolean;
	}
	
	/**
	 * parameters is an object with one or more properties defining the material's appearance.
	 */
	type MeshBasicMaterialParameters =
	{
		alphaMap : THREE.Texture;
		alphaTest : number;
		aoMap : THREE.Texture;
		aoMapIntensity : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		color : number;
		combine : THREE;
		depthTest : boolean;
		depthWrite : boolean;
		envMap : THREE.Texture;
		fog : boolean;
		map : THREE.Texture;
		morphTargets : boolean;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		reflectivity : number;
		refractionRatio : number;
		shading : THREE;
		side : THREE;
		skinning : boolean;
		specularMap : THREE.Texture;
		transparent : boolean;
		vertexColors : THREE;
		visible : boolean;
		wireframe : boolean;
		wireframeLinewidth : number;
	}
	
	type MeshDepthMaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		depthTest : boolean;
		depthWrite : boolean;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		side : THREE;
		transparent : boolean;
		visible : boolean;
		wireframe : boolean;
		wireframeLinewidth : number;
	}
	
	type MeshLambertMaterialParameters =
	{
		alphaMap : THREE.Texture;
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		color : number;
		combine : THREE;
		depthTest : boolean;
		depthWrite : boolean;
		emissive : number;
		envMap : THREE.Texture;
		fog : boolean;
		map : THREE.Texture;
		morphNormals : boolean;
		morphTargets : boolean;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		reflectivity : number;
		refractionRatio : number;
		side : THREE;
		skinning : boolean;
		specularMap : THREE.Texture;
		transparent : boolean;
		vertexColors : THREE;
		visible : boolean;
		wireframe : boolean;
		wireframeLinewidth : number;
	}
	
	type MeshNormalMaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		depthTest : boolean;
		depthWrite : boolean;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		shading : THREE;
		side : THREE;
		transparent : boolean;
		visible : boolean;
		/**
		 Render geometry as wireframe. Default is false (i.e. render as smooth shaded).
		 */
		wireframe : boolean;
		/**
		 Controls wireframe thickness. Default is 1.
		 */
		wireframeLinewidth : number;
	}
	
	type MeshPhongMaterialParameters =
	{
		alphaMap : THREE.Texture;
		alphaTest : number;
		aoMap : THREE.Texture;
		aoMapIntensity : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		bumpMap : THREE.Texture;
		bumpScale : number;
		/**
		 geometry color in hexadecimal. Default is 0xffffff.
		 */
		color : number;
		combine : THREE;
		depthTest : boolean;
		depthWrite : boolean;
		displacementBias : number;
		displacementMap : THREE.Texture;
		displacementScale : number;
		emissive : number;
		emissiveMap : THREE.Texture;
		envMap : THREE.Texture;
		fog : boolean;
		lightMap : THREE.Texture;
		lightMapIntensity : number;
		map : THREE.Texture;
		morphNormals : boolean;
		morphTargets : boolean;
		name : string;
		needsUpdate : boolean;
		normalMap : THREE.Texture;
		normalScale : THREE.Vector2;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		reflectivity : number;
		refractionRatio : number;
		shading : THREE;
		shininess : number;
		side : THREE;
		skinning : boolean;
		specular : number;
		specularMap : THREE.Texture;
		transparent : boolean;
		vertexColors : THREE;
		visible : boolean;
		wireframe : string;
		wireframeLinewidth : number;
	}
	
	type PointsMaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		color : number;
		depthTest : boolean;
		depthWrite : boolean;
		fog : boolean;
		map : THREE.Texture;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		side : THREE;
		size : number;
		sizeAttenuation : boolean;
		transparent : boolean;
		vertexColors : THREE;
		visible : boolean;
	}
	
	type RaycasterParameters =
	{
		LOD : any;
		Line : any;
		Mesh : any;
		Points : any;
		Sprite : any;
	}
	
	type ShaderMaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		defines : any;
		depthTest : boolean;
		depthWrite : boolean;
		fog : boolean;
		fragmentShader : string;
		lights : boolean;
		morphNormals : boolean;
		morphTargets : boolean;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		shading : THREE;
		side : THREE;
		skinning : boolean;
		transparent : boolean;
		uniforms : any;
		vertexColors : THREE;
		vertexShader : string;
		visible : boolean;
		wireframe : boolean;
		wireframeLinewidth : number;
	}
	
	type SpriteCanvasMaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		color : number;
		depthTest : boolean;
		depthWrite : boolean;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		program : (arg0:any, arg1:THREE.Color) => void;
		side : THREE;
		transparent : boolean;
		visible : boolean;
	}
	
	type SpriteMaterialParameters =
	{
		alphaTest : number;
		blendDst : THREE;
		blendEquation : THREE;
		blendSrc : THREE;
		blending : THREE;
		color : number;
		depthTest : boolean;
		depthWrite : boolean;
		fog : boolean;
		map : THREE.Texture;
		name : string;
		needsUpdate : boolean;
		opacity : number;
		overdraw : number;
		polygonOffset : boolean;
		polygonOffsetFactor : number;
		polygonOffsetUnits : number;
		side : THREE;
		transparent : boolean;
		uvOffset : THREE.Vector2;
		uvScale : THREE.Vector2;
		visible : boolean;
	}
	
	type WebGLRendererParameters =
	{
		/**
		 * default is true.
		 */
		alpha : boolean;
		/**
		 * default is false.
		 */
		antialias : boolean;
		/**
		 * A Canvas where the renderer draws its output.
		 */
		canvas : HTMLCanvasElement;
		/**
		 * default is 0.
		 */
		clearAlpha : number;
		/**
		 * default is 0x000000.
		 */
		clearColor : number;
		devicePixelRatio : number;
		/**
		 *  shader precision. Can be "highp", "mediump" or "lowp".
		 */
		precision : string;
		/**
		 * default is true.
		 */
		premultipliedAlpha : boolean;
		/**
		 * default is false.
		 */
		preserveDrawingBuffer : boolean;
		/**
		 * default is true.
		 */
		stencil : boolean;
	}
}