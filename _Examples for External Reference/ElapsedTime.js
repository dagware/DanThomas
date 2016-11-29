(function(inDesignMode) {
    'use strict';

    Number.prototype.toPaddedString = function toPaddedString(len, padding) {
        padding = padding ? padding : "0";
        len = len > 0 ? len : 1;
        var result = this.toString();
        if (result.length >= len)
            return result;
        return Array(len - result.length).join(padding) + result;
    };

    function parseElapsedTime(milliseconds) {
        var mSecond = 1000;
        var mMinute = mSecond * 60;
        var mHour = mMinute * 60;
        var mDay = mHour * 24;

        var result = {};
        result.days = Math.floor(milliseconds / mDay);
        milliseconds = milliseconds - (result.days * mDay);
        result.hours = Math.floor(milliseconds / mHour);
        milliseconds = milliseconds - (result.hours * mHour);
        result.minutes = Math.floor(milliseconds / mMinute);
        milliseconds = milliseconds - (result.minutes * mMinute);
        result.seconds = Math.floor(milliseconds / mSecond);
        result.milliseconds = milliseconds - (result.seconds * mSecond);
        return result;
    }

    function execute() {
        var kme = Application("Keyboard Maestro Engine");
        var dt1 = parseInt(kme.getvariable("etStart"));
        var dt2 = parseInt(kme.getvariable("etEnd"));
        var elapsed = parseElapsedTime(Math.abs(dt1 - dt2));

        return elapsed.days.toPaddedString(2) +
            ":" + elapsed.hours.toPaddedString(2) +
            ":" + elapsed.minutes.toPaddedString(2) +
            ":" + elapsed.seconds.toPaddedString(2) +
            ":" + elapsed.milliseconds.toPaddedString(3);
    }

    if (inDesignMode) {
        return execute();
    } else {
        try {
            return execute();
        } catch (e) {
            return e.message;
        }
    }
})(true);
