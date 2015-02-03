package createjs;

/**
 * A stage is the root level {{#crossLink "Container"}}{{/crossLink}} for a display list. Each time its {{#crossLink "Stage/tick"}}{{/crossLink}}
 * method is called, it will render its display list to its target canvas.
 *
 * <h4>Example</h4>
 * This example creates a stage, adds a child to it, then uses {{#crossLink "Ticker"}}{{/crossLink}} to update the child
 * and redraw the stage using {{#crossLink "Stage/update"}}{{/crossLink}}.
 *
 *      var stage = new createjs.Stage("canvasElementId");
 *      var image = new createjs.Bitmap("imagePath.png");
 *      stage.addChild(image);
 *      createjs.Ticker.addEventListener("tick", handleTick);
 *      function handleTick(event) {
 *          image.x += 10;
 *          stage.update();
 *      }
 */
extern class Stage extends createjs.Container
{
	function new(canvas:Dynamic) : Void;
	/**
	 * Indicates whether the stage should automatically clear the canvas before each render. You can set this to <code>false</code>
	 * to manually control clearing (for generative art, or when pointing multiple stages at the same canvas for
	 * example).
	 *
	 * <h4>Example</h4>
	 *
	 *      var stage = new createjs.Stage("canvasId");
	 *      stage.autoClear = false;
	 */
	var autoClear : Bool;
	/**
	 * The canvas the stage will render to. Multiple stages can share a single canvas, but you must disable autoClear for all but the
	 * first stage that will be ticked (or they will clear each other's render).
	 *
	 * When changing the canvas property you must disable the events on the old canvas, and enable events on the
	 * new canvas or mouse events will not work as expected. For example:
	 *
	 *      myStage.enableDOMEvents(false);
	 *      myStage.canvas = anotherCanvas;
	 *      myStage.enableDOMEvents(true);
	 */
	var canvas : Dynamic;
	/**
	 * The current mouse X position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
	 * position over the canvas, and mouseInBounds will be set to false.
	 */
	var mouseX : Float;
	/**
	 * The current mouse Y position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
	 * position over the canvas, and mouseInBounds will be set to false.
	 */
	var mouseY : Float;
	/**
	 * Specifies the area of the stage to affect when calling update. This can be use to selectively
	 * re-draw specific regions of the canvas. If null, the whole canvas area is drawn.
	 */
	var drawRect : createjs.Rectangle;
	/**
	 * Indicates whether display objects should be rendered on whole pixels. You can set the
	 * {{#crossLink "DisplayObject/snapToPixel"}}{{/crossLink}} property of
	 * display objects to false to enable/disable this behaviour on a per instance basis.
	 */
	var snapToPixelEnabled : Bool;
	/**
	 * Indicates whether the mouse is currently within the bounds of the canvas.
	 */
	var mouseInBounds : Bool;
	/**
	 * If true, tick callbacks will be called on all display objects on the stage prior to rendering to the canvas.
	 */
	var tickOnUpdate : Bool;
	/**
	 * If true, mouse move events will continue to be called when the mouse leaves the target canvas. See
	 * {{#crossLink "Stage/mouseInBounds:property"}}{{/crossLink}}, and {{#crossLink "MouseEvent"}}{{/crossLink}}
	 * x/y/rawX/rawY.
	 */
	var mouseMoveOutside : Bool;
	/**
	 * Prevents selection of other elements in the html page if the user clicks and drags, or double clicks on the canvas.
	 * This works by calling `preventDefault()` on any mousedown events (or touch equivalent) originating on the canvas.
	 */
	var preventSelection : Bool;
	/**
	 * The hitArea property is not supported for Stage.
	 */
	var nextStage : createjs.Stage;
	/**
	 * Default event handler that calls the Stage {{#crossLink "Stage/update"}}{{/crossLink}} method when a {{#crossLink "DisplayObject/tick:event"}}{{/crossLink}}
	 * event is received. This allows you to register a Stage instance as a event listener on {{#crossLink "Ticker"}}{{/crossLink}}
	 * directly, using:
	 *
	 *      Ticker.addEventListener("tick", myStage");
	 *
	 * Note that if you subscribe to ticks using this pattern, then the tick event object will be passed through to
	 * display object tick handlers, instead of <code>delta</code> and <code>paused</code> parameters.
	 */
	var handleEvent : Dynamic;
	/**
	 * Each time the update method is called, the stage will call {{#crossLink "Stage/tick"}}{{/crossLink}}
	 * unless {{#crossLink "Stage/tickOnUpdate:property"}}{{/crossLink}} is set to false,
	 * and then render the display list to the canvas.
	 */
	function update(?props:Dynamic) : Void;
	/**
	 * Propagates a tick event through the display list. This is automatically called by {{#crossLink "Stage/update"}}{{/crossLink}}
	 * unless {{#crossLink "Stage/tickOnUpdate:property"}}{{/crossLink}} is set to false.
	 *
	 * If a props object is passed to `tick()`, then all of its properties will be copied to the event object that is
	 * propagated to listeners.
	 *
	 * Some time-based features in EaselJS (for example {{#crossLink "Sprite/framerate"}}{{/crossLink}} require that
	 * a {{#crossLink "Ticker/tick:event"}}{{/crossLink}} event object (or equivalent object with a delta property) be
	 * passed as the `props` parameter to `tick()`. For example:
	 *
	 * 	Ticker.on("tick", handleTick);
	 * 	function handleTick(evtObj) {
	 * 		// clone the event object from Ticker, and add some custom data to it:
	 * 		var evt = evtObj.clone().set({greeting:"hello", name:"world"});
	 *
	 * 		// pass it to stage.update():
	 * 		myStage.update(evt); // subsequently calls tick() with the same param
	 * 	}
	 *
	 * 	// ...
	 * 	myDisplayObject.on("tick", handleDisplayObjectTick);
	 * 	function handleDisplayObjectTick(evt) {
	 * 		console.log(evt.delta); // the delta property from the Ticker tick event object
	 * 		console.log(evt.greeting, evt.name); // custom data: "hello world"
	 * 	}
	 */
	function tick(?props:Dynamic) : Void;
	/**
	 * Clears the target canvas. Useful if {{#crossLink "Stage/autoClear:property"}}{{/crossLink}} is set to `false`.
	 */
	function clear() : Void;
	/**
	 * Returns a data url that contains a Base64-encoded image of the contents of the stage. The returned data url can
	 * be specified as the src value of an image element.
	 */
	function toDataURL(?backgroundColor:String, ?mimeType:String) : String;
	/**
	 * Enables or disables (by passing a frequency of 0) mouse over ({{#crossLink "DisplayObject/mouseover:event"}}{{/crossLink}}
	 * and {{#crossLink "DisplayObject/mouseout:event"}}{{/crossLink}}) and roll over events ({{#crossLink "DisplayObject/rollover:event"}}{{/crossLink}}
	 * and {{#crossLink "DisplayObject/rollout:event"}}{{/crossLink}}) for this stage's display list. These events can
	 * be expensive to generate, so they are disabled by default. The frequency of the events can be controlled
	 * independently of mouse move events via the optional `frequency` parameter.
	 *
	 * <h4>Example</h4>
	 *
	 *      var stage = new createjs.Stage("canvasId");
	 *      stage.enableMouseOver(10); // 10 updates per second
	 */
	function enableMouseOver(?frequency:Float) : Void;
	/**
	 * Enables or disables the event listeners that stage adds to DOM elements (window, document and canvas). It is good
	 * practice to disable events when disposing of a Stage instance, otherwise the stage will continue to receive
	 * events from the page.
	 *
	 * When changing the canvas property you must disable the events on the old canvas, and enable events on the
	 * new canvas or mouse events will not work as expected. For example:
	 *
	 *      myStage.enableDOMEvents(false);
	 *      myStage.canvas = anotherCanvas;
	 *      myStage.enableDOMEvents(true);
	 */
	function enableDOMEvents(?enable:Bool) : Void;
	/**
	 * Stage instances cannot be cloned.
	 */
	override function clone(?recursive:Bool) : createjs.DisplayObject;
	/**
	 * Returns a string representation of this object.
	 */
	override function toString() : String;
	/**
	 * Dispatched when the user moves the mouse over the canvas.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 */
	function addStagemousemoveEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Dynamic;
	function removeStagemousemoveEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Void;
	/**
	 * Dispatched when the user presses their left mouse button on the canvas. See the {{#crossLink "MouseEvent"}}{{/crossLink}}
	 * class for a listing of event properties.
	 */
	function addStagemousedownEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Dynamic;
	function removeStagemousedownEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Void;
	/**
	 * Dispatched when the user the user presses somewhere on the stage, then releases the mouse button anywhere that the page can detect it (this varies slightly between browsers).
	 * You can use {{#crossLink "Stage/mouseInBounds:property"}}{{/crossLink}} to check whether the mouse is currently within the stage bounds.
	 * See the {{#crossLink "MouseEvent"}}{{/crossLink}} class for a listing of event properties.
	 */
	function addStagemouseupEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Dynamic;
	function removeStagemouseupEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Void;
	/**
	 * Dispatched when the mouse moves from within the canvas area (mouseInBounds == true) to outside it (mouseInBounds == false).
	 * This is currently only dispatched for mouse input (not touch). See the {{#crossLink "MouseEvent"}}{{/crossLink}}
	 * class for a listing of event properties.
	 */
	function addMouseleaveEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Dynamic;
	function removeMouseleaveEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Void;
	/**
	 * Dispatched when the mouse moves into the canvas area (mouseInBounds == false) from outside it (mouseInBounds == true).
	 * This is currently only dispatched for mouse input (not touch). See the {{#crossLink "MouseEvent"}}{{/crossLink}}
	 * class for a listing of event properties.
	 */
	function addMouseenterEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Dynamic;
	function removeMouseenterEventListener(handler:createjs.MouseEvent -> Void, ?useCapture:Bool) : Void;
	/**
	 * Dispatched each update immediately before the tick event is propagated through the display list.
	 * You can call preventDefault on the event object to cancel propagating the tick event.
	 */
	function addTickstartEventListener(handler:Dynamic -> Void, ?useCapture:Bool) : Dynamic;
	function removeTickstartEventListener(handler:Dynamic -> Void, ?useCapture:Bool) : Void;
	/**
	 * Dispatched each update immediately after the tick event is propagated through the display list. Does not fire if
	 * tickOnUpdate is false. Precedes the "drawstart" event.
	 */
	function addTickendEventListener(handler:Dynamic -> Void, ?useCapture:Bool) : Dynamic;
	function removeTickendEventListener(handler:Dynamic -> Void, ?useCapture:Bool) : Void;
	/**
	 * Dispatched each update immediately before the canvas is cleared and the display list is drawn to it.
	 * You can call preventDefault on the event object to cancel the draw.
	 */
	function addDrawstartEventListener(handler:Dynamic -> Void, ?useCapture:Bool) : Dynamic;
	function removeDrawstartEventListener(handler:Dynamic -> Void, ?useCapture:Bool) : Void;
	/**
	 * Dispatched each update immediately after the display list is drawn to the canvas and the canvas context is restored.
	 */
	function addDrawendEventListener(handler:Dynamic -> Void, ?useCapture:Bool) : Dynamic;
	function removeDrawendEventListener(handler:Dynamic -> Void, ?useCapture:Bool) : Void;
}