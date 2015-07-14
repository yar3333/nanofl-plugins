package createjs;

/**
 * Play sounds using Web Audio in the browser. The WebAudioPlugin is currently the default plugin, and will be used
 * anywhere that it is supported. To change plugin priority, check out the Sound API
 * {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} method.
 *
 * <h4>Known Browser and OS issues for Web Audio</h4>
 * <b>Firefox 25</b>
 * <ul><li>mp3 audio files do not load properly on all windows machines, reported
 * <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=929969" target="_blank">here</a>. </br>
 * For this reason it is recommended to pass another FF supported type (ie ogg) first until this bug is resolved, if possible.</li></ul>
 * <br />
 * <b>Webkit (Chrome and Safari)</b>
 * <ul><li>AudioNode.disconnect does not always seem to work.  This can cause the file size to grow over time if you
 * are playing a lot of audio files.</li></ul>
 * <br />
 * <b>iOS 6 limitations</b>
 * 	<ul><li>Sound is initially muted and will only unmute through play being called inside a user initiated event (touch/click).</li>
 * 	<li>A bug exists that will distort uncached audio when a video element is present in the DOM.  You can avoid this bug
 * 	by ensuring the audio and video audio share the same sampleRate.</li>
 * </ul>
 */
extern class WebAudioPlugin extends createjs.AbstractPlugin
{
	function new() : Void;
	/**
	 * A DynamicsCompressorNode, which is used to improve sound quality and prevent audio distortion.
	 * It is connected to <code>context.destination</code>.
	 *
	 * Can be accessed by advanced users through createjs.Sound.activePlugin.dynamicsCompressorNode.
	 */
	var dynamicsCompressorNode : js.html.audio.AudioNode;
	/**
	 * A GainNode for controlling master volume. It is connected to {{#crossLink "WebAudioPlugin/dynamicsCompressorNode:property"}}{{/crossLink}}.
	 *
	 * Can be accessed by advanced users through createjs.Sound.activePlugin.gainNode.
	 */
	var gainNode : js.html.audio.GainNode;
	/**
	 * The web audio context, which WebAudio uses to play audio. All nodes that interact with the WebAudioPlugin
	 * need to be created within this context.
	 *
	 * Advanced users can set this to an existing context, but <b>must</b> do so before they call
	 * {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} or {{#crossLink "Sound/initializeDefaultPlugins"}}{{/crossLink}}.
	 */
	static var context : js.html.audio.AudioContext;
	/**
	 * Determine if the plugin can be used in the current browser/OS.
	 */
	static function isSupported() : Bool;
	/**
	 * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
	 * require the first sound to be played inside of a user initiated event (touch/click).  This is called when
	 * {{#crossLink "WebAudioPlugin"}}{{/crossLink}} is initialized (by Sound {{#crossLink "Sound/initializeDefaultPlugins"}}{{/crossLink}}
	 * for example).
	 *
	 * <h4>Example</h4>
	 *
	 *     function handleTouch(event) {
	 *         createjs.WebAudioPlugin.playEmptySound();
	 *     }
	 */
	static function playEmptySound() : Void;
}