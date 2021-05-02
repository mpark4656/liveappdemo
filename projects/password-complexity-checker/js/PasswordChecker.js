export default class PasswordChecker {
    minimumLength = 8;
    maximumLength = 20;

    containsUpperCaseAlphabet = true;
    containsLowerCaseAlphabet = true;
    containsNumericValue = true;
    containsSpecialCharacter = true;

    minimumUpperCaseAlphabetCount = 1;
    minimumLowerCaseAlphabetCount = 1;
    minimumNumericValueCount = 1;
    minimumSpecialCharacterCount = 1;

    prohibitedSpecialCharacters = [];
    maximumSameCharacterRepeatLength = 0;

    constructor() {
        this.prohibitedSpecialCharacters[" "] = true;
    }

    get containsUpperCaseAlphabet() {
        return this.containsUpperCaseAlphabet;
    }

    get minimumLength() {
        return this.minimumLength;
    }

    get maximumLength() {
        return this.maximumLength;
    }

    get containsLowerCaseAlphabet() {
        return this.containsLowerCaseAlphabet;
    }

    get containsNumericValue() {
        return this.containsNumericValue;
    }

    get containsSpecialCharacter() {
        return this.containsSpecialCharacter;
    }

    get minimumUpperCaseAlphabetCount() {
        return this.minimumUpperCaseAlphabetCount;
    }

    get minimumLowerCaseAlphabetCount() {
        return this.minimumLowerCaseAlphabetCount;
    }

    get minimumNumericValueCount() {
        return this.minimumNumericValueCount;
    }

    get minimumSpecialCharacterCount() {
        return this.minimumSpecialCharacterCount;
    }

    get maximumSameCharacterRepeatLength() {
        return this.maximumSameCharacterRepeatLength;
    }

    get prohibitedSpecialCharacters() {
        let res = "";
        for(let i = 0; i < this.prohibitedSpecialCharacters.length; i++) {
            res += this.prohibitedSpecialCharacters[i];
        }
        return res;
    }

    setMinimumLength(length) {
        if(typeof length !== "number" || length < 1) return undefined;
        this.minimumLength = length < this.maximumLength ? length : this.maximumLength;
        return this;
    }

    setMaximumLength(length) {
        if(typeof length !== "number" || length < 1) return undefined;
        this.maximumLength = length > this.minimumLength ? length : this.minimumLength;
        return this;
    }

    mustContainUpperCaseAlphabet(boolean) {
        if(typeof boolean !== "boolean") return undefined;
        this.containsUpperCaseAlphabet = boolean;
        return this;
    }

    mustContainLowerCaseAlphabet(boolean) {
        if(typeof boolean !== "boolean") return undefined;
        this.containsLowerCaseAlphabet = boolean;
        return this;
    }

    mustContainNumericValue(boolean) {
        if(typeof boolean !== "boolean") return undefined;
        this.containsNumericValue = boolean;
        return this;
    }

    mustContainSpecialCharacter(boolean) {
        if(typeof boolean !== "boolean") return undefined;
        this.containsSpecialCharacter = boolean;
        return this;
    }

    setMinimumUpperCaseAlphabetCount(count) {
        if(typeof count !== "number" || count < 1) return undefined;
        this.minimumUpperCaseAlphabetCount = count;
        return this;
    }

    setMinimumLowerCaseAlphabetCount(count) {
        if(typeof count !== "number" || count < 1) return undefined;
        this.minimumLowerCaseAlphabetCount = count;
        return this;
    }

    setMinimumNumericValueCount(count) {
        if(typeof count !== "number" || count < 1) return undefined;
        this.minimumNumericValueCount = count;
        return this;
    }

    setMinimumSpecialCharacterCount(count) {
        if(typeof count !== "number" || count < 1) return undefined;
        this.minimumSpecialCharacterCount = count;
        return this;
    }

    setProhibitedSpecialCharacters(specialCharacters) {
        if(typeof specialCharacters !== "string") return undefined;
        this.prohibitedSpecialCharacters = [];
        this.prohibitedSpecialCharacters[" "] = true;
        for(let i = 0; i < specialCharacters.length; i++) {
            if(!/^[a-z0-9]+$/i.test(specialCharacters[i])) {
                this.prohibitedSpecialCharacters[specialCharacters[i]] = true;
            }
        }
        return this;
    }

    setMaximumSameCharacterRepeatLength(length) {
        if(typeof length !== "number" || length < 0) return undefined;
        this.maximumSameCharacterRepeatLength = length;
        return this;
    }

    test(password) {
        let violationMessages = [];

        violationMessages.push(this.testMinimumLength(password));
        violationMessages.push(this.testMaximumLength(password));
        if(this.containsLowerCaseAlphabet)
            violationMessages.push(this.testContainsLowerCaseAlphabet(password));
        if(this.containsUpperCaseAlphabet)
            violationMessages.push(this.testContainsUpperCaseAlphabet(password));
        if(this.containsNumericValue)
            violationMessages.push(this.testContainsNumericValue(password));
        if(this.containsSpecialCharacter)
            violationMessages.push(this.testContainsSpecialCharacter(password));
        violationMessages.push(this.testProhibitedSpecialCharacters(password));
        if(this.maximumSameCharacterRepeatLength > 0)
            violationMessages.push(this.testMaximumSameCharacterRepeat(password));

        return violationMessages;
    }

    testMinimumLength(password) {
        if(password.length >= this.minimumLength)
            return [
                "passed",
                "The password meets the minimum required length: " + this.minimumLength
            ];
        else return [
            "failed",
            "The password must be at least " + this.minimumLength + " characters long"
        ];
    }

    testMaximumLength(password) {
        if(password.length <= this.maximumLength)
            return [
                "passed",
                "The password meets the maximum required length: " + this.maximumLength
            ];
        else return [
            "failed",
            "The password must be at most " + this.maximumLength + " characters long"
        ];
    }

    testContainsLowerCaseAlphabet(password) {
        let cnt = 0;
        for(let i = 0; i < password.length; i++) {
            if (/^[a-z]+$/.test(password[i])) cnt++;
        }
        if(cnt >= this.minimumLowerCaseAlphabetCount)
            return [
                "passed",
                "The password contains at least " +
                    this.minimumLowerCaseAlphabetCount + " lowercase characters"
            ];
        else
            return [
                "failed",
                "The password does not contain at least " +
                    this.minimumLowerCaseAlphabetCount + " lowercase characters"
            ];
    }

    testContainsUpperCaseAlphabet(password) {
        let cnt = 0;
        for(let i = 0; i < password.length; i++) {
            if (/^[A-Z]+$/.test(password[i])) cnt++;
        }
        if(cnt >= this.minimumUpperCaseAlphabetCount)
            return [
                "passed",
                "The password contains at least " +
                    this.minimumUpperCaseAlphabetCount + " uppercase characters"
            ];
        else
            return [
                "failed",
                "The password does not contain at least " +
                    this.minimumUpperCaseAlphabetCount + " uppercase characters"
            ];
    }

    testContainsNumericValue(password) {
        let cnt = 0;
        for(let i = 0; i < password.length; i++) {
            if (/^[0-9]+$/.test(password[i])) cnt++;
        }
        if(cnt >= this.minimumNumericValueCount)
            return [
                "passed",
                "The password contains at least " +
                    this.minimumNumericValueCount + " numeric characters"
            ];
        else
            return [
                "failed",
                "The password does not contain at least " +
                    this.minimumNumericValueCount + " numeric characters"
            ];
    }

    testContainsSpecialCharacter(password) {
        let cnt = 0;
        for(let i = 0; i < password.length; i++) {
            if (!/^[a-z0-9]+$/i.test(password[i])) cnt++;
        }
        if(cnt >= this.minimumSpecialCharacterCount)
            return [
                "passed",
                "The password contains at least " +
                    this.minimumSpecialCharacterCount + " special characters"
            ];
        else
            return [
                "failed",
                "The password does not contain at least " +
                    this.minimumSpecialCharacterCount + " special characters"
            ];
    }

    testProhibitedSpecialCharacters(password) {
        for(let i = 0; i < password.length; i++) {
            if(this.prohibitedSpecialCharacters[password[i]])
                return [
                    "failed", "The password contains a prohibited character: '" + password[i] + "'"
                ];
        }
        return ["passed", "The password does not contain any prohibited characters"];
    }

    testMaximumSameCharacterRepeat(password) {
        let prev = undefined;
        let rep = 0;

        for(let i = 0; i < password.length; i++) {
            if(password[i] !== prev) {
                prev = password[i];
                rep = 1;
            } else {
                rep++;
                if(rep > this.maximumSameCharacterRepeatLength) {
                    return [
                        "failed",
                        "The password contains repeating characters of more than length " +
                            this.maximumSameCharacterRepeatLength
                    ];
                }
            }
        }
        return [
            "passed",
            "The password does not contain repeating characters of more than length " +
                this.maximumSameCharacterRepeatLength
        ];
    }
}