package svgimport;

class Group
{
	public var name : String;
	public var children : Array<DisplayElement>;
	
	public function new()
	{
		name = "";
		children = [];
	}

	public function hasGroup(inName:String) { return findGroup(inName) != null; }
	public function findGroup(inName:String) : Group
	{
		for (child in children)
			switch (child)
			{
				case DisplayGroup(group):
					if (group.name == inName)
						return group;
				default:
			}
		return null;
	 }
}
