package js.three;

@:flatEnum @:native("THREE.DepthModes") extern enum DepthModes
{
	LessDepth;
	GreaterEqualDepth;
	GreaterDepth;
	NeverDepth;
	AlwaysDepth;
	NotEqualDepth;
	EqualDepth;
	LessEqualDepth;
}