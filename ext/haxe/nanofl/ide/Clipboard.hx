package nanofl.ide;

typedef Clipboard =
{
	function canCopy() : Bool;
	function canCut() : Bool;
	function canPaste() : Bool;
	function copy() : Bool;
	function cut() : Bool;
	function paste() : Bool;
	function restoreFocus() : Void;
};