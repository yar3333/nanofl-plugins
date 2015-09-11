package nanofl.ide;

enum FileAction
{
	RENAME_LIBRARY_ITEM(oldNamePath:String, newNamePath:String);
	REMOVE_LIBRARY_ITEMS(namePaths:Array<String>);
}