module {pack}
{
	export class {klass} extends {base}
	{
		constructor()
		{
			super(nanofl.Player.library.getItem("{namePath}"));
		}
	}
}