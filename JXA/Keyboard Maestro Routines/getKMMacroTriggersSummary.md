
```js
// Returns a ulti-line string with descriptions of the trigger(s).
// UPDATED: 2016/07/06 15:47 PDT
function getKMMacroTriggersSummary(triggers) {

	function keyCodeToString(keyCode) {
		return ["A", "S", "D", "F", "H", "G", "Z", "X", "C", "V", "§", "B", "Q", "W", "E", "R", "Y", "T", "1", "2", "3",
			"4",
			"6", "5", "=", "9", "7", "-", "8", "0", "]", "O", "U", "[", "I", "P", "⏎", "L", "J", "“", "K", ";", "\\", ",",
			"/",
			"N", "M", ".", "⇥", "␣", "`", "⌫", "␊", "⎋", "?", "⌘", "⇧", "⇪", "⌥", "⌃", "⇧", "⌥", "⌃", "fn", "F17",
			"KeypadDecimal", "?", "KeypadMultiply", "?", "KeypadPlus", "?", "KeypadClear", "VolumeUp", "VolumeDown", "Mute",
			"KeypadDivide", "KeypadEnter", "?", "KeypadMinus", "F18", "F19", "KeypadEquals", "Keypad0", "Keypad1", "Keypad2",
			"Keypad3", "Keypad4", "Keypad5", "Keypad6", "Keypad7", "F20", "Keypad8", "Keypad9", "?", "?", "?", "F5", "F6",
			"F7", "F3", "F8", "F9", "?", "F11", "?", "F13", "F16", "F14", "?", "F10", "?", "F12", "?", "F15", "Help/Insert",
			"⇱", "⇞", "⌦", "F4", "⇲", "F2", "⇟", "F1", "←", "→", "↓", "↑"
		][keyCode];
	}

	function keyModifiersToString(modifiers) {
		var result = [];
		if (modifiers & 256) result.push("⌘");
		if (modifiers & 512) result.push("⇧");
		if (modifiers & 1024) result.push("[capslock]");
		if (modifiers & 2048) result.push("⌥");
		if (modifiers & 4096) result.push("^");
		return result.join("");
	}

	function getTriggerRepeatString(repeatTime) {
		if (!repeatTime) return "";

		var i = parseInt(repeatTime);
		if (i >= 60) {
			if (i % (60 * 60) == 0)
				return "repeating every " + (i / (60 * 60)) + " hour(s)";
			if (i % 60 == 0)
				return "repeating every " + (i / 60) + " minute(s)";
		}
		return "repeating every " + repeatTime + " second(s)";
	}

	function getTriggerTimeRangeString(hour, minute) {
		return hour + ":" + minute;
	}

	function getTriggerDaysString(whichDays) {
		if (whichDays == 0) return "on no days";
		if (whichDays == 127) return "every day";
		var result = [];
		if (whichDays & 64) result.push("Sunday");
		if (whichDays & 1) result.push("Monday");
		if (whichDays & 2) result.push("Tuesday");
		if (whichDays & 4) result.push("Wednesday");
		if (whichDays & 8) result.push("Thursday");
		if (whichDays & 16) result.push("Friday");
		if (whichDays & 32) result.push("Saturday");
		return "on " + result.join(", ");
	}

	function getApplicationTriggerActionString(trigger) {
		switch (trigger.FireType2) {
			case "Launch":
				return "Launches";
			case "Quit":
				return "Quits";
			case "WhileRunning":
				return "Is Running " + getTriggerRepeatString(trigger.RepeatTime);
			case "Activate":
				return "Activates";
			case "Deactivate":
				return "Deactivates";
			case "WhileActive":
				return "Is Active " + getTriggerRepeatString(trigger.RepeatTime);
			default:
				return "'" + trigger.FireType2 + "'";
		}
	}

	function getFolderTriggerString(trigger) {
		var observe = {
			Add: "adds an item",
			Remove: "removes an item",
			Both: "adds or removes an item"
		};
		var observeWhen = {
			Immediate: "trigger changes immediately",
			IgnorePartial: "ignore partial files",
			WaitCompletion: "ignore partial or changing files"
		};
		var folder = (trigger.Interest && trigger.Interest.Path) ? trigger.Interest.Path : "";
		if (!folder)
			return "Folder";
		return "The folder '" + folder + "' " + observe[trigger.Interest.Observe] +
			"; " + observeWhen[trigger.Interest.ObserveWhen];
	}

	function getVolumeTriggerVolumeString(trigger) {
		var mounted = { true: "mounted", false: "unmounted" };

		if (trigger.TargetType == "Any")
			return "Any volume";
		return "A volume " + trigger.TargetType.toLowerCase() + " '" + trigger.Name +
			"' is " + mounted[trigger.Mounted];
	}

	function getWirelessTriggerString(trigger) {
		var matchType = {
			NameIs: "the exact name",
			NameContains: "name containing",
			NameMatches: "name matching",
			BSSID: "BSSID"
		};
		var connected = { true: "connected", false: "disconnected" };

		if (trigger.MatchType == "Any")
			return "Any wireless network is " + connected[trigger.Connected];

		return "A wireless network with " + matchType[trigger.MatchType] +
			" '" + trigger.Name + "' is " + connected[trigger.Connected];
	}

	function getMacroTriggerSummary(trigger) {
		var attached = { true: "attached", false: "detached" };

		var triggerType = trigger.MacroTriggerType;
		switch (triggerType) {
			case "HotKey":
				return "HotKey: " + keyModifiersToString(trigger.Modifiers) +
					keyCodeToString(trigger.KeyCode);
			case "MacroPalette":
				return "Global Palette";
			case "StatusMenu":
				return triggerType;
			case "TypedString":
				return "Typed String: '" + trigger.TypedString + "'";
			case "Application":
				var app = trigger.Application;
				var appName = (app && app.Name) ? app.Name : "Any application";
				return appName + " " + getApplicationTriggerActionString(trigger);
			case "Clipboard":
				return "The system clipboard changes";
			case "Time":
				switch (trigger.ExecuteType) {
					case "Launch":
						return "At engine launch";
					case "Login":
						return "At login";
					case "While":
						return "Periodically wile logged in, " +
							getTriggerRepeatString(trigger.RepeatTime) +
							" between " + getTriggerTimeRangeString(trigger.TimeHour, trigger.TimeMinutes) +
							" and " + getTriggerTimeRangeString(trigger.TimeFinishHour, trigger.TimeFinishMinutes) +
							" " + getTriggerDaysString(trigger.WhichDays);
					case "Time":
						return "At " + getTriggerTimeRangeString(trigger.TimeHour, trigger.TimeMinutes) +
							" " + getTriggerDaysString(trigger.WhichDays);
					default:
						return "'" + trigger.ExecuteType + "'";
				}
			case "FocussedWindow":
				switch (trigger.ChangeType) {
					case "FocussedWindowChanges":
						return "The focused window changes";
					case "FocussedWindowTitleChanges":
						return "The focused window title changes";
					case "FocussedWindowsTitleChanged":
						return "The focused window's title changed";
					case "FocussedWindowsFrameChanged":
						return "The focused window's frame changed"
					default:
						"'" + trigger.ChangeType + "'";
				}
			case "Folder":
				return getFolderTriggerString(trigger);
			case "MIDI":
				return "MIDI";
			case "Volume":
				return getVolumeTriggerVolumeString(trigger);
			case "PublicWeb":
				return "The public web entry is executed";
			case "Sleep":
				return "At system sleep";
			case "HID":
				return trigger.ElementName + " " + trigger.FireType;
			case "USBDevice":
				return "USB device " + trigger.TargetType + " '" + trigger.Name + "' is " +
					attached[trigger.Attach];
			case "Wake":
				return "At system wake";
			case "WirelessNetwork":
				return getWirelessTriggerString(trigger);
		}
		return triggerType;
	}

	// getKMMacroTriggersSummary

	if (!triggers || triggers.length == 0) return "";

	var result = [];
	triggers.forEach(function(trigger) {
		result.push(getMacroTriggerSummary(trigger));
	})
	return result.join("\n");
} // getKMMacroTriggersSummary
```