package stdlib;

extern class Event<EventArgsType>
{
	function new(target:Dynamic) : Void;
	function bind(handler:Dynamic -> EventArgsType -> Void) : Void;
	function unbind(handler:Dynamic -> EventArgsType -> Void) : Void;
	function unbindAll() : Void;
	function call(args:EventArgsType) : Void;
}