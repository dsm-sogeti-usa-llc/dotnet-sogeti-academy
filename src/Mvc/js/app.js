var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        (function (LoggingSeverity) {
            LoggingSeverity[LoggingSeverity["CRITICAL"] = 0] = "CRITICAL";
            LoggingSeverity[LoggingSeverity["WARNING"] = 1] = "WARNING";
        })(ApplicationInsights.LoggingSeverity || (ApplicationInsights.LoggingSeverity = {}));
        var LoggingSeverity = ApplicationInsights.LoggingSeverity;
        var _InternalLogging = (function () {
            function _InternalLogging() {
            }
            _InternalLogging.throwInternalNonUserActionable = function (severity, message) {
                if (this.enableDebugExceptions()) {
                    throw message;
                }
                else {
                    this.warnToConsole(message);
                    this.logInternalMessage(severity, this.AiNonUserActionablePrefix + message);
                }
            };
            _InternalLogging.throwInternalUserActionable = function (severity, message) {
                if (this.enableDebugExceptions()) {
                    throw message;
                }
                else {
                    this.warnToConsole(message);
                    this.logInternalMessage(severity, this.AiUserActionablePrefix + message);
                }
            };
            _InternalLogging.warnToConsole = function (message) {
                if (typeof console !== "undefined" && !!console) {
                    if (typeof console.warn === "function") {
                        console.warn(message);
                    }
                    else if (typeof console.log === "function") {
                        console.log(message);
                    }
                }
            };
            _InternalLogging.resetInternalMessageCount = function () {
                this._messageCount = 0;
            };
            _InternalLogging.setMaxInternalMessageLimit = function (limit) {
                if (!limit) {
                    throw new Error('limit cannot be undefined.');
                }
                this.MAX_INTERNAL_MESSAGE_LIMIT = limit;
            };
            _InternalLogging.logInternalMessage = function (severity, message) {
                if (this._areInternalMessagesThrottled()) {
                    return;
                }
                if (this.verboseLogging() || severity === 0 /* CRITICAL */) {
                    this.queue.push(message);
                    this._messageCount++;
                }
                if (this._messageCount == this.MAX_INTERNAL_MESSAGE_LIMIT) {
                    var throttleLimitMessage = this.AiNonUserActionablePrefix + "Internal events throttle limit per PageView reached for this app.";
                    this.queue.push(throttleLimitMessage);
                    this.warnToConsole(throttleLimitMessage);
                }
            };
            _InternalLogging._areInternalMessagesThrottled = function () {
                return this._messageCount >= this.MAX_INTERNAL_MESSAGE_LIMIT;
            };
            _InternalLogging.AiUserActionablePrefix = "AI: ";
            _InternalLogging.AiNonUserActionablePrefix = "AI (Internal): ";
            _InternalLogging.enableDebugExceptions = function () { return false; };
            _InternalLogging.verboseLogging = function () { return false; };
            _InternalLogging.queue = [];
            _InternalLogging.MAX_INTERNAL_MESSAGE_LIMIT = 25;
            _InternalLogging._messageCount = 0;
            return _InternalLogging;
        })();
        ApplicationInsights._InternalLogging = _InternalLogging;
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Util = (function () {
            function Util() {
            }
            Util._getStorageObject = function () {
                try {
                    if (window.localStorage) {
                        return window.localStorage;
                    }
                    else {
                        return null;
                    }
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.warnToConsole('Failed to get client localStorage: ' + e.message);
                    return null;
                }
            };
            Util.canUseLocalStorage = function () {
                return !!Util._getStorageObject();
            };
            Util.getStorage = function (name) {
                var storage = Util._getStorageObject();
                if (storage !== null) {
                    try {
                        return storage.getItem(name);
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "Browser failed read of local storage." + Util.dump(e));
                    }
                }
                return null;
            };
            Util.setStorage = function (name, data) {
                var storage = Util._getStorageObject();
                if (storage !== null) {
                    try {
                        storage.setItem(name, data);
                        return true;
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "Browser failed write to local storage." + Util.dump(e));
                    }
                }
                return false;
            };
            Util.removeStorage = function (name) {
                var storage = Util._getStorageObject();
                if (storage !== null) {
                    try {
                        storage.removeItem(name);
                        return true;
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "Browser failed removal of local storage item." + Util.dump(e));
                    }
                }
                return false;
            };
            Util._getSessionStorageObject = function () {
                try {
                    if (window.sessionStorage) {
                        return window.sessionStorage;
                    }
                    else {
                        return null;
                    }
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.warnToConsole('Failed to get client session storage: ' + e.message);
                    return null;
                }
            };
            Util.canUseSessionStorage = function () {
                return !!Util._getSessionStorageObject();
            };
            Util.getSessionStorage = function (name) {
                var storage = Util._getSessionStorageObject();
                if (storage !== null) {
                    try {
                        return storage.getItem(name);
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Browser failed read of session storage." + Util.dump(e));
                    }
                }
                return null;
            };
            Util.setSessionStorage = function (name, data) {
                var storage = Util._getSessionStorageObject();
                if (storage !== null) {
                    try {
                        storage.setItem(name, data);
                        return true;
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Browser failed write to session storage." + Util.dump(e));
                    }
                }
                return false;
            };
            Util.removeSessionStorage = function (name) {
                var storage = Util._getSessionStorageObject();
                if (storage !== null) {
                    try {
                        storage.removeItem(name);
                        return true;
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Browser failed removal of session storage item." + Util.dump(e));
                    }
                }
                return false;
            };
            Util.setCookie = function (name, value) {
                Util.document.cookie = name + "=" + value + ";path=/";
            };
            Util.stringToBoolOrDefault = function (str) {
                if (!str) {
                    return false;
                }
                return str.toString().toLowerCase() === "true";
            };
            Util.getCookie = function (name) {
                var value = "";
                if (name && name.length) {
                    var cookieName = name + "=";
                    var cookies = Util.document.cookie.split(";");
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i];
                        cookie = Util.trim(cookie);
                        if (cookie && cookie.indexOf(cookieName) === 0) {
                            value = cookie.substring(cookieName.length, cookies[i].length);
                            break;
                        }
                    }
                }
                return value;
            };
            Util.deleteCookie = function (name) {
                Util.document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            };
            Util.trim = function (str) {
                if (typeof str !== "string")
                    return str;
                return str.replace(/^\s+|\s+$/g, "");
            };
            Util.newGuid = function () {
                var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
                var oct = "", tmp;
                for (var a = 0; a < 4; a++) {
                    tmp = (4294967296 * Math.random()) | 0;
                    oct += hexValues[tmp & 0xF] + hexValues[tmp >> 4 & 0xF] + hexValues[tmp >> 8 & 0xF] + hexValues[tmp >> 12 & 0xF] + hexValues[tmp >> 16 & 0xF] + hexValues[tmp >> 20 & 0xF] + hexValues[tmp >> 24 & 0xF] + hexValues[tmp >> 28 & 0xF];
                }
                var clockSequenceHi = hexValues[8 + (Math.random() * 4) | 0];
                return oct.substr(0, 8) + "-" + oct.substr(9, 4) + "-4" + oct.substr(13, 3) + "-" + clockSequenceHi + oct.substr(16, 3) + "-" + oct.substr(19, 12);
            };
            Util.isArray = function (obj) {
                return Object.prototype.toString.call(obj) === "[object Array]";
            };
            Util.isError = function (obj) {
                return Object.prototype.toString.call(obj) === "[object Error]";
            };
            Util.isDate = function (obj) {
                return Object.prototype.toString.call(obj) === "[object Date]";
            };
            Util.toISOStringForIE8 = function (date) {
                if (Util.isDate(date)) {
                    if (Date.prototype.toISOString) {
                        return date.toISOString();
                    }
                    else {
                        function pad(number) {
                            var r = String(number);
                            if (r.length === 1) {
                                r = "0" + r;
                            }
                            return r;
                        }
                        return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + "T" + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + "." + String((date.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + "Z";
                    }
                }
            };
            Util.msToTimeSpan = function (totalms) {
                if (isNaN(totalms) || totalms < 0) {
                    totalms = 0;
                }
                var ms = "" + totalms % 1000;
                var sec = "" + Math.floor(totalms / 1000) % 60;
                var min = "" + Math.floor(totalms / (1000 * 60)) % 60;
                var hour = "" + Math.floor(totalms / (1000 * 60 * 60)) % 24;
                ms = ms.length === 1 ? "00" + ms : ms.length === 2 ? "0" + ms : ms;
                sec = sec.length < 2 ? "0" + sec : sec;
                min = min.length < 2 ? "0" + min : min;
                hour = hour.length < 2 ? "0" + hour : hour;
                return hour + ":" + min + ":" + sec + "." + ms;
            };
            Util.isCrossOriginError = function (message, url, lineNumber, columnNumber, error) {
                return (message == "Script error." || message == "Script error") && url == "" && lineNumber == 0 && columnNumber == 0 && error == null;
            };
            Util.dump = function (object) {
                var objectTypeDump = Object.prototype.toString.call(object);
                var propertyValueDump = JSON.stringify(object);
                if (objectTypeDump === "[object Error]") {
                    propertyValueDump = "{ stack: '" + object.stack + "', message: '" + object.message + "', name: '" + object.name + "'";
                }
                return objectTypeDump + propertyValueDump;
            };
            Util.addEventHandler = function (eventName, callback) {
                if (!window || typeof eventName !== 'string' || typeof callback !== 'function') {
                    return false;
                }
                var verbEventName = 'on' + eventName;
                if (window.addEventListener) {
                    window.addEventListener(eventName, callback, false);
                }
                else if (window.attachEvent) {
                    window.attachEvent(verbEventName, callback);
                }
                else {
                    return false;
                }
                return true;
            };
            Util.document = typeof document !== "undefined" ? document : {};
            Util.NotSpecified = "not_specified";
            return Util;
        })();
        ApplicationInsights.Util = Util;
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
        var Serializer = (function () {
            function Serializer() {
            }
            Serializer.serialize = function (input) {
                var output = Serializer._serializeObject(input, "root");
                return JSON.stringify(output);
            };
            Serializer._serializeObject = function (source, name) {
                var circularReferenceCheck = "__aiCircularRefCheck";
                var output = {};
                if (!source) {
                    ApplicationInsights._InternalLogging.throwInternalUserActionable(0 /* CRITICAL */, "cannot serialize " + name + " because it is null or undefined");
                    return output;
                }
                if (source[circularReferenceCheck]) {
                    ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "Circular reference detected while serializing: '" + name);
                    return output;
                }
                if (!source.aiDataContract) {
                    if (name === "measurements") {
                        output = Serializer._serializeStringMap(source, "number", name);
                    }
                    else if (name === "properties") {
                        output = Serializer._serializeStringMap(source, "string", name);
                    }
                    else if (name === "tags") {
                        output = Serializer._serializeStringMap(source, "string", name);
                    }
                    else if (ApplicationInsights.Util.isArray(source)) {
                        output = Serializer._serializeArray(source, name);
                    }
                    else {
                        ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "Attempting to serialize an object which does not implement ISerializable: " + name);
                        try {
                            JSON.stringify(source);
                            output = source;
                        }
                        catch (e) {
                            ApplicationInsights._InternalLogging.throwInternalUserActionable(0 /* CRITICAL */, e && typeof e.toString === 'function' ? e.toString() : "Error serializing object");
                        }
                    }
                    return output;
                }
                source[circularReferenceCheck] = true;
                for (var field in source.aiDataContract) {
                    var isRequired = source.aiDataContract[field];
                    var isArray = typeof isRequired !== "boolean";
                    var isPresent = source[field] !== undefined;
                    var isObject = typeof source[field] === "object" && source[field] !== null;
                    if (isRequired && !isPresent && !isArray) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Missing required field specification: The field '" + field + "' on '" + name + "' is required but not present on source");
                        continue;
                    }
                    var value;
                    if (isObject) {
                        if (isArray) {
                            value = Serializer._serializeArray(source[field], field);
                        }
                        else {
                            value = Serializer._serializeObject(source[field], field);
                        }
                    }
                    else {
                        value = source[field];
                    }
                    if (value !== undefined) {
                        output[field] = value;
                    }
                }
                delete source[circularReferenceCheck];
                return output;
            };
            Serializer._serializeArray = function (sources, name) {
                var output = undefined;
                if (!!sources) {
                    if (!ApplicationInsights.Util.isArray(sources)) {
                        ApplicationInsights._InternalLogging.throwInternalUserActionable(0 /* CRITICAL */, "This field was specified as an array in the contract but the item is not an array.\r\n" + name);
                    }
                    else {
                        output = [];
                        for (var i = 0; i < sources.length; i++) {
                            var source = sources[i];
                            var item = Serializer._serializeObject(source, name + "[" + i + "]");
                            output.push(item);
                        }
                    }
                }
                return output;
            };
            Serializer._serializeStringMap = function (map, expectedType, name) {
                var output = undefined;
                if (map) {
                    output = {};
                    for (var field in map) {
                        var value = map[field];
                        if (expectedType === "string") {
                            if (value === undefined) {
                                output[field] = "undefined";
                            }
                            else if (value === null) {
                                output[field] = "null";
                            }
                            else if (!value.toString) {
                                output[field] = "invalid field: toString() is not defined.";
                            }
                            else {
                                output[field] = value.toString();
                            }
                        }
                        else if (expectedType === "number") {
                            if (value === undefined) {
                                output[field] = "undefined";
                            }
                            else if (value === null) {
                                output[field] = "null";
                            }
                            else {
                                var num = parseFloat(value);
                                if (isNaN(num)) {
                                    output[field] = "NaN";
                                }
                                else {
                                    output[field] = num;
                                }
                            }
                        }
                        else {
                            output[field] = "invalid field: " + name + " is of unknown type.";
                            ApplicationInsights._InternalLogging.throwInternalUserActionable(0 /* CRITICAL */, output[field]);
                        }
                    }
                }
                return output;
            };
            return Serializer;
        })();
        ApplicationInsights.Serializer = Serializer;
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var Telemetry;
    (function (Telemetry) {
        "use strict";
        var Base = (function () {
            function Base() {
            }
            return Base;
        })();
        Telemetry.Base = Base;
    })(Telemetry = Microsoft.Telemetry || (Microsoft.Telemetry = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var Telemetry;
    (function (Telemetry) {
        "use strict";
        var Envelope = (function () {
            function Envelope() {
                this.ver = 1;
                this.sampleRate = 100.0;
                this.tags = {};
            }
            return Envelope;
        })();
        Telemetry.Envelope = Envelope;
    })(Telemetry = Microsoft.Telemetry || (Microsoft.Telemetry = {}));
})(Microsoft || (Microsoft = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            var Common;
            (function (Common) {
                "use strict";
                var Envelope = (function (_super) {
                    __extends(Envelope, _super);
                    function Envelope(data, name) {
                        _super.call(this);
                        this.name = name;
                        this.data = data;
                        this.time = ApplicationInsights.Util.toISOStringForIE8(new Date());
                        this.aiDataContract = {
                            time: true,
                            iKey: true,
                            name: true,
                            tags: true,
                            data: true
                        };
                    }
                    return Envelope;
                })(Microsoft.Telemetry.Envelope);
                Common.Envelope = Envelope;
            })(Common = Telemetry.Common || (Telemetry.Common = {}));
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            var Common;
            (function (Common) {
                "use strict";
                var Base = (function (_super) {
                    __extends(Base, _super);
                    function Base() {
                        _super.apply(this, arguments);
                        this.aiDataContract = {};
                    }
                    return Base;
                })(Microsoft.Telemetry.Base);
                Common.Base = Base;
            })(Common = Telemetry.Common || (Telemetry.Common = {}));
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    var ContextTagKeys = (function () {
        function ContextTagKeys() {
            this.applicationVersion = "ai.application.ver";
            this.applicationBuild = "ai.application.build";
            this.applicationTypeId = "ai.application.typeId";
            this.deviceId = "ai.device.id";
            this.deviceIp = "ai.device.ip";
            this.deviceLanguage = "ai.device.language";
            this.deviceLocale = "ai.device.locale";
            this.deviceModel = "ai.device.model";
            this.deviceNetwork = "ai.device.network";
            this.deviceNetworkName = "ai.device.networkName";
            this.deviceOEMName = "ai.device.oemName";
            this.deviceOS = "ai.device.os";
            this.deviceOSVersion = "ai.device.osVersion";
            this.deviceRoleInstance = "ai.device.roleInstance";
            this.deviceRoleName = "ai.device.roleName";
            this.deviceScreenResolution = "ai.device.screenResolution";
            this.deviceType = "ai.device.type";
            this.deviceMachineName = "ai.device.machineName";
            this.deviceVMName = "ai.device.vmName";
            this.locationIp = "ai.location.ip";
            this.operationId = "ai.operation.id";
            this.operationName = "ai.operation.name";
            this.operationParentId = "ai.operation.parentId";
            this.operationRootId = "ai.operation.rootId";
            this.operationSyntheticSource = "ai.operation.syntheticSource";
            this.operationIsSynthetic = "ai.operation.isSynthetic";
            this.sessionId = "ai.session.id";
            this.sessionIsFirst = "ai.session.isFirst";
            this.sessionIsNew = "ai.session.isNew";
            this.userAccountAcquisitionDate = "ai.user.accountAcquisitionDate";
            this.userAccountId = "ai.user.accountId";
            this.userAgent = "ai.user.userAgent";
            this.userId = "ai.user.id";
            this.userStoreRegion = "ai.user.storeRegion";
            this.userAuthUserId = "ai.user.authUserId";
            this.userAnonymousUserAcquisitionDate = "ai.user.anonUserAcquisitionDate";
            this.userAuthenticatedUserAcquisitionDate = "ai.user.authUserAcquisitionDate";
            this.sampleRate = "ai.sample.sampleRate";
            this.internalSdkVersion = "ai.internal.sdkVersion";
            this.internalAgentVersion = "ai.internal.agentVersion";
            this.internalDataCollectorReceivedTime = "ai.internal.dataCollectorReceivedTime";
            this.internalProfileId = "ai.internal.profileId";
            this.internalProfileClassId = "ai.internal.profileClassId";
            this.internalAccountId = "ai.internal.accountId";
            this.internalApplicationName = "ai.internal.applicationName";
            this.internalInstrumentationKey = "ai.internal.instrumentationKey";
            this.internalTelemetryItemId = "ai.internal.telemetryItemId";
            this.internalApplicationType = "ai.internal.applicationType";
            this.internalRequestSource = "ai.internal.requestSource";
            this.internalFlowType = "ai.internal.flowType";
            this.internalIsAudit = "ai.internal.isAudit";
            this.internalTrackingSourceId = "ai.internal.trackingSourceId";
            this.internalTrackingType = "ai.internal.trackingType";
        }
        return ContextTagKeys;
    })();
    AI.ContextTagKeys = ContextTagKeys;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
            var Application = (function () {
                function Application() {
                }
                return Application;
            })();
            Context.Application = Application;
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
            var Device = (function () {
                function Device() {
                    this.id = "browser";
                    if (typeof screen !== "undefined" && screen.width && screen.height) {
                        this.resolution = screen.width + "X" + screen.height;
                    }
                    this.locale = (typeof screen !== "undefined" && navigator.browserLanguage) ? navigator.browserLanguage : "unknown";
                }
                return Device;
            })();
            Context.Device = Device;
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
            var Internal = (function () {
                function Internal() {
                    this.sdkVersion = "JavaScript:" + ApplicationInsights.Version;
                }
                return Internal;
            })();
            Context.Internal = Internal;
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
            var Location = (function () {
                function Location() {
                }
                return Location;
            })();
            Context.Location = Location;
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
            var Operation = (function () {
                function Operation() {
                    this.id = ApplicationInsights.Util.newGuid();
                }
                return Operation;
            })();
            Context.Operation = Operation;
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var SamplingScoreGenerator = (function () {
            function SamplingScoreGenerator() {
            }
            SamplingScoreGenerator.getScore = function (envelope) {
                var tagKeys = new AI.ContextTagKeys();
                var score = 0;
                if (envelope.tags[tagKeys.userId]) {
                    score = SamplingScoreGenerator.getSamplingHashCode(envelope.tags[tagKeys.userId]) / SamplingScoreGenerator.INT_MAX_VALUE;
                }
                else if (envelope.tags[tagKeys.operationId]) {
                    score = SamplingScoreGenerator.getSamplingHashCode(envelope.tags[tagKeys.operationId]) / SamplingScoreGenerator.INT_MAX_VALUE;
                }
                else {
                    score = Math.random();
                }
                return score * 100;
            };
            SamplingScoreGenerator.getSamplingHashCode = function (input) {
                if (input == "") {
                    return 0;
                }
                var hash = 5381;
                for (var i = 0; i < input.length; ++i) {
                    hash = ((hash << 5) + hash) + input.charCodeAt(i);
                    hash = hash & hash;
                }
                return Math.abs(hash);
            };
            SamplingScoreGenerator.INT_MAX_VALUE = 2147483647;
            return SamplingScoreGenerator;
        })();
        ApplicationInsights.SamplingScoreGenerator = SamplingScoreGenerator;
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
            var Sample = (function () {
                function Sample(sampleRate) {
                    this.INT_MAX_VALUE = 2147483647;
                    if (sampleRate > 100 || sampleRate < 0) {
                        ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "Sampling rate is out of range (0..100): '" + sampleRate + "'. Sampling will be disabled, you may be sending too much data which may affect your AI service level.");
                        this.sampleRate = 100;
                    }
                    this.sampleRate = sampleRate;
                }
                Sample.prototype.isSampledIn = function (envelope) {
                    if (this.sampleRate == 100)
                        return true;
                    var score = ApplicationInsights.SamplingScoreGenerator.getScore(envelope);
                    return score < this.sampleRate;
                };
                return Sample;
            })();
            Context.Sample = Sample;
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    (function (SessionState) {
        SessionState[SessionState["Start"] = 0] = "Start";
        SessionState[SessionState["End"] = 1] = "End";
    })(AI.SessionState || (AI.SessionState = {}));
    var SessionState = AI.SessionState;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
            var Session = (function () {
                function Session() {
                }
                return Session;
            })();
            Context.Session = Session;
            var _SessionManager = (function () {
                function _SessionManager(config, sessionHandler) {
                    if (!config) {
                        config = {};
                    }
                    if (!(typeof config.sessionExpirationMs === "function")) {
                        config.sessionExpirationMs = function () { return _SessionManager.acquisitionSpan; };
                    }
                    if (!(typeof config.sessionRenewalMs === "function")) {
                        config.sessionRenewalMs = function () { return _SessionManager.renewalSpan; };
                    }
                    this.config = config;
                    this._sessionHandler = sessionHandler;
                    this.automaticSession = new Session();
                }
                _SessionManager.prototype.update = function () {
                    if (!this.automaticSession.id) {
                        this.initializeAutomaticSession();
                    }
                    var now = +new Date;
                    var acquisitionExpired = now - this.automaticSession.acquisitionDate > this.config.sessionExpirationMs();
                    var renewalExpired = now - this.automaticSession.renewalDate > this.config.sessionRenewalMs();
                    if (acquisitionExpired || renewalExpired) {
                        if (typeof this._sessionHandler === "function") {
                            this._sessionHandler(1 /* End */, this.automaticSession.renewalDate);
                        }
                        this.automaticSession.isFirst = undefined;
                        this.renew();
                    }
                    else {
                        this.automaticSession.renewalDate = +new Date;
                        this.setCookie(this.automaticSession.id, this.automaticSession.acquisitionDate, this.automaticSession.renewalDate);
                    }
                };
                _SessionManager.prototype.backup = function () {
                    this.setStorage(this.automaticSession.id, this.automaticSession.acquisitionDate, this.automaticSession.renewalDate);
                };
                _SessionManager.prototype.initializeAutomaticSession = function () {
                    var cookie = ApplicationInsights.Util.getCookie('ai_session');
                    if (cookie && typeof cookie.split === "function") {
                        this.initializeAutomaticSessionWithData(cookie);
                    }
                    else {
                        var storage = ApplicationInsights.Util.getStorage('ai_session');
                        if (storage) {
                            this.initializeAutomaticSessionWithData(storage);
                        }
                    }
                    if (!this.automaticSession.id) {
                        this.automaticSession.isFirst = true;
                        this.renew();
                    }
                };
                _SessionManager.prototype.initializeAutomaticSessionWithData = function (sessionData) {
                    var params = sessionData.split("|");
                    if (params.length > 0) {
                        this.automaticSession.id = params[0];
                    }
                    try {
                        if (params.length > 1) {
                            var acq = +params[1];
                            this.automaticSession.acquisitionDate = +new Date(acq);
                            this.automaticSession.acquisitionDate = this.automaticSession.acquisitionDate > 0 ? this.automaticSession.acquisitionDate : 0;
                        }
                        if (params.length > 2) {
                            var renewal = +params[2];
                            this.automaticSession.renewalDate = +new Date(renewal);
                            this.automaticSession.renewalDate = this.automaticSession.renewalDate > 0 ? this.automaticSession.renewalDate : 0;
                        }
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Error parsing ai_session cookie, session will be reset: " + ApplicationInsights.Util.dump(e));
                    }
                    if (this.automaticSession.renewalDate == 0) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "AI session renewal date is 0, session will be reset.");
                    }
                };
                _SessionManager.prototype.renew = function () {
                    var now = +new Date;
                    this.automaticSession.id = ApplicationInsights.Util.newGuid();
                    this.automaticSession.acquisitionDate = now;
                    this.automaticSession.renewalDate = now;
                    this.setCookie(this.automaticSession.id, this.automaticSession.acquisitionDate, this.automaticSession.renewalDate);
                    if (typeof this._sessionHandler === "function") {
                        this._sessionHandler(0 /* Start */, now);
                    }
                    if (!ApplicationInsights.Util.canUseLocalStorage()) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "Browser does not support local storage. Session durations will be inaccurate.");
                    }
                };
                _SessionManager.prototype.setCookie = function (guid, acq, renewal) {
                    var acquisitionExpiry = acq + this.config.sessionExpirationMs();
                    var renewalExpiry = renewal + this.config.sessionRenewalMs();
                    var cookieExpiry = new Date();
                    var cookie = [guid, acq, renewal];
                    if (acquisitionExpiry < renewalExpiry) {
                        cookieExpiry.setTime(acquisitionExpiry);
                    }
                    else {
                        cookieExpiry.setTime(renewalExpiry);
                    }
                    ApplicationInsights.Util.setCookie('ai_session', cookie.join('|') + ';expires=' + cookieExpiry.toUTCString());
                };
                _SessionManager.prototype.setStorage = function (guid, acq, renewal) {
                    ApplicationInsights.Util.setStorage('ai_session', [guid, acq, renewal].join('|'));
                };
                _SessionManager.acquisitionSpan = 86400000;
                _SessionManager.renewalSpan = 1800000;
                return _SessionManager;
            })();
            Context._SessionManager = _SessionManager;
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Context;
        (function (Context) {
            "use strict";
            var User = (function () {
                function User(accountId) {
                    var cookie = ApplicationInsights.Util.getCookie(User.userCookieName);
                    if (cookie) {
                        var params = cookie.split(User.cookieSeparator);
                        if (params.length > 0) {
                            this.id = params[0];
                        }
                    }
                    if (!this.id) {
                        this.id = ApplicationInsights.Util.newGuid();
                        var date = new Date();
                        var acqStr = ApplicationInsights.Util.toISOStringForIE8(date);
                        this.accountAcquisitionDate = acqStr;
                        date.setTime(date.getTime() + 31536000000);
                        var newCookie = [this.id, acqStr];
                        ApplicationInsights.Util.setCookie(User.userCookieName, newCookie.join(User.cookieSeparator) + ';expires=' + date.toUTCString());
                        ApplicationInsights.Util.removeStorage('ai_session');
                    }
                    this.accountId = accountId;
                    var authCookie = ApplicationInsights.Util.getCookie(User.authUserCookieName);
                    if (authCookie) {
                        authCookie = decodeURI(authCookie);
                        var authCookieString = authCookie.split(User.cookieSeparator);
                        if (authCookieString[0]) {
                            this.authenticatedId = authCookieString[0];
                        }
                        if (authCookieString.length > 1 && authCookieString[1]) {
                            this.accountId = authCookieString[1];
                        }
                    }
                }
                User.prototype.setAuthenticatedUserContext = function (authenticatedUserId, accountId) {
                    var isInvalidInput = !this.validateUserInput(authenticatedUserId) || (accountId && !this.validateUserInput(accountId));
                    if (isInvalidInput) {
                        ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "Setting auth user context failed. " + "User auth/account id should be of type string, and not contain commas, semi-colons, equal signs, spaces, or vertical-bars.");
                        return;
                    }
                    this.authenticatedId = authenticatedUserId;
                    var authCookie = this.authenticatedId;
                    if (accountId) {
                        this.accountId = accountId;
                        authCookie = [this.authenticatedId, this.accountId].join(User.cookieSeparator);
                    }
                    ApplicationInsights.Util.setCookie(User.authUserCookieName, encodeURI(authCookie));
                };
                User.prototype.clearAuthenticatedUserContext = function () {
                    this.authenticatedId = null;
                    this.accountId = null;
                    ApplicationInsights.Util.deleteCookie(User.authUserCookieName);
                };
                User.prototype.validateUserInput = function (id) {
                    if (typeof id !== 'string' || !id || id.match(/,|;|=| |\|/)) {
                        return false;
                    }
                    return true;
                };
                User.cookieSeparator = '|';
                User.userCookieName = 'ai_user';
                User.authUserCookieName = 'ai_authUser';
                return User;
            })();
            Context.User = User;
        })(Context = ApplicationInsights.Context || (ApplicationInsights.Context = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
        var Sender = (function () {
            function Sender(config) {
                this._buffer = [];
                this._lastSend = 0;
                this._config = config;
                this._sender = null;
                if (typeof XMLHttpRequest != "undefined") {
                    var testXhr = new XMLHttpRequest();
                    if ("withCredentials" in testXhr) {
                        this._sender = this._xhrSender;
                    }
                    else if (typeof XDomainRequest !== "undefined") {
                        this._sender = this._xdrSender;
                    }
                }
            }
            Sender.prototype.send = function (envelope) {
                var _this = this;
                try {
                    if (this._config.disableTelemetry()) {
                        return;
                    }
                    if (!envelope) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Cannot send empty telemetry");
                        return;
                    }
                    if (!this._sender) {
                        ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Sender was not initialized");
                        return;
                    }
                    var payload = ApplicationInsights.Serializer.serialize(envelope);
                    if (this._getSizeInBytes(this._buffer) + payload.length > this._config.maxBatchSizeInBytes()) {
                        this.triggerSend();
                    }
                    this._buffer.push(payload);
                    if (!this._timeoutHandle) {
                        this._timeoutHandle = setTimeout(function () {
                            _this._timeoutHandle = null;
                            _this.triggerSend();
                        }, this._config.maxBatchInterval());
                    }
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Failed adding telemetry to the sender's buffer, some telemetry will be lost: " + ApplicationInsights.Util.dump(e));
                }
            };
            Sender.prototype._getSizeInBytes = function (list) {
                var size = 0;
                if (list && list.length) {
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        if (item && item.length) {
                            size += item.length;
                        }
                    }
                }
                return size;
            };
            Sender.prototype.triggerSend = function (async) {
                var isAsync = true;
                if (typeof async === 'boolean') {
                    isAsync = async;
                }
                try {
                    if (!this._config.disableTelemetry()) {
                        if (this._buffer.length) {
                            var batch = this._config.emitLineDelimitedJson() ? this._buffer.join("\n") : "[" + this._buffer.join(",") + "]";
                            this._sender(batch, isAsync);
                        }
                        this._lastSend = +new Date;
                    }
                    this._buffer.length = 0;
                    clearTimeout(this._timeoutHandle);
                    this._timeoutHandle = null;
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "Telemetry transmission failed, some telemetry will be lost: " + ApplicationInsights.Util.dump(e));
                }
            };
            Sender.prototype._xhrSender = function (payload, isAsync) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", this._config.endpointUrl(), isAsync);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function () { return Sender._xhrReadyStateChange(xhr, payload); };
                xhr.onerror = function (event) { return Sender._onError(payload, xhr.responseText || xhr.response || "", event); };
                xhr.send(payload);
            };
            Sender.prototype._xdrSender = function (payload, isAsync) {
                var xdr = new XDomainRequest();
                xdr.onload = function () { return Sender._xdrOnLoad(xdr, payload); };
                xdr.onerror = function (event) { return Sender._onError(payload, xdr.responseText || "", event); };
                xdr.open('POST', this._config.endpointUrl());
                xdr.send(payload);
            };
            Sender._xhrReadyStateChange = function (xhr, payload) {
                if (xhr.readyState === 4) {
                    if ((xhr.status < 200 || xhr.status >= 300) && xhr.status !== 0) {
                        Sender._onError(payload, xhr.responseText || xhr.response || "");
                    }
                    else {
                        Sender._onSuccess(payload);
                    }
                }
            };
            Sender._xdrOnLoad = function (xdr, payload) {
                if (xdr && (xdr.responseText + "" === "200" || xdr.responseText === "")) {
                    Sender._onSuccess(payload);
                }
                else {
                    Sender._onError(payload, xdr && xdr.responseText || "");
                }
            };
            Sender._onError = function (payload, message, event) {
                ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "Failed to send telemetry:\n" + message);
            };
            Sender._onSuccess = function (payload) {
            };
            return Sender;
        })();
        ApplicationInsights.Sender = Sender;
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var Telemetry;
    (function (Telemetry) {
        "use strict";
        var Domain = (function () {
            function Domain() {
            }
            return Domain;
        })();
        Telemetry.Domain = Domain;
    })(Telemetry = Microsoft.Telemetry || (Microsoft.Telemetry = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    (function (SeverityLevel) {
        SeverityLevel[SeverityLevel["Verbose"] = 0] = "Verbose";
        SeverityLevel[SeverityLevel["Information"] = 1] = "Information";
        SeverityLevel[SeverityLevel["Warning"] = 2] = "Warning";
        SeverityLevel[SeverityLevel["Error"] = 3] = "Error";
        SeverityLevel[SeverityLevel["Critical"] = 4] = "Critical";
    })(AI.SeverityLevel || (AI.SeverityLevel = {}));
    var SeverityLevel = AI.SeverityLevel;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    var MessageData = (function (_super) {
        __extends(MessageData, _super);
        function MessageData() {
            this.ver = 2;
            this.properties = {};
            _super.call(this);
        }
        return MessageData;
    })(Microsoft.Telemetry.Domain);
    AI.MessageData = MessageData;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            var Common;
            (function (Common) {
                "use strict";
                var DataSanitizer = (function () {
                    function DataSanitizer() {
                    }
                    DataSanitizer.sanitizeKeyAndAddUniqueness = function (key, map) {
                        var origLength = key.length;
                        var field = DataSanitizer.sanitizeKey(key);
                        if (field.length !== origLength) {
                            var i = 0;
                            var uniqueField = field;
                            while (map[uniqueField] !== undefined) {
                                i++;
                                uniqueField = field.substring(0, DataSanitizer.MAX_NAME_LENGTH - 3) + DataSanitizer.padNumber(i);
                            }
                            field = uniqueField;
                        }
                        return field;
                    };
                    DataSanitizer.sanitizeKey = function (name) {
                        if (name) {
                            name = ApplicationInsights.Util.trim(name.toString());
                            if (name.search(/[^0-9a-zA-Z-._()\/ ]/g) >= 0) {
                                name = name.replace(/[^0-9a-zA-Z-._()\/ ]/g, "_");
                                ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "name contains illegal characters. Illgeal character have been replaced with '_'. new name: " + name);
                            }
                            if (name.length > DataSanitizer.MAX_NAME_LENGTH) {
                                name = name.substring(0, DataSanitizer.MAX_NAME_LENGTH);
                                ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "name is too long.  It has been truncated to " + DataSanitizer.MAX_NAME_LENGTH + " characters.  name: " + name);
                            }
                        }
                        return name;
                    };
                    DataSanitizer.sanitizeString = function (value) {
                        if (value) {
                            value = ApplicationInsights.Util.trim(value);
                            if (value.toString().length > DataSanitizer.MAX_STRING_LENGTH) {
                                value = value.substring(0, DataSanitizer.MAX_STRING_LENGTH);
                                ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "string value is too long. It has been truncated to " + DataSanitizer.MAX_STRING_LENGTH + " characters. value: " + value);
                            }
                        }
                        return value;
                    };
                    DataSanitizer.sanitizeUrl = function (url) {
                        if (url) {
                            if (url.length > DataSanitizer.MAX_URL_LENGTH) {
                                url = url.substring(0, DataSanitizer.MAX_URL_LENGTH);
                                ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "url is too long, it has been trucated to " + DataSanitizer.MAX_URL_LENGTH + " characters. url: " + url);
                            }
                        }
                        return url;
                    };
                    DataSanitizer.sanitizeMessage = function (message) {
                        if (message) {
                            if (message.length > DataSanitizer.MAX_MESSAGE_LENGTH) {
                                message = message.substring(0, DataSanitizer.MAX_MESSAGE_LENGTH);
                                ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "message is too long, it has been trucated to " + DataSanitizer.MAX_MESSAGE_LENGTH + " characters.  message: " + message);
                            }
                        }
                        return message;
                    };
                    DataSanitizer.sanitizeException = function (exception) {
                        if (exception) {
                            if (exception.length > DataSanitizer.MAX_EXCEPTION_LENGTH) {
                                exception = exception.substring(0, DataSanitizer.MAX_EXCEPTION_LENGTH);
                                ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "exception is too long, iit has been trucated to " + DataSanitizer.MAX_EXCEPTION_LENGTH + " characters.  exception: " + exception);
                            }
                        }
                        return exception;
                    };
                    DataSanitizer.sanitizeProperties = function (properties) {
                        if (properties) {
                            var tempProps = {};
                            for (var prop in properties) {
                                var value = DataSanitizer.sanitizeString(properties[prop]);
                                prop = DataSanitizer.sanitizeKeyAndAddUniqueness(prop, tempProps);
                                tempProps[prop] = value;
                            }
                            properties = tempProps;
                        }
                        return properties;
                    };
                    DataSanitizer.sanitizeMeasurements = function (measurements) {
                        if (measurements) {
                            var tempMeasurements = {};
                            for (var measure in measurements) {
                                var value = measurements[measure];
                                measure = DataSanitizer.sanitizeKeyAndAddUniqueness(measure, tempMeasurements);
                                tempMeasurements[measure] = value;
                            }
                            measurements = tempMeasurements;
                        }
                        return measurements;
                    };
                    DataSanitizer.padNumber = function (num) {
                        var s = "00" + num;
                        return s.substr(s.length - 3);
                    };
                    DataSanitizer.MAX_NAME_LENGTH = 150;
                    DataSanitizer.MAX_STRING_LENGTH = 1024;
                    DataSanitizer.MAX_URL_LENGTH = 2048;
                    DataSanitizer.MAX_MESSAGE_LENGTH = 32768;
                    DataSanitizer.MAX_EXCEPTION_LENGTH = 32768;
                    return DataSanitizer;
                })();
                Common.DataSanitizer = DataSanitizer;
            })(Common = Telemetry.Common || (Telemetry.Common = {}));
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            "use strict";
            var Trace = (function (_super) {
                __extends(Trace, _super);
                function Trace(message, properties) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        message: true,
                        severityLevel: false,
                        measurements: false,
                        properties: false
                    };
                    message = message || ApplicationInsights.Util.NotSpecified;
                    this.message = Telemetry.Common.DataSanitizer.sanitizeMessage(message);
                    this.properties = Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
                }
                Trace.envelopeType = "Microsoft.ApplicationInsights.Message";
                Trace.dataType = "MessageData";
                return Trace;
            })(AI.MessageData);
            Telemetry.Trace = Trace;
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    var EventData = (function (_super) {
        __extends(EventData, _super);
        function EventData() {
            this.ver = 2;
            this.properties = {};
            this.measurements = {};
            _super.call(this);
        }
        return EventData;
    })(Microsoft.Telemetry.Domain);
    AI.EventData = EventData;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            "use strict";
            var Event = (function (_super) {
                __extends(Event, _super);
                function Event(name, properties, measurements) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        name: true,
                        properties: false,
                        measurements: false
                    };
                    this.name = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeString(name);
                    this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
                    this.measurements = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeMeasurements(measurements);
                }
                Event.envelopeType = "Microsoft.ApplicationInsights.Event";
                Event.dataType = "EventData";
                return Event;
            })(AI.EventData);
            Telemetry.Event = Event;
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    var ExceptionDetails = (function () {
        function ExceptionDetails() {
            this.hasFullStack = true;
            this.parsedStack = [];
        }
        return ExceptionDetails;
    })();
    AI.ExceptionDetails = ExceptionDetails;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    var ExceptionData = (function (_super) {
        __extends(ExceptionData, _super);
        function ExceptionData() {
            this.ver = 2;
            this.exceptions = [];
            this.properties = {};
            this.measurements = {};
            _super.call(this);
        }
        return ExceptionData;
    })(Microsoft.Telemetry.Domain);
    AI.ExceptionData = ExceptionData;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    var StackFrame = (function () {
        function StackFrame() {
        }
        return StackFrame;
    })();
    AI.StackFrame = StackFrame;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            "use strict";
            var Exception = (function (_super) {
                __extends(Exception, _super);
                function Exception(exception, handledAt, properties, measurements) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        handledAt: true,
                        exceptions: true,
                        severityLevel: false,
                        properties: false,
                        measurements: false
                    };
                    this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
                    this.measurements = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeMeasurements(measurements);
                    this.handledAt = handledAt || "unhandled";
                    this.exceptions = [new _ExceptionDetails(exception)];
                }
                Exception.CreateSimpleException = function (message, typeName, assembly, fileName, details, line, handledAt) {
                    var exceptionTelemetry;
                    try {
                        throw new Error();
                    }
                    catch (e) {
                        exceptionTelemetry = new Telemetry.Exception(e);
                    }
                    var stack = exceptionTelemetry.exceptions[0].parsedStack[0];
                    stack.assembly = assembly;
                    stack.fileName = fileName;
                    stack.level = 0;
                    stack.line = line;
                    stack.method = "unknown";
                    var exception = exceptionTelemetry.exceptions[0];
                    exception.hasFullStack = true;
                    exception.message = message;
                    exception.parsedStack = null;
                    exception.stack = details;
                    exception.typeName = typeName;
                    exceptionTelemetry.handledAt = handledAt || "unhandled";
                    return exceptionTelemetry;
                };
                Exception.envelopeType = "Microsoft.ApplicationInsights.Exception";
                Exception.dataType = "ExceptionData";
                return Exception;
            })(AI.ExceptionData);
            Telemetry.Exception = Exception;
            var _ExceptionDetails = (function (_super) {
                __extends(_ExceptionDetails, _super);
                function _ExceptionDetails(exception) {
                    _super.call(this);
                    this.aiDataContract = {
                        id: false,
                        outerId: false,
                        typeName: true,
                        message: true,
                        hasFullStack: false,
                        stack: false,
                        parsedStack: []
                    };
                    this.typeName = Telemetry.Common.DataSanitizer.sanitizeString(exception.name || ApplicationInsights.Util.NotSpecified);
                    this.message = Telemetry.Common.DataSanitizer.sanitizeMessage(exception.message || ApplicationInsights.Util.NotSpecified);
                    var stack = exception["stack"];
                    this.parsedStack = this.parseStack(stack);
                    this.stack = Telemetry.Common.DataSanitizer.sanitizeException(stack);
                    this.hasFullStack = ApplicationInsights.Util.isArray(this.parsedStack) && this.parsedStack.length > 0;
                }
                _ExceptionDetails.prototype.parseStack = function (stack) {
                    var parsedStack = undefined;
                    if (typeof stack === "string") {
                        var frames = stack.split('\n');
                        parsedStack = [];
                        var level = 0;
                        var totalSizeInBytes = 0;
                        for (var i = 0; i <= frames.length; i++) {
                            var frame = frames[i];
                            if (_StackFrame.regex.test(frame)) {
                                var parsedFrame = new _StackFrame(frames[i], level++);
                                totalSizeInBytes += parsedFrame.sizeInBytes;
                                parsedStack.push(parsedFrame);
                            }
                        }
                        var exceptionParsedStackThreshold = 32 * 1024;
                        if (totalSizeInBytes > exceptionParsedStackThreshold) {
                            var left = 0;
                            var right = parsedStack.length - 1;
                            var size = 0;
                            var acceptedLeft = left;
                            var acceptedRight = right;
                            while (left < right) {
                                var lSize = parsedStack[left].sizeInBytes;
                                var rSize = parsedStack[right].sizeInBytes;
                                size += lSize + rSize;
                                if (size > exceptionParsedStackThreshold) {
                                    var howMany = acceptedRight - acceptedLeft + 1;
                                    parsedStack.splice(acceptedLeft, howMany);
                                    break;
                                }
                                acceptedLeft = left;
                                acceptedRight = right;
                                left++;
                                right--;
                            }
                        }
                    }
                    return parsedStack;
                };
                return _ExceptionDetails;
            })(AI.ExceptionDetails);
            var _StackFrame = (function (_super) {
                __extends(_StackFrame, _super);
                function _StackFrame(frame, level) {
                    _super.call(this);
                    this.sizeInBytes = 0;
                    this.aiDataContract = {
                        level: true,
                        method: true,
                        assembly: false,
                        fileName: false,
                        line: false
                    };
                    this.level = level;
                    this.method = "unavailable";
                    this.assembly = ApplicationInsights.Util.trim(frame);
                    var matches = frame.match(_StackFrame.regex);
                    if (matches && matches.length >= 5) {
                        this.method = ApplicationInsights.Util.trim(matches[2]);
                        this.fileName = ApplicationInsights.Util.trim(matches[4]);
                        this.line = parseInt(matches[5]) || 0;
                    }
                    this.sizeInBytes += this.method.length;
                    this.sizeInBytes += this.fileName.length;
                    this.sizeInBytes += this.assembly.length;
                    this.sizeInBytes += _StackFrame.baseSize;
                    this.sizeInBytes += this.level.toString().length;
                    this.sizeInBytes += this.line.toString().length;
                }
                _StackFrame.regex = /^([\s]+at)?(.*?)(\@|\s\(|\s)([^\(\@\n]+):([0-9]+):([0-9]+)(\)?)$/;
                _StackFrame.baseSize = 58;
                return _StackFrame;
            })(AI.StackFrame);
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    var MetricData = (function (_super) {
        __extends(MetricData, _super);
        function MetricData() {
            this.ver = 2;
            this.metrics = [];
            this.properties = {};
            _super.call(this);
        }
        return MetricData;
    })(Microsoft.Telemetry.Domain);
    AI.MetricData = MetricData;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    (function (DataPointType) {
        DataPointType[DataPointType["Measurement"] = 0] = "Measurement";
        DataPointType[DataPointType["Aggregation"] = 1] = "Aggregation";
    })(AI.DataPointType || (AI.DataPointType = {}));
    var DataPointType = AI.DataPointType;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    var DataPoint = (function () {
        function DataPoint() {
            this.kind = 0 /* Measurement */;
        }
        return DataPoint;
    })();
    AI.DataPoint = DataPoint;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            var Common;
            (function (Common) {
                "use strict";
                var DataPoint = (function (_super) {
                    __extends(DataPoint, _super);
                    function DataPoint() {
                        _super.apply(this, arguments);
                        this.aiDataContract = {
                            name: true,
                            kind: false,
                            value: true,
                            count: false,
                            min: false,
                            max: false,
                            stdDev: false
                        };
                    }
                    return DataPoint;
                })(AI.DataPoint);
                Common.DataPoint = DataPoint;
            })(Common = Telemetry.Common || (Telemetry.Common = {}));
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            "use strict";
            var Metric = (function (_super) {
                __extends(Metric, _super);
                function Metric(name, value, count, min, max, properties) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        metrics: true,
                        properties: false
                    };
                    var dataPoint = new Microsoft.ApplicationInsights.Telemetry.Common.DataPoint();
                    dataPoint.count = count > 0 ? count : undefined;
                    dataPoint.max = isNaN(max) || max === null ? undefined : max;
                    dataPoint.min = isNaN(min) || min === null ? undefined : min;
                    dataPoint.name = Telemetry.Common.DataSanitizer.sanitizeString(name);
                    dataPoint.value = value;
                    this.metrics = [dataPoint];
                    this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
                }
                Metric.envelopeType = "Microsoft.ApplicationInsights.Metric";
                Metric.dataType = "MetricData";
                return Metric;
            })(AI.MetricData);
            Telemetry.Metric = Metric;
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    var PageViewData = (function (_super) {
        __extends(PageViewData, _super);
        function PageViewData() {
            this.ver = 2;
            this.properties = {};
            this.measurements = {};
            _super.call(this);
        }
        return PageViewData;
    })(AI.EventData);
    AI.PageViewData = PageViewData;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            "use strict";
            var PageView = (function (_super) {
                __extends(PageView, _super);
                function PageView(name, url, durationMs, properties, measurements) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        name: false,
                        url: false,
                        duration: false,
                        properties: false,
                        measurements: false
                    };
                    this.url = Telemetry.Common.DataSanitizer.sanitizeUrl(url);
                    this.name = Telemetry.Common.DataSanitizer.sanitizeString(name || ApplicationInsights.Util.NotSpecified);
                    if (!isNaN(durationMs)) {
                        this.duration = ApplicationInsights.Util.msToTimeSpan(durationMs);
                    }
                    this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
                    this.measurements = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeMeasurements(measurements);
                }
                PageView.envelopeType = "Microsoft.ApplicationInsights.Pageview";
                PageView.dataType = "PageviewData";
                return PageView;
            })(AI.PageViewData);
            Telemetry.PageView = PageView;
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    var PageViewPerfData = (function (_super) {
        __extends(PageViewPerfData, _super);
        function PageViewPerfData() {
            this.ver = 2;
            this.properties = {};
            this.measurements = {};
            _super.call(this);
        }
        return PageViewPerfData;
    })(AI.PageViewData);
    AI.PageViewPerfData = PageViewPerfData;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            "use strict";
            var PageViewPerformance = (function (_super) {
                __extends(PageViewPerformance, _super);
                function PageViewPerformance(name, url, durationMs, properties, measurements) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        name: false,
                        url: false,
                        duration: false,
                        perfTotal: false,
                        networkConnect: false,
                        sentRequest: false,
                        receivedResponse: false,
                        domProcessing: false,
                        properties: false,
                        measurements: false
                    };
                    this.isValid = false;
                    var timing = PageViewPerformance.getPerformanceTiming();
                    if (timing) {
                        var total = PageViewPerformance.getDuration(timing.navigationStart, timing.loadEventEnd);
                        var network = PageViewPerformance.getDuration(timing.navigationStart, timing.connectEnd);
                        var request = PageViewPerformance.getDuration(timing.requestStart, timing.responseStart);
                        var response = PageViewPerformance.getDuration(timing.responseStart, timing.responseEnd);
                        var dom = PageViewPerformance.getDuration(timing.responseEnd, timing.loadEventEnd);
                        if (total == 0) {
                            ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "error calculating page view performance: total='" + total + "', network='" + network + "', request='" + request + "', response='" + response + "', dom='" + dom + "'");
                        }
                        else if (total < Math.floor(network) + Math.floor(request) + Math.floor(response) + Math.floor(dom)) {
                            ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "client performance math error:" + total + " < " + network + " + " + request + " + " + response + " + " + dom);
                        }
                        else {
                            durationMs = total;
                            this.perfTotal = ApplicationInsights.Util.msToTimeSpan(total);
                            this.networkConnect = ApplicationInsights.Util.msToTimeSpan(network);
                            this.sentRequest = ApplicationInsights.Util.msToTimeSpan(request);
                            this.receivedResponse = ApplicationInsights.Util.msToTimeSpan(response);
                            this.domProcessing = ApplicationInsights.Util.msToTimeSpan(dom);
                            this.isValid = true;
                        }
                    }
                    this.url = Telemetry.Common.DataSanitizer.sanitizeUrl(url);
                    this.name = Telemetry.Common.DataSanitizer.sanitizeString(name || ApplicationInsights.Util.NotSpecified);
                    if (!isNaN(durationMs)) {
                        this.duration = ApplicationInsights.Util.msToTimeSpan(durationMs);
                    }
                    this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
                    this.measurements = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeMeasurements(measurements);
                }
                PageViewPerformance.getPerformanceTiming = function () {
                    if (typeof window != "undefined" && window.performance && window.performance.timing) {
                        return window.performance.timing;
                    }
                    return null;
                };
                PageViewPerformance.isPerformanceTimingSupported = function () {
                    return typeof window != "undefined" && window.performance && window.performance.timing;
                };
                PageViewPerformance.isPerformanceTimingDataReady = function () {
                    var timing = window.performance.timing;
                    return timing.domainLookupStart > 0 && timing.navigationStart > 0 && timing.responseStart > 0 && timing.requestStart > 0 && timing.loadEventEnd > 0 && timing.responseEnd > 0 && timing.connectEnd > 0 && timing.domLoading > 0;
                };
                PageViewPerformance.getDuration = function (start, end) {
                    var duration = 0;
                    if (!(isNaN(start) || isNaN(end))) {
                        duration = Math.max(end - start, 0);
                    }
                    return duration;
                };
                PageViewPerformance.envelopeType = "Microsoft.ApplicationInsights.PageviewPerformance";
                PageViewPerformance.dataType = "PageviewPerformanceData";
                return PageViewPerformance;
            })(AI.PageViewPerfData);
            Telemetry.PageViewPerformance = PageViewPerformance;
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    var SessionStateData = (function (_super) {
        __extends(SessionStateData, _super);
        function SessionStateData() {
            this.ver = 2;
            this.state = 0 /* Start */;
            _super.call(this);
        }
        return SessionStateData;
    })(Microsoft.Telemetry.Domain);
    AI.SessionStateData = SessionStateData;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            "use strict";
            var SessionTelemetry = (function (_super) {
                __extends(SessionTelemetry, _super);
                function SessionTelemetry(state) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        state: true
                    };
                    this.state = state;
                }
                SessionTelemetry.envelopeType = "Microsoft.ApplicationInsights.SessionState";
                SessionTelemetry.dataType = "SessionStateData";
                return SessionTelemetry;
            })(AI.SessionStateData);
            Telemetry.SessionTelemetry = SessionTelemetry;
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
        var TelemetryContext = (function () {
            function TelemetryContext(config) {
                var _this = this;
                this._config = config;
                this._sender = new ApplicationInsights.Sender(config);
                if (typeof window !== 'undefined') {
                    this._sessionManager = new ApplicationInsights.Context._SessionManager(config, function (sessionState, timestamp) { return TelemetryContext._sessionHandler(_this, sessionState, timestamp); });
                    this.application = new ApplicationInsights.Context.Application();
                    this.device = new ApplicationInsights.Context.Device();
                    this.internal = new ApplicationInsights.Context.Internal();
                    this.location = new ApplicationInsights.Context.Location();
                    this.user = new ApplicationInsights.Context.User(config.accountId());
                    this.operation = new ApplicationInsights.Context.Operation();
                    this.session = new ApplicationInsights.Context.Session();
                    this.sample = new ApplicationInsights.Context.Sample(config.sampleRate());
                }
            }
            TelemetryContext.prototype.addTelemetryInitializer = function (telemetryInitializer) {
                this.telemetryInitializers = this.telemetryInitializers || [];
                this.telemetryInitializers.push(telemetryInitializer);
            };
            TelemetryContext.prototype.track = function (envelope) {
                if (!envelope) {
                    ApplicationInsights._InternalLogging.throwInternalUserActionable(0 /* CRITICAL */, "cannot call .track() with a null or undefined argument");
                }
                else {
                    if (envelope.name === ApplicationInsights.Telemetry.PageView.envelopeType) {
                        ApplicationInsights._InternalLogging.resetInternalMessageCount();
                    }
                    if (this.session) {
                        if (typeof this.session.id !== "string") {
                            this._sessionManager.update();
                        }
                    }
                    this._track(envelope);
                }
                return envelope;
            };
            TelemetryContext.prototype._track = function (envelope) {
                if (this.session) {
                    if (typeof this.session.id === "string") {
                        this._applySessionContext(envelope, this.session);
                    }
                    else {
                        this._applySessionContext(envelope, this._sessionManager.automaticSession);
                    }
                }
                this._applyApplicationContext(envelope, this.application);
                this._applyDeviceContext(envelope, this.device);
                this._applyInternalContext(envelope, this.internal);
                this._applyLocationContext(envelope, this.location);
                this._applySampleContext(envelope, this.sample);
                this._applyUserContext(envelope, this.user);
                this._applyOperationContext(envelope, this.operation);
                envelope.iKey = this._config.instrumentationKey();
                var telemetryInitializersFailed = false;
                try {
                    this.telemetryInitializers = this.telemetryInitializers || [];
                    var telemetryInitializersCount = this.telemetryInitializers.length;
                    for (var i = 0; i < telemetryInitializersCount; ++i) {
                        var telemetryInitializer = this.telemetryInitializers[i];
                        if (telemetryInitializer) {
                            telemetryInitializer.apply(null, [envelope]);
                        }
                    }
                }
                catch (e) {
                    telemetryInitializersFailed = true;
                    ApplicationInsights._InternalLogging.throwInternalUserActionable(0 /* CRITICAL */, "One of telemetry initializers failed, telemetry item will not be sent: " + ApplicationInsights.Util.dump(e));
                }
                if (!telemetryInitializersFailed) {
                    if (envelope.name === ApplicationInsights.Telemetry.SessionTelemetry.envelopeType || envelope.name === ApplicationInsights.Telemetry.Metric.envelopeType || this.sample.isSampledIn(envelope)) {
                        this._sender.send(envelope);
                    }
                    else {
                        ApplicationInsights._InternalLogging.logInternalMessage(1 /* WARNING */, "Telemetry is sampled and not sent to the AI service. SampleRate is " + this.sample.sampleRate);
                    }
                }
                return envelope;
            };
            TelemetryContext._sessionHandler = function (tc, sessionState, timestamp) {
                var sessionStateTelemetry = new ApplicationInsights.Telemetry.SessionTelemetry(sessionState);
                var sessionStateData = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.SessionTelemetry.dataType, sessionStateTelemetry);
                var sessionStateEnvelope = new ApplicationInsights.Telemetry.Common.Envelope(sessionStateData, ApplicationInsights.Telemetry.SessionTelemetry.envelopeType);
                sessionStateEnvelope.time = ApplicationInsights.Util.toISOStringForIE8(new Date(timestamp));
                tc._track(sessionStateEnvelope);
            };
            TelemetryContext.prototype._applyApplicationContext = function (envelope, appContext) {
                if (appContext) {
                    var tagKeys = new AI.ContextTagKeys();
                    if (typeof appContext.ver === "string") {
                        envelope.tags[tagKeys.applicationVersion] = appContext.ver;
                    }
                    if (typeof appContext.build === "string") {
                        envelope.tags[tagKeys.applicationBuild] = appContext.build;
                    }
                }
            };
            TelemetryContext.prototype._applyDeviceContext = function (envelope, deviceContext) {
                var tagKeys = new AI.ContextTagKeys();
                if (deviceContext) {
                    if (typeof deviceContext.id === "string") {
                        envelope.tags[tagKeys.deviceId] = deviceContext.id;
                    }
                    if (typeof deviceContext.ip === "string") {
                        envelope.tags[tagKeys.deviceIp] = deviceContext.ip;
                    }
                    if (typeof deviceContext.language === "string") {
                        envelope.tags[tagKeys.deviceLanguage] = deviceContext.language;
                    }
                    if (typeof deviceContext.locale === "string") {
                        envelope.tags[tagKeys.deviceLocale] = deviceContext.locale;
                    }
                    if (typeof deviceContext.model === "string") {
                        envelope.tags[tagKeys.deviceModel] = deviceContext.model;
                    }
                    if (typeof deviceContext.network !== "undefined") {
                        envelope.tags[tagKeys.deviceNetwork] = deviceContext.network;
                    }
                    if (typeof deviceContext.oemName === "string") {
                        envelope.tags[tagKeys.deviceOEMName] = deviceContext.oemName;
                    }
                    if (typeof deviceContext.os === "string") {
                        envelope.tags[tagKeys.deviceOS] = deviceContext.os;
                    }
                    if (typeof deviceContext.osversion === "string") {
                        envelope.tags[tagKeys.deviceOSVersion] = deviceContext.osversion;
                    }
                    if (typeof deviceContext.resolution === "string") {
                        envelope.tags[tagKeys.deviceScreenResolution] = deviceContext.resolution;
                    }
                    if (typeof deviceContext.type === "string") {
                        envelope.tags[tagKeys.deviceType] = deviceContext.type;
                    }
                }
            };
            TelemetryContext.prototype._applyInternalContext = function (envelope, internalContext) {
                if (internalContext) {
                    var tagKeys = new AI.ContextTagKeys();
                    if (typeof internalContext.agentVersion === "string") {
                        envelope.tags[tagKeys.internalAgentVersion] = internalContext.agentVersion;
                    }
                    if (typeof internalContext.sdkVersion === "string") {
                        envelope.tags[tagKeys.internalSdkVersion] = internalContext.sdkVersion;
                    }
                }
            };
            TelemetryContext.prototype._applyLocationContext = function (envelope, locationContext) {
                if (locationContext) {
                    var tagKeys = new AI.ContextTagKeys();
                    if (typeof locationContext.ip === "string") {
                        envelope.tags[tagKeys.locationIp] = locationContext.ip;
                    }
                }
            };
            TelemetryContext.prototype._applyOperationContext = function (envelope, operationContext) {
                if (operationContext) {
                    var tagKeys = new AI.ContextTagKeys();
                    if (typeof operationContext.id === "string") {
                        envelope.tags[tagKeys.operationId] = operationContext.id;
                    }
                    if (typeof operationContext.name === "string") {
                        envelope.tags[tagKeys.operationName] = operationContext.name;
                    }
                    if (typeof operationContext.parentId === "string") {
                        envelope.tags[tagKeys.operationParentId] = operationContext.parentId;
                    }
                    if (typeof operationContext.rootId === "string") {
                        envelope.tags[tagKeys.operationRootId] = operationContext.rootId;
                    }
                    if (typeof operationContext.syntheticSource === "string") {
                        envelope.tags[tagKeys.operationSyntheticSource] = operationContext.syntheticSource;
                    }
                }
            };
            TelemetryContext.prototype._applySampleContext = function (envelope, sampleContext) {
                if (sampleContext) {
                    var tagKeys = new AI.ContextTagKeys();
                    envelope.tags[tagKeys.sampleRate] = sampleContext.sampleRate;
                }
            };
            TelemetryContext.prototype._applySessionContext = function (envelope, sessionContext) {
                if (sessionContext) {
                    var tagKeys = new AI.ContextTagKeys();
                    if (typeof sessionContext.id === "string") {
                        envelope.tags[tagKeys.sessionId] = sessionContext.id;
                    }
                    if (typeof sessionContext.isFirst !== "undefined") {
                        envelope.tags[tagKeys.sessionIsFirst] = sessionContext.isFirst;
                    }
                }
            };
            TelemetryContext.prototype._applyUserContext = function (envelope, userContext) {
                if (userContext) {
                    var tagKeys = new AI.ContextTagKeys();
                    if (typeof userContext.accountAcquisitionDate === "string") {
                        envelope.tags[tagKeys.userAccountAcquisitionDate] = userContext.accountAcquisitionDate;
                    }
                    if (typeof userContext.accountId === "string") {
                        envelope.tags[tagKeys.userAccountId] = userContext.accountId;
                    }
                    if (typeof userContext.agent === "string") {
                        envelope.tags[tagKeys.userAgent] = userContext.agent;
                    }
                    if (typeof userContext.id === "string") {
                        envelope.tags[tagKeys.userId] = userContext.id;
                    }
                    if (typeof userContext.authenticatedId === "string") {
                        envelope.tags[tagKeys.userAuthUserId] = userContext.authenticatedId;
                    }
                    if (typeof userContext.storeRegion === "string") {
                        envelope.tags[tagKeys.userStoreRegion] = userContext.storeRegion;
                    }
                }
            };
            return TelemetryContext;
        })();
        ApplicationInsights.TelemetryContext = TelemetryContext;
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var Telemetry;
    (function (Telemetry) {
        "use strict";
        var Data = (function (_super) {
            __extends(Data, _super);
            function Data() {
                _super.call(this);
            }
            return Data;
        })(Microsoft.Telemetry.Base);
        Telemetry.Data = Data;
    })(Telemetry = Microsoft.Telemetry || (Microsoft.Telemetry = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            var Common;
            (function (Common) {
                "use strict";
                var Data = (function (_super) {
                    __extends(Data, _super);
                    function Data(type, data) {
                        _super.call(this);
                        this.aiDataContract = {
                            baseType: true,
                            baseData: true
                        };
                        this.baseType = type;
                        this.baseData = data;
                    }
                    return Data;
                })(Microsoft.Telemetry.Data);
                Common.Data = Data;
            })(Common = Telemetry.Common || (Telemetry.Common = {}));
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        var Telemetry;
        (function (Telemetry) {
            "use strict";
            var PageVisitTimeManager = (function () {
                function PageVisitTimeManager(pageVisitTimeTrackingHandler) {
                    this.prevPageVisitDataKeyName = "prevPageVisitData";
                    this.pageVisitTimeTrackingHandler = pageVisitTimeTrackingHandler;
                }
                PageVisitTimeManager.prototype.trackPreviousPageVisit = function (currentPageName, currentPageUrl) {
                    try {
                        var prevPageVisitTimeData = this.restartPageVisitTimer(currentPageName, currentPageUrl);
                        if (prevPageVisitTimeData) {
                            this.pageVisitTimeTrackingHandler(prevPageVisitTimeData.pageName, prevPageVisitTimeData.pageUrl, prevPageVisitTimeData.pageVisitTime);
                        }
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.warnToConsole("Auto track page visit time failed, metric will not be collected: " + ApplicationInsights.Util.dump(e));
                    }
                };
                PageVisitTimeManager.prototype.restartPageVisitTimer = function (pageName, pageUrl) {
                    try {
                        var prevPageVisitData = this.stopPageVisitTimer();
                        this.startPageVisitTimer(pageName, pageUrl);
                        return prevPageVisitData;
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.warnToConsole("Call to restart failed: " + ApplicationInsights.Util.dump(e));
                        return null;
                    }
                };
                PageVisitTimeManager.prototype.startPageVisitTimer = function (pageName, pageUrl) {
                    try {
                        if (ApplicationInsights.Util.canUseSessionStorage()) {
                            if (ApplicationInsights.Util.getSessionStorage(this.prevPageVisitDataKeyName) != null) {
                                throw new Error("Cannot call startPageVisit consecutively without first calling stopPageVisit");
                            }
                            var currPageVisitData = new PageVisitData(pageName, pageUrl);
                            var currPageVisitDataStr = JSON.stringify(currPageVisitData);
                            ApplicationInsights.Util.setSessionStorage(this.prevPageVisitDataKeyName, currPageVisitDataStr);
                        }
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.warnToConsole("Call to start failed: " + ApplicationInsights.Util.dump(e));
                    }
                };
                PageVisitTimeManager.prototype.stopPageVisitTimer = function () {
                    try {
                        if (ApplicationInsights.Util.canUseSessionStorage()) {
                            var pageVisitEndTime = Date.now();
                            var pageVisitDataJsonStr = ApplicationInsights.Util.getSessionStorage(this.prevPageVisitDataKeyName);
                            if (pageVisitDataJsonStr) {
                                var prevPageVisitData = JSON.parse(pageVisitDataJsonStr);
                                prevPageVisitData.pageVisitTime = pageVisitEndTime - prevPageVisitData.pageVisitStartTime;
                                ApplicationInsights.Util.removeSessionStorage(this.prevPageVisitDataKeyName);
                                return prevPageVisitData;
                            }
                            else {
                                return null;
                            }
                        }
                        return null;
                    }
                    catch (e) {
                        ApplicationInsights._InternalLogging.warnToConsole("Stop page visit timer failed: " + ApplicationInsights.Util.dump(e));
                        return null;
                    }
                };
                return PageVisitTimeManager;
            })();
            Telemetry.PageVisitTimeManager = PageVisitTimeManager;
            var PageVisitData = (function () {
                function PageVisitData(pageName, pageUrl) {
                    this.pageVisitStartTime = Date.now();
                    this.pageName = pageName;
                    this.pageUrl = pageUrl;
                }
                return PageVisitData;
            })();
            Telemetry.PageVisitData = PageVisitData;
        })(Telemetry = ApplicationInsights.Telemetry || (ApplicationInsights.Telemetry = {}));
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
        ApplicationInsights.Version = "0.18.0";
        var AppInsights = (function () {
            function AppInsights(config) {
                var _this = this;
                this.config = config || {};
                var defaults = AppInsights.defaultConfig;
                if (defaults !== undefined) {
                    for (var field in defaults) {
                        if (this.config[field] === undefined) {
                            this.config[field] = defaults[field];
                        }
                    }
                }
                ApplicationInsights._InternalLogging.verboseLogging = function () { return _this.config.verboseLogging; };
                ApplicationInsights._InternalLogging.enableDebugExceptions = function () { return _this.config.enableDebug; };
                var configGetters = {
                    instrumentationKey: function () { return _this.config.instrumentationKey; },
                    accountId: function () { return _this.config.accountId; },
                    appUserId: function () { return _this.config.appUserId; },
                    sessionRenewalMs: function () { return _this.config.sessionRenewalMs; },
                    sessionExpirationMs: function () { return _this.config.sessionExpirationMs; },
                    endpointUrl: function () { return _this.config.endpointUrl; },
                    emitLineDelimitedJson: function () { return _this.config.emitLineDelimitedJson; },
                    maxBatchSizeInBytes: function () { return _this.config.maxBatchSizeInBytes; },
                    maxBatchInterval: function () { return _this.config.maxBatchInterval; },
                    disableTelemetry: function () { return _this.config.disableTelemetry; },
                    sampleRate: function () { return _this.config.samplingPercentage; }
                };
                this.context = new ApplicationInsights.TelemetryContext(configGetters);
                this._eventTracking = new Timing("trackEvent");
                this._eventTracking.action = function (name, url, duration, properties, measurements) {
                    var event = new ApplicationInsights.Telemetry.Event(name, properties, measurements);
                    var data = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.Event.dataType, event);
                    var envelope = new ApplicationInsights.Telemetry.Common.Envelope(data, ApplicationInsights.Telemetry.Event.envelopeType);
                    _this.context.track(envelope);
                };
                this._pageTracking = new Timing("trackPageView");
                this._pageTracking.action = function (name, url, duration, properties, measurements) {
                    _this.sendPageViewInternal(name, url, duration, properties, measurements);
                };
                this._pageVisitTimeManager = new ApplicationInsights.Telemetry.PageVisitTimeManager(function (pageName, pageUrl, pageVisitTime) { return _this.trackPageVisitTime(pageName, pageUrl, pageVisitTime); });
            }
            AppInsights.prototype.sendPageViewInternal = function (name, url, duration, properties, measurements) {
                var pageView = new ApplicationInsights.Telemetry.PageView(name, url, duration, properties, measurements);
                var data = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.PageView.dataType, pageView);
                var envelope = new ApplicationInsights.Telemetry.Common.Envelope(data, ApplicationInsights.Telemetry.PageView.envelopeType);
                this.context.track(envelope);
            };
            AppInsights.prototype.startTrackPage = function (name) {
                try {
                    if (typeof name !== "string") {
                        name = window.document && window.document.title || "";
                    }
                    this._pageTracking.start(name);
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "startTrackPage failed, page view may not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.stopTrackPage = function (name, url, properties, measurements) {
                try {
                    if (typeof name !== "string") {
                        name = window.document && window.document.title || "";
                    }
                    if (typeof url !== "string") {
                        url = window.location && window.location.href || "";
                    }
                    this._pageTracking.stop(name, url, properties, measurements);
                    if (this.config.autoTrackPageVisitTime) {
                        this._pageVisitTimeManager.trackPreviousPageVisit(name, url);
                    }
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "stopTrackPage failed, page view will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.trackPageView = function (name, url, properties, measurements) {
                try {
                    if (typeof name !== "string") {
                        name = window.document && window.document.title || "";
                    }
                    if (typeof url !== "string") {
                        url = window.location && window.location.href || "";
                    }
                    this.trackPageViewInternal(name, url, properties, measurements);
                    if (this.config.autoTrackPageVisitTime) {
                        this._pageVisitTimeManager.trackPreviousPageVisit(name, url);
                    }
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "trackPageView failed, page view will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.trackPageViewInternal = function (name, url, properties, measurements) {
                var _this = this;
                var durationMs = 0;
                if (ApplicationInsights.Telemetry.PageViewPerformance.isPerformanceTimingSupported()) {
                    var startTime = window.performance.timing.navigationStart;
                    durationMs = ApplicationInsights.Telemetry.PageViewPerformance.getDuration(startTime, +new Date);
                    var handle = setInterval(function () {
                        try {
                            durationMs = ApplicationInsights.Telemetry.PageViewPerformance.getDuration(startTime, +new Date);
                            var timingDataReady = ApplicationInsights.Telemetry.PageViewPerformance.isPerformanceTimingDataReady();
                            var timeoutReached = durationMs > 60000;
                            if (timeoutReached || timingDataReady) {
                                clearInterval(handle);
                                durationMs = ApplicationInsights.Telemetry.PageViewPerformance.getDuration(startTime, +new Date);
                                var pageViewPerformance = new ApplicationInsights.Telemetry.PageViewPerformance(name, url, durationMs, properties, measurements);
                                _this.sendPageViewInternal(name, url, pageViewPerformance.isValid && !isNaN(pageViewPerformance.duration) ? +pageViewPerformance.duration : durationMs, properties, measurements);
                                if (pageViewPerformance.isValid) {
                                    var pageViewPerformanceData = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.PageViewPerformance.dataType, pageViewPerformance);
                                    var pageViewPerformanceEnvelope = new ApplicationInsights.Telemetry.Common.Envelope(pageViewPerformanceData, ApplicationInsights.Telemetry.PageViewPerformance.envelopeType);
                                    _this.context.track(pageViewPerformanceEnvelope);
                                }
                                _this.context._sender.triggerSend();
                            }
                        }
                        catch (e) {
                            ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "trackPageView failed on page load calculation: " + ApplicationInsights.Util.dump(e));
                        }
                    }, 100);
                }
            };
            AppInsights.prototype.startTrackEvent = function (name) {
                try {
                    this._eventTracking.start(name);
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "startTrackEvent failed, event will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.stopTrackEvent = function (name, properties, measurements) {
                try {
                    this._eventTracking.stop(name, undefined, properties, measurements);
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "stopTrackEvent failed, event will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.trackEvent = function (name, properties, measurements) {
                try {
                    var eventTelemetry = new ApplicationInsights.Telemetry.Event(name, properties, measurements);
                    var data = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.Event.dataType, eventTelemetry);
                    var envelope = new ApplicationInsights.Telemetry.Common.Envelope(data, ApplicationInsights.Telemetry.Event.envelopeType);
                    this.context.track(envelope);
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "trackEvent failed, event will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.trackException = function (exception, handledAt, properties, measurements) {
                try {
                    if (!ApplicationInsights.Util.isError(exception)) {
                        try {
                            throw new Error(exception);
                        }
                        catch (error) {
                            exception = error;
                        }
                    }
                    var exceptionTelemetry = new ApplicationInsights.Telemetry.Exception(exception, handledAt, properties, measurements);
                    var data = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.Exception.dataType, exceptionTelemetry);
                    var envelope = new ApplicationInsights.Telemetry.Common.Envelope(data, ApplicationInsights.Telemetry.Exception.envelopeType);
                    this.context.track(envelope);
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "trackException failed, exception will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.trackMetric = function (name, average, sampleCount, min, max, properties) {
                try {
                    var telemetry = new ApplicationInsights.Telemetry.Metric(name, average, sampleCount, min, max, properties);
                    var data = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.Metric.dataType, telemetry);
                    var envelope = new ApplicationInsights.Telemetry.Common.Envelope(data, ApplicationInsights.Telemetry.Metric.envelopeType);
                    this.context.track(envelope);
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "trackMetric failed, metric will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.trackTrace = function (message, properties) {
                try {
                    var telemetry = new ApplicationInsights.Telemetry.Trace(message, properties);
                    var data = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.Trace.dataType, telemetry);
                    var envelope = new ApplicationInsights.Telemetry.Common.Envelope(data, ApplicationInsights.Telemetry.Trace.envelopeType);
                    this.context.track(envelope);
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "trackTrace failed, trace will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.trackPageVisitTime = function (pageName, pageUrl, pageVisitTime) {
                var properties = { PageName: pageName, PageUrl: pageUrl };
                this.trackMetric("PageVisitTime", pageVisitTime, 1, pageVisitTime, pageVisitTime, properties);
            };
            AppInsights.prototype.flush = function () {
                try {
                    this.context._sender.triggerSend();
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "flush failed, telemetry will not be collected: " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.setAuthenticatedUserContext = function (authenticatedUserId, accountId) {
                try {
                    this.context.user.setAuthenticatedUserContext(authenticatedUserId, accountId);
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "Setting auth user context failed. " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.clearAuthenticatedUserContext = function () {
                try {
                    this.context.user.clearAuthenticatedUserContext();
                }
                catch (e) {
                    ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "Clearing auth user context failed. " + ApplicationInsights.Util.dump(e));
                }
            };
            AppInsights.prototype.SendCORSException = function (properties) {
                var exceptionData = Microsoft.ApplicationInsights.Telemetry.Exception.CreateSimpleException("Script error.", "Error", "unknown", "unknown", "The browser’s same-origin policy prevents us from getting the details of this exception.The exception occurred in a script loaded from an origin different than the web page.For cross- domain error reporting you can use crossorigin attribute together with appropriate CORS HTTP headers.For more information please see http://www.w3.org/TR/cors/.", 0, null);
                exceptionData.properties = properties;
                var data = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.Exception.dataType, exceptionData);
                var envelope = new ApplicationInsights.Telemetry.Common.Envelope(data, ApplicationInsights.Telemetry.Exception.envelopeType);
                this.context.track(envelope);
            };
            AppInsights.prototype._onerror = function (message, url, lineNumber, columnNumber, error) {
                try {
                    var properties = { url: url ? url : document.URL };
                    if (ApplicationInsights.Util.isCrossOriginError(message, url, lineNumber, columnNumber, error)) {
                        this.SendCORSException(properties);
                    }
                    else {
                        if (!ApplicationInsights.Util.isError(error)) {
                            var stack = "window.onerror@" + properties.url + ":" + lineNumber + ":" + (columnNumber || 0);
                            error = new Error(message);
                            error["stack"] = stack;
                        }
                        this.trackException(error, null, properties);
                    }
                }
                catch (exception) {
                    var errorString = error ? (error.name + ", " + error.message) : "null";
                    var exceptionDump = ApplicationInsights.Util.dump(exception);
                    ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, "_onerror threw " + exceptionDump + " while logging error, error will not be collected: " + errorString);
                }
            };
            return AppInsights;
        })();
        ApplicationInsights.AppInsights = AppInsights;
        var Timing = (function () {
            function Timing(name) {
                this._name = name;
                this._events = {};
            }
            Timing.prototype.start = function (name) {
                if (typeof this._events[name] !== "undefined") {
                    ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "start" + this._name + " was called more than once for this event without calling stop" + this._name + ". key is '" + name + "'");
                }
                this._events[name] = +new Date;
            };
            Timing.prototype.stop = function (name, url, properties, measurements) {
                var start = this._events[name];
                if (isNaN(start)) {
                    ApplicationInsights._InternalLogging.throwInternalUserActionable(1 /* WARNING */, "stop" + this._name + " was called without a corresponding start" + this._name + " . Event name is '" + name + "'");
                }
                else {
                    var end = +new Date;
                    var duration = ApplicationInsights.Telemetry.PageViewPerformance.getDuration(start, end);
                    this.action(name, url, duration, properties, measurements);
                }
                delete this._events[name];
                this._events[name] = undefined;
            };
            return Timing;
        })();
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
var AI;
(function (AI) {
    "use strict";
    var AjaxCallData = (function (_super) {
        __extends(AjaxCallData, _super);
        function AjaxCallData() {
            this.ver = 2;
            this.properties = {};
            this.measurements = {};
            _super.call(this);
        }
        return AjaxCallData;
    })(AI.PageViewData);
    AI.AjaxCallData = AjaxCallData;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    (function (DependencyKind) {
        DependencyKind[DependencyKind["SQL"] = 0] = "SQL";
        DependencyKind[DependencyKind["Http"] = 1] = "Http";
        DependencyKind[DependencyKind["Other"] = 2] = "Other";
    })(AI.DependencyKind || (AI.DependencyKind = {}));
    var DependencyKind = AI.DependencyKind;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    (function (DependencySourceType) {
        DependencySourceType[DependencySourceType["Undefined"] = 0] = "Undefined";
        DependencySourceType[DependencySourceType["Aic"] = 1] = "Aic";
        DependencySourceType[DependencySourceType["Apmc"] = 2] = "Apmc";
    })(AI.DependencySourceType || (AI.DependencySourceType = {}));
    var DependencySourceType = AI.DependencySourceType;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    var RemoteDependencyData = (function (_super) {
        __extends(RemoteDependencyData, _super);
        function RemoteDependencyData() {
            this.ver = 2;
            this.kind = 0 /* Measurement */;
            this.dependencyKind = 2 /* Other */;
            this.success = true;
            this.dependencySource = 0 /* Undefined */;
            this.properties = {};
            _super.call(this);
        }
        return RemoteDependencyData;
    })(Microsoft.Telemetry.Domain);
    AI.RemoteDependencyData = RemoteDependencyData;
})(AI || (AI = {}));
var AI;
(function (AI) {
    "use strict";
    var RequestData = (function (_super) {
        __extends(RequestData, _super);
        function RequestData() {
            this.ver = 2;
            this.properties = {};
            this.measurements = {};
            _super.call(this);
        }
        return RequestData;
    })(Microsoft.Telemetry.Domain);
    AI.RequestData = RequestData;
})(AI || (AI = {}));
var Microsoft;
(function (Microsoft) {
    var ApplicationInsights;
    (function (ApplicationInsights) {
        "use strict";
        var Initialization = (function () {
            function Initialization(snippet) {
                snippet.queue = snippet.queue || [];
                var config = snippet.config || {};
                if (config && !config.instrumentationKey) {
                    config = snippet;
                    if (config["iKey"]) {
                        Microsoft.ApplicationInsights.Version = "0.10.0.0";
                        config.instrumentationKey = config["iKey"];
                    }
                    else if (config["applicationInsightsId"]) {
                        Microsoft.ApplicationInsights.Version = "0.7.2.0";
                        config.instrumentationKey = config["applicationInsightsId"];
                    }
                    else {
                        throw new Error("Cannot load Application Insights SDK, no instrumentationKey was provided.");
                    }
                }
                config = Initialization.getDefaultConfig(config);
                this.snippet = snippet;
                this.config = config;
            }
            Initialization.prototype.loadAppInsights = function () {
                var appInsights = new Microsoft.ApplicationInsights.AppInsights(this.config);
                if (this.config["iKey"]) {
                    var originalTrackPageView = appInsights.trackPageView;
                    appInsights.trackPageView = function (pagePath, properties, measurements) {
                        originalTrackPageView.apply(appInsights, [null, pagePath, properties, measurements]);
                    };
                }
                var legacyPageView = "logPageView";
                if (typeof this.snippet[legacyPageView] === "function") {
                    appInsights[legacyPageView] = function (pagePath, properties, measurements) {
                        appInsights.trackPageView(null, pagePath, properties, measurements);
                    };
                }
                var legacyEvent = "logEvent";
                if (typeof this.snippet[legacyEvent] === "function") {
                    appInsights[legacyEvent] = function (name, properties, measurements) {
                        appInsights.trackEvent(name, properties, measurements);
                    };
                }
                return appInsights;
            };
            Initialization.prototype.emptyQueue = function () {
                try {
                    if (Microsoft.ApplicationInsights.Util.isArray(this.snippet.queue)) {
                        var length = this.snippet.queue.length;
                        for (var i = 0; i < length; i++) {
                            var call = this.snippet.queue[i];
                            call();
                        }
                        this.snippet.queue = undefined;
                        delete this.snippet.queue;
                    }
                }
                catch (exception) {
                    var message = "Failed to send queued telemetry";
                    if (exception && typeof exception.toString === "function") {
                        message += ": " + exception.toString();
                    }
                    Microsoft.ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, message);
                }
            };
            Initialization.prototype.pollInteralLogs = function (appInsightsInstance) {
                return setInterval(function () {
                    var queue = Microsoft.ApplicationInsights._InternalLogging.queue;
                    var length = queue.length;
                    for (var i = 0; i < length; i++) {
                        appInsightsInstance.trackTrace(queue[i]);
                    }
                    queue.length = 0;
                }, this.config.diagnosticLogInterval);
            };
            Initialization.prototype.addHousekeepingBeforeUnload = function (appInsightsInstance) {
                if ('onbeforeunload' in window) {
                    var performHousekeeping = function () {
                        appInsightsInstance.context._sender.triggerSend();
                        appInsightsInstance.context._sessionManager.backup();
                    };
                    if (!Microsoft.ApplicationInsights.Util.addEventHandler('beforeunload', performHousekeeping)) {
                        Microsoft.ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0 /* CRITICAL */, 'Could not add handler for beforeunload');
                    }
                }
            };
            Initialization.getDefaultConfig = function (config) {
                if (!config) {
                    config = {};
                }
                config.endpointUrl = config.endpointUrl || "//dc.services.visualstudio.com/v2/track";
                config.accountId = config.accountId;
                config.appUserId = config.appUserId;
                config.sessionRenewalMs = 30 * 60 * 1000;
                config.sessionExpirationMs = 24 * 60 * 60 * 1000;
                config.maxBatchSizeInBytes = config.maxBatchSizeInBytes > 0 ? config.maxBatchSizeInBytes : 1000000;
                config.maxBatchInterval = !isNaN(config.maxBatchInterval) ? config.maxBatchInterval : 15000;
                config.enableDebug = ApplicationInsights.Util.stringToBoolOrDefault(config.enableDebug);
                config.autoCollectErrors = (config.autoCollectErrors !== undefined && config.autoCollectErrors !== null) ? ApplicationInsights.Util.stringToBoolOrDefault(config.autoCollectErrors) : true;
                config.disableTelemetry = ApplicationInsights.Util.stringToBoolOrDefault(config.disableTelemetry);
                config.verboseLogging = ApplicationInsights.Util.stringToBoolOrDefault(config.verboseLogging);
                config.emitLineDelimitedJson = ApplicationInsights.Util.stringToBoolOrDefault(config.emitLineDelimitedJson);
                config.diagnosticLogInterval = config.diagnosticLogInterval || 10000;
                config.autoTrackPageVisitTime = ApplicationInsights.Util.stringToBoolOrDefault(config.autoTrackPageVisitTime);
                if (isNaN(config.samplingPercentage) || config.samplingPercentage <= 0 || config.samplingPercentage >= 100) {
                    config.samplingPercentage = 100;
                }
                return config;
            };
            return Initialization;
        })();
        ApplicationInsights.Initialization = Initialization;
    })(ApplicationInsights = Microsoft.ApplicationInsights || (Microsoft.ApplicationInsights = {}));
})(Microsoft || (Microsoft = {}));
function initializeAppInsights() {
    try {
        if (typeof window !== "undefined" && typeof JSON !== "undefined") {
            var aiName = "appInsights";
            if (window[aiName] === undefined) {
                Microsoft.ApplicationInsights.AppInsights.defaultConfig = Microsoft.ApplicationInsights.Initialization.getDefaultConfig();
            }
            else {
                var snippet = window[aiName] || {};
                var init = new Microsoft.ApplicationInsights.Initialization(snippet);
                var appInsightsLocal = init.loadAppInsights();
                for (var field in appInsightsLocal) {
                    snippet[field] = appInsightsLocal[field];
                }
                init.emptyQueue();
                init.pollInteralLogs(appInsightsLocal);
                init.addHousekeepingBeforeUnload(appInsightsLocal);
            }
        }
    }
    catch (e) {
        Microsoft.ApplicationInsights._InternalLogging.warnToConsole('Failed to initialize AppInsights JS SDK: ' + e.message);
    }
}
initializeAppInsights();

function initializeAppInsights(){var i,r;try{if(typeof window!="undefined"&&typeof JSON!="undefined")if(i="appInsights",window[i]===undefined)Microsoft.ApplicationInsights.AppInsights.defaultConfig=Microsoft.ApplicationInsights.Initialization.getDefaultConfig();else{var u=window[i]||{},n=new Microsoft.ApplicationInsights.Initialization(u),t=n.loadAppInsights();for(r in t)u[r]=t[r];n.emptyQueue();n.pollInteralLogs(t);n.addHousekeepingBeforeUnload(t)}}catch(f){Microsoft.ApplicationInsights._InternalLogging.warnToConsole("Failed to initialize AppInsights JS SDK: "+f.message)}}var __extends,AI,Microsoft;(function(n){var t;(function(n){(function(n){n[n.CRITICAL=0]="CRITICAL";n[n.WARNING=1]="WARNING"})(n.LoggingSeverity||(n.LoggingSeverity={}));var i=n.LoggingSeverity,t=function(){function n(){}return n.throwInternalNonUserActionable=function(n,t){if(this.enableDebugExceptions())throw t;else this.warnToConsole(t),this.logInternalMessage(n,this.AiNonUserActionablePrefix+t)},n.throwInternalUserActionable=function(n,t){if(this.enableDebugExceptions())throw t;else this.warnToConsole(t),this.logInternalMessage(n,this.AiUserActionablePrefix+t)},n.warnToConsole=function(n){typeof console=="undefined"||!console||(typeof console.warn=="function"?console.warn(n):typeof console.log=="function"&&console.log(n))},n.resetInternalMessageCount=function(){this._messageCount=0},n.setMaxInternalMessageLimit=function(n){if(!n)throw new Error("limit cannot be undefined.");this.MAX_INTERNAL_MESSAGE_LIMIT=n},n.logInternalMessage=function(n,t){if(!this._areInternalMessagesThrottled()&&((this.verboseLogging()||n===0)&&(this.queue.push(t),this._messageCount++),this._messageCount==this.MAX_INTERNAL_MESSAGE_LIMIT)){var i=this.AiNonUserActionablePrefix+"Internal events throttle limit per PageView reached for this app.";this.queue.push(i);this.warnToConsole(i)}},n._areInternalMessagesThrottled=function(){return this._messageCount>=this.MAX_INTERNAL_MESSAGE_LIMIT},n.AiUserActionablePrefix="AI: ",n.AiNonUserActionablePrefix="AI (Internal): ",n.enableDebugExceptions=function(){return!1},n.verboseLogging=function(){return!1},n.queue=[],n.MAX_INTERNAL_MESSAGE_LIMIT=25,n._messageCount=0,n}();n._InternalLogging=t})(t=n.ApplicationInsights||(n.ApplicationInsights={}))})(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t=function(){function t(){}return t._getStorageObject=function(){try{return window.localStorage?window.localStorage:null}catch(t){return n._InternalLogging.warnToConsole("Failed to get client localStorage: "+t.message),null}},t.canUseLocalStorage=function(){return!!t._getStorageObject()},t.getStorage=function(i){var r=t._getStorageObject();if(r!==null)try{return r.getItem(i)}catch(u){n._InternalLogging.throwInternalNonUserActionable(1,"Browser failed read of local storage."+t.dump(u))}return null},t.setStorage=function(i,r){var u=t._getStorageObject();if(u!==null)try{return u.setItem(i,r),!0}catch(f){n._InternalLogging.throwInternalNonUserActionable(1,"Browser failed write to local storage."+t.dump(f))}return!1},t.removeStorage=function(i){var r=t._getStorageObject();if(r!==null)try{return r.removeItem(i),!0}catch(u){n._InternalLogging.throwInternalNonUserActionable(1,"Browser failed removal of local storage item."+t.dump(u))}return!1},t._getSessionStorageObject=function(){try{return window.sessionStorage?window.sessionStorage:null}catch(t){return n._InternalLogging.warnToConsole("Failed to get client session storage: "+t.message),null}},t.canUseSessionStorage=function(){return!!t._getSessionStorageObject()},t.getSessionStorage=function(i){var r=t._getSessionStorageObject();if(r!==null)try{return r.getItem(i)}catch(u){n._InternalLogging.throwInternalNonUserActionable(0,"Browser failed read of session storage."+t.dump(u))}return null},t.setSessionStorage=function(i,r){var u=t._getSessionStorageObject();if(u!==null)try{return u.setItem(i,r),!0}catch(f){n._InternalLogging.throwInternalNonUserActionable(0,"Browser failed write to session storage."+t.dump(f))}return!1},t.removeSessionStorage=function(i){var r=t._getSessionStorageObject();if(r!==null)try{return r.removeItem(i),!0}catch(u){n._InternalLogging.throwInternalNonUserActionable(0,"Browser failed removal of session storage item."+t.dump(u))}return!1},t.setCookie=function(n,i){t.document.cookie=n+"="+i+";path=/"},t.stringToBoolOrDefault=function(n){return n?n.toString().toLowerCase()==="true":!1},t.getCookie=function(n){var e="",f,u,r,i;if(n&&n.length)for(f=n+"=",u=t.document.cookie.split(";"),r=0;r<u.length;r++)if(i=u[r],i=t.trim(i),i&&i.indexOf(f)===0){e=i.substring(f.length,u[r].length);break}return e},t.deleteCookie=function(n){t.document.cookie=n+"=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;"},t.trim=function(n){return typeof n!="string"?n:n.replace(/^\s+|\s+$/g,"")},t.newGuid=function(){for(var u,n=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"],i="",t,r=0;r<4;r++)t=4294967296*Math.random()|0,i+=n[t&15]+n[t>>4&15]+n[t>>8&15]+n[t>>12&15]+n[t>>16&15]+n[t>>20&15]+n[t>>24&15]+n[t>>28&15];return u=n[8+Math.random()*4|0],i.substr(0,8)+"-"+i.substr(9,4)+"-4"+i.substr(13,3)+"-"+u+i.substr(16,3)+"-"+i.substr(19,12)},t.isArray=function(n){return Object.prototype.toString.call(n)==="[object Array]"},t.isError=function(n){return Object.prototype.toString.call(n)==="[object Error]"},t.isDate=function(n){return Object.prototype.toString.call(n)==="[object Date]"},t.toISOStringForIE8=function(n){if(t.isDate(n)){function i(n){var t=String(n);return t.length===1&&(t="0"+t),t}return Date.prototype.toISOString?n.toISOString():n.getUTCFullYear()+"-"+i(n.getUTCMonth()+1)+"-"+i(n.getUTCDate())+"T"+i(n.getUTCHours())+":"+i(n.getUTCMinutes())+":"+i(n.getUTCSeconds())+"."+String((n.getUTCMilliseconds()/1e3).toFixed(3)).slice(2,5)+"Z"}},t.msToTimeSpan=function(n){(isNaN(n)||n<0)&&(n=0);var t=""+n%1e3,i=""+Math.floor(n/1e3)%60,r=""+Math.floor(n/6e4)%60,u=""+Math.floor(n/36e5)%24;return t=t.length===1?"00"+t:t.length===2?"0"+t:t,i=i.length<2?"0"+i:i,r=r.length<2?"0"+r:r,u=u.length<2?"0"+u:u,u+":"+r+":"+i+"."+t},t.isCrossOriginError=function(n,t,i,r,u){return(n=="Script error."||n=="Script error")&&t==""&&i==0&&r==0&&u==null},t.dump=function(n){var t=Object.prototype.toString.call(n),i=JSON.stringify(n);return t==="[object Error]"&&(i="{ stack: '"+n.stack+"', message: '"+n.message+"', name: '"+n.name+"'"),t+i},t.addEventHandler=function(n,t){if(!window||typeof n!="string"||typeof t!="function")return!1;var i="on"+n;if(window.addEventListener)window.addEventListener(n,t,!1);else if(window.attachEvent)window.attachEvent(i,t);else return!1;return!0},t.document=typeof document!="undefined"?document:{},t.NotSpecified="not_specified",t}();n.Util=t})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){"use strict";var t=function(){function t(){}return t.serialize=function(n){var i=t._serializeObject(n,"root");return JSON.stringify(i)},t._serializeObject=function(i,r){var e="__aiCircularRefCheck",f={},u,s;if(!i)return n._InternalLogging.throwInternalUserActionable(0,"cannot serialize "+r+" because it is null or undefined"),f;if(i[e])return n._InternalLogging.throwInternalUserActionable(1,"Circular reference detected while serializing: '"+r),f;if(!i.aiDataContract){if(r==="measurements")f=t._serializeStringMap(i,"number",r);else if(r==="properties")f=t._serializeStringMap(i,"string",r);else if(r==="tags")f=t._serializeStringMap(i,"string",r);else if(n.Util.isArray(i))f=t._serializeArray(i,r);else{n._InternalLogging.throwInternalUserActionable(1,"Attempting to serialize an object which does not implement ISerializable: "+r);try{JSON.stringify(i);f=i}catch(o){n._InternalLogging.throwInternalUserActionable(0,o&&typeof o.toString=="function"?o.toString():"Error serializing object")}}return f}i[e]=!0;for(u in i.aiDataContract){var h=i.aiDataContract[u],c=typeof h!="boolean",l=i[u]!==undefined,a=typeof i[u]=="object"&&i[u]!==null;if(h&&!l&&!c){n._InternalLogging.throwInternalNonUserActionable(0,"Missing required field specification: The field '"+u+"' on '"+r+"' is required but not present on source");continue}s=a?c?t._serializeArray(i[u],u):t._serializeObject(i[u],u):i[u];s!==undefined&&(f[u]=s)}return delete i[e],f},t._serializeArray=function(i,r){var f=undefined,u,e,o;if(!!i)if(n.Util.isArray(i))for(f=[],u=0;u<i.length;u++)e=i[u],o=t._serializeObject(e,r+"["+u+"]"),f.push(o);else n._InternalLogging.throwInternalUserActionable(0,"This field was specified as an array in the contract but the item is not an array.\r\n"+r);return f},t._serializeStringMap=function(t,i,r){var u=undefined,f,e,o;if(t){u={};for(f in t)e=t[f],i==="string"?u[f]=e===undefined?"undefined":e===null?"null":e.toString?e.toString():"invalid field: toString() is not defined.":i==="number"?e===undefined?u[f]="undefined":e===null?u[f]="null":(o=parseFloat(e),u[f]=isNaN(o)?"NaN":o):(u[f]="invalid field: "+r+" is of unknown type.",n._InternalLogging.throwInternalUserActionable(0,u[f]))}return u},t}();n.Serializer=t})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){"use strict";var t=function(){function n(){}return n}();n.Base=t})(t=n.Telemetry||(n.Telemetry={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){"use strict";var t=function(){function n(){this.ver=1;this.sampleRate=100;this.tags={}}return n}();n.Envelope=t})(t=n.Telemetry||(n.Telemetry={}))}(Microsoft||(Microsoft={}));__extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},function(n){var t;(function(t){var i;(function(i){var r;(function(i){"use strict";var r=function(n){function i(i,r){n.call(this);this.name=r;this.data=i;this.time=t.Util.toISOStringForIE8(new Date);this.aiDataContract={time:!0,iKey:!0,name:!0,tags:!0,data:!0}}return __extends(i,n),i}(n.Telemetry.Envelope);i.Envelope=r})(r=i.Common||(i.Common={}))})(i=t.Telemetry||(t.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(t){var i;(function(t){var i;(function(t){"use strict";var i=function(n){function t(){n.apply(this,arguments);this.aiDataContract={}}return __extends(t,n),t}(n.Telemetry.Base);t.Base=i})(i=t.Common||(t.Common={}))})(i=t.Telemetry||(t.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";var t=function(){function n(){this.applicationVersion="ai.application.ver";this.applicationBuild="ai.application.build";this.applicationTypeId="ai.application.typeId";this.deviceId="ai.device.id";this.deviceIp="ai.device.ip";this.deviceLanguage="ai.device.language";this.deviceLocale="ai.device.locale";this.deviceModel="ai.device.model";this.deviceNetwork="ai.device.network";this.deviceNetworkName="ai.device.networkName";this.deviceOEMName="ai.device.oemName";this.deviceOS="ai.device.os";this.deviceOSVersion="ai.device.osVersion";this.deviceRoleInstance="ai.device.roleInstance";this.deviceRoleName="ai.device.roleName";this.deviceScreenResolution="ai.device.screenResolution";this.deviceType="ai.device.type";this.deviceMachineName="ai.device.machineName";this.deviceVMName="ai.device.vmName";this.locationIp="ai.location.ip";this.operationId="ai.operation.id";this.operationName="ai.operation.name";this.operationParentId="ai.operation.parentId";this.operationRootId="ai.operation.rootId";this.operationSyntheticSource="ai.operation.syntheticSource";this.operationIsSynthetic="ai.operation.isSynthetic";this.sessionId="ai.session.id";this.sessionIsFirst="ai.session.isFirst";this.sessionIsNew="ai.session.isNew";this.userAccountAcquisitionDate="ai.user.accountAcquisitionDate";this.userAccountId="ai.user.accountId";this.userAgent="ai.user.userAgent";this.userId="ai.user.id";this.userStoreRegion="ai.user.storeRegion";this.userAuthUserId="ai.user.authUserId";this.userAnonymousUserAcquisitionDate="ai.user.anonUserAcquisitionDate";this.userAuthenticatedUserAcquisitionDate="ai.user.authUserAcquisitionDate";this.sampleRate="ai.sample.sampleRate";this.internalSdkVersion="ai.internal.sdkVersion";this.internalAgentVersion="ai.internal.agentVersion";this.internalDataCollectorReceivedTime="ai.internal.dataCollectorReceivedTime";this.internalProfileId="ai.internal.profileId";this.internalProfileClassId="ai.internal.profileClassId";this.internalAccountId="ai.internal.accountId";this.internalApplicationName="ai.internal.applicationName";this.internalInstrumentationKey="ai.internal.instrumentationKey";this.internalTelemetryItemId="ai.internal.telemetryItemId";this.internalApplicationType="ai.internal.applicationType";this.internalRequestSource="ai.internal.requestSource";this.internalFlowType="ai.internal.flowType";this.internalIsAudit="ai.internal.isAudit";this.internalTrackingSourceId="ai.internal.trackingSourceId";this.internalTrackingType="ai.internal.trackingType"}return n}();n.ContextTagKeys=t}(AI||(AI={})),function(n){var t;(function(n){var t;(function(n){"use strict";var t=function(){function n(){}return n}();n.Application=t})(t=n.Context||(n.Context={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t;(function(n){"use strict";var t=function(){function n(){this.id="browser";typeof screen!="undefined"&&screen.width&&screen.height&&(this.resolution=screen.width+"X"+screen.height);this.locale=typeof screen!="undefined"&&navigator.browserLanguage?navigator.browserLanguage:"unknown"}return n}();n.Device=t})(t=n.Context||(n.Context={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(){function t(){this.sdkVersion="JavaScript:"+n.Version}return t}();t.Internal=i})(t=n.Context||(n.Context={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t;(function(n){"use strict";var t=function(){function n(){}return n}();n.Location=t})(t=n.Context||(n.Context={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(){function t(){this.id=n.Util.newGuid()}return t}();t.Operation=i})(t=n.Context||(n.Context={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t=function(){function n(){}return n.getScore=function(t){var i=new AI.ContextTagKeys,r=0;return r=t.tags[i.userId]?n.getSamplingHashCode(t.tags[i.userId])/n.INT_MAX_VALUE:t.tags[i.operationId]?n.getSamplingHashCode(t.tags[i.operationId])/n.INT_MAX_VALUE:Math.random(),r*100},n.getSamplingHashCode=function(n){var t,i;if(n=="")return 0;for(t=5381,i=0;i<n.length;++i)t=(t<<5)+t+n.charCodeAt(i),t=t&t;return Math.abs(t)},n.INT_MAX_VALUE=2147483647,n}();n.SamplingScoreGenerator=t})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(){function t(t){this.INT_MAX_VALUE=2147483647;(t>100||t<0)&&(n._InternalLogging.throwInternalUserActionable(1,"Sampling rate is out of range (0..100): '"+t+"'. Sampling will be disabled, you may be sending too much data which may affect your AI service level."),this.sampleRate=100);this.sampleRate=t}return t.prototype.isSampledIn=function(t){if(this.sampleRate==100)return!0;var i=n.SamplingScoreGenerator.getScore(t);return i<this.sampleRate},t}();t.Sample=i})(t=n.Context||(n.Context={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";(function(n){n[n.Start=0]="Start";n[n.End=1]="End"})(n.SessionState||(n.SessionState={}));var t=n.SessionState}(AI||(AI={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(){function n(){}return n}(),r;t.Session=i;r=function(){function t(n,r){n||(n={});typeof n.sessionExpirationMs=="function"||(n.sessionExpirationMs=function(){return t.acquisitionSpan});typeof n.sessionRenewalMs=="function"||(n.sessionRenewalMs=function(){return t.renewalSpan});this.config=n;this._sessionHandler=r;this.automaticSession=new i}return t.prototype.update=function(){this.automaticSession.id||this.initializeAutomaticSession();var n=+new Date,t=n-this.automaticSession.acquisitionDate>this.config.sessionExpirationMs(),i=n-this.automaticSession.renewalDate>this.config.sessionRenewalMs();t||i?(typeof this._sessionHandler=="function"&&this._sessionHandler(1,this.automaticSession.renewalDate),this.automaticSession.isFirst=undefined,this.renew()):(this.automaticSession.renewalDate=+new Date,this.setCookie(this.automaticSession.id,this.automaticSession.acquisitionDate,this.automaticSession.renewalDate))},t.prototype.backup=function(){this.setStorage(this.automaticSession.id,this.automaticSession.acquisitionDate,this.automaticSession.renewalDate)},t.prototype.initializeAutomaticSession=function(){var t=n.Util.getCookie("ai_session"),i;t&&typeof t.split=="function"?this.initializeAutomaticSessionWithData(t):(i=n.Util.getStorage("ai_session"),i&&this.initializeAutomaticSessionWithData(i));this.automaticSession.id||(this.automaticSession.isFirst=!0,this.renew())},t.prototype.initializeAutomaticSessionWithData=function(t){var i=t.split("|"),r,u;i.length>0&&(this.automaticSession.id=i[0]);try{i.length>1&&(r=+i[1],this.automaticSession.acquisitionDate=+new Date(r),this.automaticSession.acquisitionDate=this.automaticSession.acquisitionDate>0?this.automaticSession.acquisitionDate:0);i.length>2&&(u=+i[2],this.automaticSession.renewalDate=+new Date(u),this.automaticSession.renewalDate=this.automaticSession.renewalDate>0?this.automaticSession.renewalDate:0)}catch(f){n._InternalLogging.throwInternalNonUserActionable(0,"Error parsing ai_session cookie, session will be reset: "+n.Util.dump(f))}this.automaticSession.renewalDate==0&&n._InternalLogging.throwInternalNonUserActionable(1,"AI session renewal date is 0, session will be reset.")},t.prototype.renew=function(){var t=+new Date;this.automaticSession.id=n.Util.newGuid();this.automaticSession.acquisitionDate=t;this.automaticSession.renewalDate=t;this.setCookie(this.automaticSession.id,this.automaticSession.acquisitionDate,this.automaticSession.renewalDate);typeof this._sessionHandler=="function"&&this._sessionHandler(0,t);n.Util.canUseLocalStorage()||n._InternalLogging.throwInternalNonUserActionable(1,"Browser does not support local storage. Session durations will be inaccurate.")},t.prototype.setCookie=function(t,i,r){var f=i+this.config.sessionExpirationMs(),e=r+this.config.sessionRenewalMs(),u=new Date,o=[t,i,r];f<e?u.setTime(f):u.setTime(e);n.Util.setCookie("ai_session",o.join("|")+";expires="+u.toUTCString())},t.prototype.setStorage=function(t,i,r){n.Util.setStorage("ai_session",[t,i,r].join("|"))},t.acquisitionSpan=864e5,t.renewalSpan=18e5,t}();t._SessionManager=r})(t=n.Context||(n.Context={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(){function t(i){var s=n.Util.getCookie(t.userCookieName),e,u,o,h,f,r;s&&(e=s.split(t.cookieSeparator),e.length>0&&(this.id=e[0]));this.id||(this.id=n.Util.newGuid(),u=new Date,o=n.Util.toISOStringForIE8(u),this.accountAcquisitionDate=o,u.setTime(u.getTime()+31536e6),h=[this.id,o],n.Util.setCookie(t.userCookieName,h.join(t.cookieSeparator)+";expires="+u.toUTCString()),n.Util.removeStorage("ai_session"));this.accountId=i;f=n.Util.getCookie(t.authUserCookieName);f&&(f=decodeURI(f),r=f.split(t.cookieSeparator),r[0]&&(this.authenticatedId=r[0]),r.length>1&&r[1]&&(this.accountId=r[1]))}return t.prototype.setAuthenticatedUserContext=function(i,r){var f=!this.validateUserInput(i)||r&&!this.validateUserInput(r),u;if(f){n._InternalLogging.throwInternalUserActionable(1,"Setting auth user context failed. User auth/account id should be of type string, and not contain commas, semi-colons, equal signs, spaces, or vertical-bars.");return}this.authenticatedId=i;u=this.authenticatedId;r&&(this.accountId=r,u=[this.authenticatedId,this.accountId].join(t.cookieSeparator));n.Util.setCookie(t.authUserCookieName,encodeURI(u))},t.prototype.clearAuthenticatedUserContext=function(){this.authenticatedId=null;this.accountId=null;n.Util.deleteCookie(t.authUserCookieName)},t.prototype.validateUserInput=function(n){return typeof n!="string"||!n||n.match(/,|;|=| |\|/)?!1:!0},t.cookieSeparator="|",t.userCookieName="ai_user",t.authUserCookieName="ai_authUser",t}();t.User=i})(t=n.Context||(n.Context={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){"use strict";var t=function(){function t(n){if(this._buffer=[],this._lastSend=0,this._config=n,this._sender=null,typeof XMLHttpRequest!="undefined"){var t=new XMLHttpRequest;"withCredentials"in t?this._sender=this._xhrSender:typeof XDomainRequest!="undefined"&&(this._sender=this._xdrSender)}}return t.prototype.send=function(t){var r=this,i;try{if(this._config.disableTelemetry())return;if(!t){n._InternalLogging.throwInternalNonUserActionable(0,"Cannot send empty telemetry");return}if(!this._sender){n._InternalLogging.throwInternalNonUserActionable(0,"Sender was not initialized");return}i=n.Serializer.serialize(t);this._getSizeInBytes(this._buffer)+i.length>this._config.maxBatchSizeInBytes()&&this.triggerSend();this._buffer.push(i);this._timeoutHandle||(this._timeoutHandle=setTimeout(function(){r._timeoutHandle=null;r.triggerSend()},this._config.maxBatchInterval()))}catch(u){n._InternalLogging.throwInternalNonUserActionable(0,"Failed adding telemetry to the sender's buffer, some telemetry will be lost: "+n.Util.dump(u))}},t.prototype._getSizeInBytes=function(n){var r=0,t,i;if(n&&n.length)for(t=0;t<n.length;t++)i=n[t],i&&i.length&&(r+=i.length);return r},t.prototype.triggerSend=function(t){var i=!0,r;typeof t=="boolean"&&(i=t);try{this._config.disableTelemetry()||(this._buffer.length&&(r=this._config.emitLineDelimitedJson()?this._buffer.join("\n"):"["+this._buffer.join(",")+"]",this._sender(r,i)),this._lastSend=+new Date);this._buffer.length=0;clearTimeout(this._timeoutHandle);this._timeoutHandle=null}catch(u){n._InternalLogging.throwInternalNonUserActionable(0,"Telemetry transmission failed, some telemetry will be lost: "+n.Util.dump(u))}},t.prototype._xhrSender=function(n,i){var r=new XMLHttpRequest;r.open("POST",this._config.endpointUrl(),i);r.setRequestHeader("Content-type","application/json");r.onreadystatechange=function(){return t._xhrReadyStateChange(r,n)};r.onerror=function(i){return t._onError(n,r.responseText||r.response||"",i)};r.send(n)},t.prototype._xdrSender=function(n){var i=new XDomainRequest;i.onload=function(){return t._xdrOnLoad(i,n)};i.onerror=function(r){return t._onError(n,i.responseText||"",r)};i.open("POST",this._config.endpointUrl());i.send(n)},t._xhrReadyStateChange=function(n,i){n.readyState===4&&((n.status<200||n.status>=300)&&n.status!==0?t._onError(i,n.responseText||n.response||""):t._onSuccess(i))},t._xdrOnLoad=function(n,i){n&&(n.responseText+""=="200"||n.responseText==="")?t._onSuccess(i):t._onError(i,n&&n.responseText||"")},t._onError=function(t,i){n._InternalLogging.throwInternalNonUserActionable(1,"Failed to send telemetry:\n"+i)},t._onSuccess=function(){},t}();n.Sender=t})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){"use strict";var t=function(){function n(){}return n}();n.Domain=t})(t=n.Telemetry||(n.Telemetry={}))}(Microsoft||(Microsoft={})),function(n){"use strict";(function(n){n[n.Verbose=0]="Verbose";n[n.Information=1]="Information";n[n.Warning=2]="Warning";n[n.Error=3]="Error";n[n.Critical=4]="Critical"})(n.SeverityLevel||(n.SeverityLevel={}));var t=n.SeverityLevel}(AI||(AI={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.properties={};n.call(this)}return __extends(t,n),t}(Microsoft.Telemetry.Domain);n.MessageData=t}(AI||(AI={})),function(n){var t;(function(n){var t;(function(t){var i;(function(t){"use strict";var i=function(){function t(){}return t.sanitizeKeyAndAddUniqueness=function(n,i){var e=n.length,r=t.sanitizeKey(n),f,u;if(r.length!==e){for(f=0,u=r;i[u]!==undefined;)f++,u=r.substring(0,t.MAX_NAME_LENGTH-3)+t.padNumber(f);r=u}return r},t.sanitizeKey=function(i){return i&&(i=n.Util.trim(i.toString()),i.search(/[^0-9a-zA-Z-._()\/ ]/g)>=0&&(i=i.replace(/[^0-9a-zA-Z-._()\/ ]/g,"_"),n._InternalLogging.throwInternalUserActionable(1,"name contains illegal characters. Illgeal character have been replaced with '_'. new name: "+i)),i.length>t.MAX_NAME_LENGTH&&(i=i.substring(0,t.MAX_NAME_LENGTH),n._InternalLogging.throwInternalUserActionable(1,"name is too long.  It has been truncated to "+t.MAX_NAME_LENGTH+" characters.  name: "+i))),i},t.sanitizeString=function(i){return i&&(i=n.Util.trim(i),i.toString().length>t.MAX_STRING_LENGTH&&(i=i.substring(0,t.MAX_STRING_LENGTH),n._InternalLogging.throwInternalUserActionable(1,"string value is too long. It has been truncated to "+t.MAX_STRING_LENGTH+" characters. value: "+i))),i},t.sanitizeUrl=function(i){return i&&i.length>t.MAX_URL_LENGTH&&(i=i.substring(0,t.MAX_URL_LENGTH),n._InternalLogging.throwInternalUserActionable(1,"url is too long, it has been trucated to "+t.MAX_URL_LENGTH+" characters. url: "+i)),i},t.sanitizeMessage=function(i){return i&&i.length>t.MAX_MESSAGE_LENGTH&&(i=i.substring(0,t.MAX_MESSAGE_LENGTH),n._InternalLogging.throwInternalUserActionable(1,"message is too long, it has been trucated to "+t.MAX_MESSAGE_LENGTH+" characters.  message: "+i)),i},t.sanitizeException=function(i){return i&&i.length>t.MAX_EXCEPTION_LENGTH&&(i=i.substring(0,t.MAX_EXCEPTION_LENGTH),n._InternalLogging.throwInternalUserActionable(1,"exception is too long, iit has been trucated to "+t.MAX_EXCEPTION_LENGTH+" characters.  exception: "+i)),i},t.sanitizeProperties=function(n){var r,i,u;if(n){r={};for(i in n)u=t.sanitizeString(n[i]),i=t.sanitizeKeyAndAddUniqueness(i,r),r[i]=u;n=r}return n},t.sanitizeMeasurements=function(n){var r,i,u;if(n){r={};for(i in n)u=n[i],i=t.sanitizeKeyAndAddUniqueness(i,r),r[i]=u;n=r}return n},t.padNumber=function(n){var t="00"+n;return t.substr(t.length-3)},t.MAX_NAME_LENGTH=150,t.MAX_STRING_LENGTH=1024,t.MAX_URL_LENGTH=2048,t.MAX_MESSAGE_LENGTH=32768,t.MAX_EXCEPTION_LENGTH=32768,t}();t.DataSanitizer=i})(i=t.Common||(t.Common={}))})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(i){function r(r,u){i.call(this);this.aiDataContract={ver:!0,message:!0,severityLevel:!1,measurements:!1,properties:!1};r=r||n.Util.NotSpecified;this.message=t.Common.DataSanitizer.sanitizeMessage(r);this.properties=t.Common.DataSanitizer.sanitizeProperties(u)}return __extends(r,i),r.envelopeType="Microsoft.ApplicationInsights.Message",r.dataType="MessageData",r}(AI.MessageData);t.Trace=i})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.properties={};this.measurements={};n.call(this)}return __extends(t,n),t}(Microsoft.Telemetry.Domain);n.EventData=t}(AI||(AI={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(t){function i(i,r,u){t.call(this);this.aiDataContract={ver:!0,name:!0,properties:!1,measurements:!1};this.name=n.Telemetry.Common.DataSanitizer.sanitizeString(i);this.properties=n.Telemetry.Common.DataSanitizer.sanitizeProperties(r);this.measurements=n.Telemetry.Common.DataSanitizer.sanitizeMeasurements(u)}return __extends(i,t),i.envelopeType="Microsoft.ApplicationInsights.Event",i.dataType="EventData",i}(AI.EventData);t.Event=i})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";var t=function(){function n(){this.hasFullStack=!0;this.parsedStack=[]}return n}();n.ExceptionDetails=t}(AI||(AI={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.exceptions=[];this.properties={};this.measurements={};n.call(this)}return __extends(t,n),t}(Microsoft.Telemetry.Domain);n.ExceptionData=t}(AI||(AI={})),function(n){"use strict";var t=function(){function n(){}return n}();n.StackFrame=t}(AI||(AI={})),function(n){var t;(function(n){var t;(function(t){"use strict";var u=function(i){function u(t,u,f,e){i.call(this);this.aiDataContract={ver:!0,handledAt:!0,exceptions:!0,severityLevel:!1,properties:!1,measurements:!1};this.properties=n.Telemetry.Common.DataSanitizer.sanitizeProperties(f);this.measurements=n.Telemetry.Common.DataSanitizer.sanitizeMeasurements(e);this.handledAt=u||"unhandled";this.exceptions=[new r(t)]}return __extends(u,i),u.CreateSimpleException=function(n,i,r,u,f,e,o){var c,s,h;try{throw new Error;}catch(l){c=new t.Exception(l)}return s=c.exceptions[0].parsedStack[0],s.assembly=r,s.fileName=u,s.level=0,s.line=e,s.method="unknown",h=c.exceptions[0],h.hasFullStack=!0,h.message=n,h.parsedStack=null,h.stack=f,h.typeName=i,c.handledAt=o||"unhandled",c},u.envelopeType="Microsoft.ApplicationInsights.Exception",u.dataType="ExceptionData",u}(AI.ExceptionData),r,i;t.Exception=u;r=function(r){function u(i){r.call(this);this.aiDataContract={id:!1,outerId:!1,typeName:!0,message:!0,hasFullStack:!1,stack:!1,parsedStack:[]};this.typeName=t.Common.DataSanitizer.sanitizeString(i.name||n.Util.NotSpecified);this.message=t.Common.DataSanitizer.sanitizeMessage(i.message||n.Util.NotSpecified);var u=i.stack;this.parsedStack=this.parseStack(u);this.stack=t.Common.DataSanitizer.sanitizeException(u);this.hasFullStack=n.Util.isArray(this.parsedStack)&&this.parsedStack.length>0}return __extends(u,r),u.prototype.parseStack=function(n){var t=undefined,e,l,o,r,a,s,h,p,w,b;if(typeof n=="string"){for(e=n.split("\n"),t=[],l=0,o=0,r=0;r<=e.length;r++)a=e[r],i.regex.test(a)&&(s=new i(e[r],l++),o+=s.sizeInBytes,t.push(s));if(h=32768,o>h)for(var u=0,f=t.length-1,v=0,c=u,y=f;u<f;){if(p=t[u].sizeInBytes,w=t[f].sizeInBytes,v+=p+w,v>h){b=y-c+1;t.splice(c,b);break}c=u;y=f;u++;f--}}return t},u}(AI.ExceptionDetails);i=function(t){function i(r,u){t.call(this);this.sizeInBytes=0;this.aiDataContract={level:!0,method:!0,assembly:!1,fileName:!1,line:!1};this.level=u;this.method="unavailable";this.assembly=n.Util.trim(r);var f=r.match(i.regex);f&&f.length>=5&&(this.method=n.Util.trim(f[2]),this.fileName=n.Util.trim(f[4]),this.line=parseInt(f[5])||0);this.sizeInBytes+=this.method.length;this.sizeInBytes+=this.fileName.length;this.sizeInBytes+=this.assembly.length;this.sizeInBytes+=i.baseSize;this.sizeInBytes+=this.level.toString().length;this.sizeInBytes+=this.line.toString().length}return __extends(i,t),i.regex=/^([\s]+at)?(.*?)(\@|\s\(|\s)([^\(\@\n]+):([0-9]+):([0-9]+)(\)?)$/,i.baseSize=58,i}(AI.StackFrame)})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.metrics=[];this.properties={};n.call(this)}return __extends(t,n),t}(Microsoft.Telemetry.Domain);n.MetricData=t}(AI||(AI={})),function(n){"use strict";(function(n){n[n.Measurement=0]="Measurement";n[n.Aggregation=1]="Aggregation"})(n.DataPointType||(n.DataPointType={}));var t=n.DataPointType}(AI||(AI={})),function(n){"use strict";var t=function(){function n(){this.kind=0}return n}();n.DataPoint=t}(AI||(AI={})),function(n){var t;(function(n){var t;(function(n){var t;(function(n){"use strict";var t=function(n){function t(){n.apply(this,arguments);this.aiDataContract={name:!0,kind:!1,value:!0,count:!1,min:!1,max:!1,stdDev:!1}}return __extends(t,n),t}(AI.DataPoint);n.DataPoint=t})(t=n.Common||(n.Common={}))})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(t){var i;(function(i){"use strict";var r=function(r){function u(u,f,e,o,s,h){r.call(this);this.aiDataContract={ver:!0,metrics:!0,properties:!1};var c=new n.ApplicationInsights.Telemetry.Common.DataPoint;c.count=e>0?e:undefined;c.max=isNaN(s)||s===null?undefined:s;c.min=isNaN(o)||o===null?undefined:o;c.name=i.Common.DataSanitizer.sanitizeString(u);c.value=f;this.metrics=[c];this.properties=t.Telemetry.Common.DataSanitizer.sanitizeProperties(h)}return __extends(u,r),u.envelopeType="Microsoft.ApplicationInsights.Metric",u.dataType="MetricData",u}(AI.MetricData);i.Metric=r})(i=t.Telemetry||(t.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.properties={};this.measurements={};n.call(this)}return __extends(t,n),t}(n.EventData);n.PageViewData=t}(AI||(AI={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(i){function r(r,u,f,e,o){i.call(this);this.aiDataContract={ver:!0,name:!1,url:!1,duration:!1,properties:!1,measurements:!1};this.url=t.Common.DataSanitizer.sanitizeUrl(u);this.name=t.Common.DataSanitizer.sanitizeString(r||n.Util.NotSpecified);isNaN(f)||(this.duration=n.Util.msToTimeSpan(f));this.properties=n.Telemetry.Common.DataSanitizer.sanitizeProperties(e);this.measurements=n.Telemetry.Common.DataSanitizer.sanitizeMeasurements(o)}return __extends(r,i),r.envelopeType="Microsoft.ApplicationInsights.Pageview",r.dataType="PageviewData",r}(AI.PageViewData);t.PageView=i})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.properties={};this.measurements={};n.call(this)}return __extends(t,n),t}(n.PageViewData);n.PageViewPerfData=t}(AI||(AI={})),function(n){var t;(function(n){var t;(function(t){"use strict";var i=function(i){function r(u,f,e,o,s){var h;if(i.call(this),this.aiDataContract={ver:!0,name:!1,url:!1,duration:!1,perfTotal:!1,networkConnect:!1,sentRequest:!1,receivedResponse:!1,domProcessing:!1,properties:!1,measurements:!1},this.isValid=!1,h=r.getPerformanceTiming(),h){var c=r.getDuration(h.navigationStart,h.loadEventEnd),l=r.getDuration(h.navigationStart,h.connectEnd),a=r.getDuration(h.requestStart,h.responseStart),v=r.getDuration(h.responseStart,h.responseEnd),y=r.getDuration(h.responseEnd,h.loadEventEnd);c==0?n._InternalLogging.throwInternalNonUserActionable(1,"error calculating page view performance: total='"+c+"', network='"+l+"', request='"+a+"', response='"+v+"', dom='"+y+"'"):c<Math.floor(l)+Math.floor(a)+Math.floor(v)+Math.floor(y)?n._InternalLogging.throwInternalNonUserActionable(1,"client performance math error:"+c+" < "+l+" + "+a+" + "+v+" + "+y):(e=c,this.perfTotal=n.Util.msToTimeSpan(c),this.networkConnect=n.Util.msToTimeSpan(l),this.sentRequest=n.Util.msToTimeSpan(a),this.receivedResponse=n.Util.msToTimeSpan(v),this.domProcessing=n.Util.msToTimeSpan(y),this.isValid=!0)}this.url=t.Common.DataSanitizer.sanitizeUrl(f);this.name=t.Common.DataSanitizer.sanitizeString(u||n.Util.NotSpecified);isNaN(e)||(this.duration=n.Util.msToTimeSpan(e));this.properties=n.Telemetry.Common.DataSanitizer.sanitizeProperties(o);this.measurements=n.Telemetry.Common.DataSanitizer.sanitizeMeasurements(s)}return __extends(r,i),r.getPerformanceTiming=function(){return typeof window!="undefined"&&window.performance&&window.performance.timing?window.performance.timing:null},r.isPerformanceTimingSupported=function(){return typeof window!="undefined"&&window.performance&&window.performance.timing},r.isPerformanceTimingDataReady=function(){var n=window.performance.timing;return n.domainLookupStart>0&&n.navigationStart>0&&n.responseStart>0&&n.requestStart>0&&n.loadEventEnd>0&&n.responseEnd>0&&n.connectEnd>0&&n.domLoading>0},r.getDuration=function(n,t){var i=0;return isNaN(n)||isNaN(t)||(i=Math.max(t-n,0)),i},r.envelopeType="Microsoft.ApplicationInsights.PageviewPerformance",r.dataType="PageviewPerformanceData",r}(AI.PageViewPerfData);t.PageViewPerformance=i})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.state=0;n.call(this)}return __extends(t,n),t}(Microsoft.Telemetry.Domain);n.SessionStateData=t}(AI||(AI={})),function(n){var t;(function(n){var t;(function(n){"use strict";var t=function(n){function t(t){n.call(this);this.aiDataContract={ver:!0,state:!0};this.state=t}return __extends(t,n),t.envelopeType="Microsoft.ApplicationInsights.SessionState",t.dataType="SessionStateData",t}(AI.SessionStateData);n.SessionTelemetry=t})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){"use strict";var t=function(){function t(i){var r=this;this._config=i;this._sender=new n.Sender(i);typeof window!="undefined"&&(this._sessionManager=new n.Context._SessionManager(i,function(n,i){return t._sessionHandler(r,n,i)}),this.application=new n.Context.Application,this.device=new n.Context.Device,this.internal=new n.Context.Internal,this.location=new n.Context.Location,this.user=new n.Context.User(i.accountId()),this.operation=new n.Context.Operation,this.session=new n.Context.Session,this.sample=new n.Context.Sample(i.sampleRate()))}return t.prototype.addTelemetryInitializer=function(n){this.telemetryInitializers=this.telemetryInitializers||[];this.telemetryInitializers.push(n)},t.prototype.track=function(t){return t?(t.name===n.Telemetry.PageView.envelopeType&&n._InternalLogging.resetInternalMessageCount(),this.session&&typeof this.session.id!="string"&&this._sessionManager.update(),this._track(t)):n._InternalLogging.throwInternalUserActionable(0,"cannot call .track() with a null or undefined argument"),t},t.prototype._track=function(t){var r,f,i,u;this.session&&(typeof this.session.id=="string"?this._applySessionContext(t,this.session):this._applySessionContext(t,this._sessionManager.automaticSession));this._applyApplicationContext(t,this.application);this._applyDeviceContext(t,this.device);this._applyInternalContext(t,this.internal);this._applyLocationContext(t,this.location);this._applySampleContext(t,this.sample);this._applyUserContext(t,this.user);this._applyOperationContext(t,this.operation);t.iKey=this._config.instrumentationKey();r=!1;try{for(this.telemetryInitializers=this.telemetryInitializers||[],f=this.telemetryInitializers.length,i=0;i<f;++i)u=this.telemetryInitializers[i],u&&u.apply(null,[t])}catch(e){r=!0;n._InternalLogging.throwInternalUserActionable(0,"One of telemetry initializers failed, telemetry item will not be sent: "+n.Util.dump(e))}return r||(t.name===n.Telemetry.SessionTelemetry.envelopeType||t.name===n.Telemetry.Metric.envelopeType||this.sample.isSampledIn(t)?this._sender.send(t):n._InternalLogging.logInternalMessage(1,"Telemetry is sampled and not sent to the AI service. SampleRate is "+this.sample.sampleRate)),t},t._sessionHandler=function(t,i,r){var f=new n.Telemetry.SessionTelemetry(i),e=new n.Telemetry.Common.Data(n.Telemetry.SessionTelemetry.dataType,f),u=new n.Telemetry.Common.Envelope(e,n.Telemetry.SessionTelemetry.envelopeType);u.time=n.Util.toISOStringForIE8(new Date(r));t._track(u)},t.prototype._applyApplicationContext=function(n,t){if(t){var i=new AI.ContextTagKeys;typeof t.ver=="string"&&(n.tags[i.applicationVersion]=t.ver);typeof t.build=="string"&&(n.tags[i.applicationBuild]=t.build)}},t.prototype._applyDeviceContext=function(n,t){var i=new AI.ContextTagKeys;t&&(typeof t.id=="string"&&(n.tags[i.deviceId]=t.id),typeof t.ip=="string"&&(n.tags[i.deviceIp]=t.ip),typeof t.language=="string"&&(n.tags[i.deviceLanguage]=t.language),typeof t.locale=="string"&&(n.tags[i.deviceLocale]=t.locale),typeof t.model=="string"&&(n.tags[i.deviceModel]=t.model),typeof t.network!="undefined"&&(n.tags[i.deviceNetwork]=t.network),typeof t.oemName=="string"&&(n.tags[i.deviceOEMName]=t.oemName),typeof t.os=="string"&&(n.tags[i.deviceOS]=t.os),typeof t.osversion=="string"&&(n.tags[i.deviceOSVersion]=t.osversion),typeof t.resolution=="string"&&(n.tags[i.deviceScreenResolution]=t.resolution),typeof t.type=="string"&&(n.tags[i.deviceType]=t.type))},t.prototype._applyInternalContext=function(n,t){if(t){var i=new AI.ContextTagKeys;typeof t.agentVersion=="string"&&(n.tags[i.internalAgentVersion]=t.agentVersion);typeof t.sdkVersion=="string"&&(n.tags[i.internalSdkVersion]=t.sdkVersion)}},t.prototype._applyLocationContext=function(n,t){if(t){var i=new AI.ContextTagKeys;typeof t.ip=="string"&&(n.tags[i.locationIp]=t.ip)}},t.prototype._applyOperationContext=function(n,t){if(t){var i=new AI.ContextTagKeys;typeof t.id=="string"&&(n.tags[i.operationId]=t.id);typeof t.name=="string"&&(n.tags[i.operationName]=t.name);typeof t.parentId=="string"&&(n.tags[i.operationParentId]=t.parentId);typeof t.rootId=="string"&&(n.tags[i.operationRootId]=t.rootId);typeof t.syntheticSource=="string"&&(n.tags[i.operationSyntheticSource]=t.syntheticSource)}},t.prototype._applySampleContext=function(n,t){if(t){var i=new AI.ContextTagKeys;n.tags[i.sampleRate]=t.sampleRate}},t.prototype._applySessionContext=function(n,t){if(t){var i=new AI.ContextTagKeys;typeof t.id=="string"&&(n.tags[i.sessionId]=t.id);typeof t.isFirst!="undefined"&&(n.tags[i.sessionIsFirst]=t.isFirst)}},t.prototype._applyUserContext=function(n,t){if(t){var i=new AI.ContextTagKeys;typeof t.accountAcquisitionDate=="string"&&(n.tags[i.userAccountAcquisitionDate]=t.accountAcquisitionDate);typeof t.accountId=="string"&&(n.tags[i.userAccountId]=t.accountId);typeof t.agent=="string"&&(n.tags[i.userAgent]=t.agent);typeof t.id=="string"&&(n.tags[i.userId]=t.id);typeof t.authenticatedId=="string"&&(n.tags[i.userAuthUserId]=t.authenticatedId);typeof t.storeRegion=="string"&&(n.tags[i.userStoreRegion]=t.storeRegion)}},t}();n.TelemetryContext=t})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(t){"use strict";var i=function(n){function t(){n.call(this)}return __extends(t,n),t}(n.Telemetry.Base);t.Data=i})(t=n.Telemetry||(n.Telemetry={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(t){var i;(function(t){var i;(function(t){"use strict";var i=function(n){function t(t,i){n.call(this);this.aiDataContract={baseType:!0,baseData:!0};this.baseType=t;this.baseData=i}return __extends(t,n),t}(n.Telemetry.Data);t.Data=i})(i=t.Common||(t.Common={}))})(i=t.Telemetry||(t.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(n){var t;(function(t){"use strict";var r=function(){function t(n){this.prevPageVisitDataKeyName="prevPageVisitData";this.pageVisitTimeTrackingHandler=n}return t.prototype.trackPreviousPageVisit=function(t,i){try{var r=this.restartPageVisitTimer(t,i);r&&this.pageVisitTimeTrackingHandler(r.pageName,r.pageUrl,r.pageVisitTime)}catch(u){n._InternalLogging.warnToConsole("Auto track page visit time failed, metric will not be collected: "+n.Util.dump(u))}},t.prototype.restartPageVisitTimer=function(t,i){try{var r=this.stopPageVisitTimer();return this.startPageVisitTimer(t,i),r}catch(u){return n._InternalLogging.warnToConsole("Call to restart failed: "+n.Util.dump(u)),null}},t.prototype.startPageVisitTimer=function(t,r){try{if(n.Util.canUseSessionStorage()){if(n.Util.getSessionStorage(this.prevPageVisitDataKeyName)!=null)throw new Error("Cannot call startPageVisit consecutively without first calling stopPageVisit");var u=new i(t,r),f=JSON.stringify(u);n.Util.setSessionStorage(this.prevPageVisitDataKeyName,f)}}catch(e){n._InternalLogging.warnToConsole("Call to start failed: "+n.Util.dump(e))}},t.prototype.stopPageVisitTimer=function(){var r,i,t;try{return n.Util.canUseSessionStorage()?(r=Date.now(),i=n.Util.getSessionStorage(this.prevPageVisitDataKeyName),i?(t=JSON.parse(i),t.pageVisitTime=r-t.pageVisitStartTime,n.Util.removeSessionStorage(this.prevPageVisitDataKeyName),t):null):null}catch(u){return n._InternalLogging.warnToConsole("Stop page visit timer failed: "+n.Util.dump(u)),null}},t}(),i;t.PageVisitTimeManager=r;i=function(){function n(n,t){this.pageVisitStartTime=Date.now();this.pageName=n;this.pageUrl=t}return n}();t.PageVisitData=i})(t=n.Telemetry||(n.Telemetry={}))})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){var t;(function(t){"use strict";var r,i;t.Version="0.18.0";r=function(){function r(n){var u=this,f,e,o;if(this.config=n||{},f=r.defaultConfig,f!==undefined)for(e in f)this.config[e]===undefined&&(this.config[e]=f[e]);t._InternalLogging.verboseLogging=function(){return u.config.verboseLogging};t._InternalLogging.enableDebugExceptions=function(){return u.config.enableDebug};o={instrumentationKey:function(){return u.config.instrumentationKey},accountId:function(){return u.config.accountId},appUserId:function(){return u.config.appUserId},sessionRenewalMs:function(){return u.config.sessionRenewalMs},sessionExpirationMs:function(){return u.config.sessionExpirationMs},endpointUrl:function(){return u.config.endpointUrl},emitLineDelimitedJson:function(){return u.config.emitLineDelimitedJson},maxBatchSizeInBytes:function(){return u.config.maxBatchSizeInBytes},maxBatchInterval:function(){return u.config.maxBatchInterval},disableTelemetry:function(){return u.config.disableTelemetry},sampleRate:function(){return u.config.samplingPercentage}};this.context=new t.TelemetryContext(o);this._eventTracking=new i("trackEvent");this._eventTracking.action=function(n,i,r,f,e){var o=new t.Telemetry.Event(n,f,e),s=new t.Telemetry.Common.Data(t.Telemetry.Event.dataType,o),h=new t.Telemetry.Common.Envelope(s,t.Telemetry.Event.envelopeType);u.context.track(h)};this._pageTracking=new i("trackPageView");this._pageTracking.action=function(n,t,i,r,f){u.sendPageViewInternal(n,t,i,r,f)};this._pageVisitTimeManager=new t.Telemetry.PageVisitTimeManager(function(n,t,i){return u.trackPageVisitTime(n,t,i)})}return r.prototype.sendPageViewInternal=function(n,i,r,u,f){var e=new t.Telemetry.PageView(n,i,r,u,f),o=new t.Telemetry.Common.Data(t.Telemetry.PageView.dataType,e),s=new t.Telemetry.Common.Envelope(o,t.Telemetry.PageView.envelopeType);this.context.track(s)},r.prototype.startTrackPage=function(n){try{typeof n!="string"&&(n=window.document&&window.document.title||"");this._pageTracking.start(n)}catch(i){t._InternalLogging.throwInternalNonUserActionable(0,"startTrackPage failed, page view may not be collected: "+t.Util.dump(i))}},r.prototype.stopTrackPage=function(n,i,r,u){try{typeof n!="string"&&(n=window.document&&window.document.title||"");typeof i!="string"&&(i=window.location&&window.location.href||"");this._pageTracking.stop(n,i,r,u);this.config.autoTrackPageVisitTime&&this._pageVisitTimeManager.trackPreviousPageVisit(n,i)}catch(f){t._InternalLogging.throwInternalNonUserActionable(0,"stopTrackPage failed, page view will not be collected: "+t.Util.dump(f))}},r.prototype.trackPageView=function(n,i,r,u){try{typeof n!="string"&&(n=window.document&&window.document.title||"");typeof i!="string"&&(i=window.location&&window.location.href||"");this.trackPageViewInternal(n,i,r,u);this.config.autoTrackPageVisitTime&&this._pageVisitTimeManager.trackPreviousPageVisit(n,i)}catch(f){t._InternalLogging.throwInternalNonUserActionable(0,"trackPageView failed, page view will not be collected: "+t.Util.dump(f))}},r.prototype.trackPageViewInternal=function(n,i,r,u){var o=this,f=0,e,s;t.Telemetry.PageViewPerformance.isPerformanceTimingSupported()&&(e=window.performance.timing.navigationStart,f=t.Telemetry.PageViewPerformance.getDuration(e,+new Date),s=setInterval(function(){var c,l,h,a,v;try{f=t.Telemetry.PageViewPerformance.getDuration(e,+new Date);c=t.Telemetry.PageViewPerformance.isPerformanceTimingDataReady();l=f>6e4;(l||c)&&(clearInterval(s),f=t.Telemetry.PageViewPerformance.getDuration(e,+new Date),h=new t.Telemetry.PageViewPerformance(n,i,f,r,u),o.sendPageViewInternal(n,i,h.isValid&&!isNaN(h.duration)?+h.duration:f,r,u),h.isValid&&(a=new t.Telemetry.Common.Data(t.Telemetry.PageViewPerformance.dataType,h),v=new t.Telemetry.Common.Envelope(a,t.Telemetry.PageViewPerformance.envelopeType),o.context.track(v)),o.context._sender.triggerSend())}catch(y){t._InternalLogging.throwInternalNonUserActionable(0,"trackPageView failed on page load calculation: "+t.Util.dump(y))}},100))},r.prototype.startTrackEvent=function(n){try{this._eventTracking.start(n)}catch(i){t._InternalLogging.throwInternalNonUserActionable(0,"startTrackEvent failed, event will not be collected: "+t.Util.dump(i))}},r.prototype.stopTrackEvent=function(n,i,r){try{this._eventTracking.stop(n,undefined,i,r)}catch(u){t._InternalLogging.throwInternalNonUserActionable(0,"stopTrackEvent failed, event will not be collected: "+t.Util.dump(u))}},r.prototype.trackEvent=function(n,i,r){try{var u=new t.Telemetry.Event(n,i,r),f=new t.Telemetry.Common.Data(t.Telemetry.Event.dataType,u),e=new t.Telemetry.Common.Envelope(f,t.Telemetry.Event.envelopeType);this.context.track(e)}catch(o){t._InternalLogging.throwInternalNonUserActionable(0,"trackEvent failed, event will not be collected: "+t.Util.dump(o))}},r.prototype.trackException=function(n,i,r,u){try{if(!t.Util.isError(n))try{throw new Error(n);}catch(f){n=f}var e=new t.Telemetry.Exception(n,i,r,u),o=new t.Telemetry.Common.Data(t.Telemetry.Exception.dataType,e),s=new t.Telemetry.Common.Envelope(o,t.Telemetry.Exception.envelopeType);this.context.track(s)}catch(h){t._InternalLogging.throwInternalNonUserActionable(0,"trackException failed, exception will not be collected: "+t.Util.dump(h))}},r.prototype.trackMetric=function(n,i,r,u,f,e){try{var o=new t.Telemetry.Metric(n,i,r,u,f,e),s=new t.Telemetry.Common.Data(t.Telemetry.Metric.dataType,o),h=new t.Telemetry.Common.Envelope(s,t.Telemetry.Metric.envelopeType);this.context.track(h)}catch(c){t._InternalLogging.throwInternalNonUserActionable(0,"trackMetric failed, metric will not be collected: "+t.Util.dump(c))}},r.prototype.trackTrace=function(n,i){try{var r=new t.Telemetry.Trace(n,i),u=new t.Telemetry.Common.Data(t.Telemetry.Trace.dataType,r),f=new t.Telemetry.Common.Envelope(u,t.Telemetry.Trace.envelopeType);this.context.track(f)}catch(e){t._InternalLogging.throwInternalNonUserActionable(1,"trackTrace failed, trace will not be collected: "+t.Util.dump(e))}},r.prototype.trackPageVisitTime=function(n,t,i){var r={PageName:n,PageUrl:t};this.trackMetric("PageVisitTime",i,1,i,i,r)},r.prototype.flush=function(){try{this.context._sender.triggerSend()}catch(n){t._InternalLogging.throwInternalNonUserActionable(0,"flush failed, telemetry will not be collected: "+t.Util.dump(n))}},r.prototype.setAuthenticatedUserContext=function(n,i){try{this.context.user.setAuthenticatedUserContext(n,i)}catch(r){t._InternalLogging.throwInternalUserActionable(1,"Setting auth user context failed. "+t.Util.dump(r))}},r.prototype.clearAuthenticatedUserContext=function(){try{this.context.user.clearAuthenticatedUserContext()}catch(n){t._InternalLogging.throwInternalUserActionable(1,"Clearing auth user context failed. "+t.Util.dump(n))}},r.prototype.SendCORSException=function(i){var r=n.ApplicationInsights.Telemetry.Exception.CreateSimpleException("Script error.","Error","unknown","unknown","The browser’s same-origin policy prevents us from getting the details of this exception.The exception occurred in a script loaded from an origin different than the web page.For cross- domain error reporting you can use crossorigin attribute together with appropriate CORS HTTP headers.For more information please see http://www.w3.org/TR/cors/.",0,null),u,f;r.properties=i;u=new t.Telemetry.Common.Data(t.Telemetry.Exception.dataType,r);f=new t.Telemetry.Common.Envelope(u,t.Telemetry.Exception.envelopeType);this.context.track(f)},r.prototype._onerror=function(n,i,r,u,f){var e,o,s,h;try{e={url:i?i:document.URL};t.Util.isCrossOriginError(n,i,r,u,f)?this.SendCORSException(e):(t.Util.isError(f)||(o="window.onerror@"+e.url+":"+r+":"+(u||0),f=new Error(n),f.stack=o),this.trackException(f,null,e))}catch(c){s=f?f.name+", "+f.message:"null";h=t.Util.dump(c);t._InternalLogging.throwInternalNonUserActionable(0,"_onerror threw "+h+" while logging error, error will not be collected: "+s)}},r}();t.AppInsights=r;i=function(){function n(n){this._name=n;this._events={}}return n.prototype.start=function(n){typeof this._events[n]!="undefined"&&t._InternalLogging.throwInternalUserActionable(1,"start"+this._name+" was called more than once for this event without calling stop"+this._name+". key is '"+n+"'");this._events[n]=+new Date},n.prototype.stop=function(n,i,r,u){var f=this._events[n],e,o;isNaN(f)?t._InternalLogging.throwInternalUserActionable(1,"stop"+this._name+" was called without a corresponding start"+this._name+" . Event name is '"+n+"'"):(e=+new Date,o=t.Telemetry.PageViewPerformance.getDuration(f,e),this.action(n,i,o,r,u));delete this._events[n];this._events[n]=undefined},n}()})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.properties={};this.measurements={};n.call(this)}return __extends(t,n),t}(n.PageViewData);n.AjaxCallData=t}(AI||(AI={})),function(n){"use strict";(function(n){n[n.SQL=0]="SQL";n[n.Http=1]="Http";n[n.Other=2]="Other"})(n.DependencyKind||(n.DependencyKind={}));var t=n.DependencyKind}(AI||(AI={})),function(n){"use strict";(function(n){n[n.Undefined=0]="Undefined";n[n.Aic=1]="Aic";n[n.Apmc=2]="Apmc"})(n.DependencySourceType||(n.DependencySourceType={}));var t=n.DependencySourceType}(AI||(AI={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.kind=0;this.dependencyKind=2;this.success=!0;this.dependencySource=0;this.properties={};n.call(this)}return __extends(t,n),t}(Microsoft.Telemetry.Domain);n.RemoteDependencyData=t}(AI||(AI={})),function(n){"use strict";var t=function(n){function t(){this.ver=2;this.properties={};this.measurements={};n.call(this)}return __extends(t,n),t}(Microsoft.Telemetry.Domain);n.RequestData=t}(AI||(AI={})),function(n){var t;(function(t){"use strict";var i=function(){function i(t){t.queue=t.queue||[];var r=t.config||{};if(r&&!r.instrumentationKey)if(r=t,r.iKey)n.ApplicationInsights.Version="0.10.0.0",r.instrumentationKey=r.iKey;else if(r.applicationInsightsId)n.ApplicationInsights.Version="0.7.2.0",r.instrumentationKey=r.applicationInsightsId;else throw new Error("Cannot load Application Insights SDK, no instrumentationKey was provided.");r=i.getDefaultConfig(r);this.snippet=t;this.config=r}return i.prototype.loadAppInsights=function(){var t=new n.ApplicationInsights.AppInsights(this.config),u,i,r;return this.config.iKey&&(u=t.trackPageView,t.trackPageView=function(n,i,r){u.apply(t,[null,n,i,r])}),i="logPageView",typeof this.snippet[i]=="function"&&(t[i]=function(n,i,r){t.trackPageView(null,n,i,r)}),r="logEvent",typeof this.snippet[r]=="function"&&(t[r]=function(n,i,r){t.trackEvent(n,i,r)}),t},i.prototype.emptyQueue=function(){var u,t,f,r;try{if(n.ApplicationInsights.Util.isArray(this.snippet.queue)){for(u=this.snippet.queue.length,t=0;t<u;t++)f=this.snippet.queue[t],f();this.snippet.queue=undefined;delete this.snippet.queue}}catch(i){r="Failed to send queued telemetry";i&&typeof i.toString=="function"&&(r+=": "+i.toString());n.ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1,r)}},i.prototype.pollInteralLogs=function(t){return setInterval(function(){for(var i=n.ApplicationInsights._InternalLogging.queue,u=i.length,r=0;r<u;r++)t.trackTrace(i[r]);i.length=0},this.config.diagnosticLogInterval)},i.prototype.addHousekeepingBeforeUnload=function(t){if("onbeforeunload"in window){var i=function(){t.context._sender.triggerSend();t.context._sessionManager.backup()};n.ApplicationInsights.Util.addEventHandler("beforeunload",i)||n.ApplicationInsights._InternalLogging.throwInternalNonUserActionable(0,"Could not add handler for beforeunload")}},i.getDefaultConfig=function(n){return n||(n={}),n.endpointUrl=n.endpointUrl||"//dc.services.visualstudio.com/v2/track",n.accountId=n.accountId,n.appUserId=n.appUserId,n.sessionRenewalMs=18e5,n.sessionExpirationMs=864e5,n.maxBatchSizeInBytes=n.maxBatchSizeInBytes>0?n.maxBatchSizeInBytes:1e6,n.maxBatchInterval=isNaN(n.maxBatchInterval)?15e3:n.maxBatchInterval,n.enableDebug=t.Util.stringToBoolOrDefault(n.enableDebug),n.autoCollectErrors=n.autoCollectErrors!==undefined&&n.autoCollectErrors!==null?t.Util.stringToBoolOrDefault(n.autoCollectErrors):!0,n.disableTelemetry=t.Util.stringToBoolOrDefault(n.disableTelemetry),n.verboseLogging=t.Util.stringToBoolOrDefault(n.verboseLogging),n.emitLineDelimitedJson=t.Util.stringToBoolOrDefault(n.emitLineDelimitedJson),n.diagnosticLogInterval=n.diagnosticLogInterval||1e4,n.autoTrackPageVisitTime=t.Util.stringToBoolOrDefault(n.autoTrackPageVisitTime),(isNaN(n.samplingPercentage)||n.samplingPercentage<=0||n.samplingPercentage>=100)&&(n.samplingPercentage=100),n},i}();t.Initialization=i})(t=n.ApplicationInsights||(n.ApplicationInsights={}))}(Microsoft||(Microsoft={}));initializeAppInsights()
function showLoading() {
    $('#loadingModal').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}

function hideLoading() {
    $('#loadingModal').modal({
        show: false
    });
}
(function($) {
    $(document).ready(function() {
        $('#createTopicForm').submit(function(evt) {
            evt.preventDefault();
            showLoading();

            var json = getJson(this);
            $.ajax({
                url: 'http://localhost:9000/topics',
                contentType:'application/json; charset=UTF-8',
                method: 'POST',
                data: JSON.stringify(json),
                dataType: 'json'
            }).success(function() {
                location.reload();
            });
        });

        $('.vote-form').submit(function(evt) {
            evt.preventDefault();
            showLoading();

            var id = $(this).attr('id');
            var json = getJson(this);
            $.ajax({
                url: 'http://localhost:9000/topics/' + id + '/vote',
                contentType:'application/json; charset=UTF-8',
                method: 'POST',
                data: JSON.stringify(json),
                dataType: 'json'
            }).success(function() {
                location.reload();
            });
        });
    });

    function getJson(form) {
        var inputs = $(form).find(':input');
        var json = {};
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            json[input.attr('name')] = input.val();
        }
        return json;
    }
})($ = window.$ || {});