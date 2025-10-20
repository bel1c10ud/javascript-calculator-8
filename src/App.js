import { Console } from "@woowacourse/mission-utils";

class App {
  async getInput() {
    try {
      const input = await Console.readLineAsync(
        "덧셈할 문자열을 입력해 주세요.\n"
      );
      return input;
    } catch (error) {
      throw new Error("[ERROR] 사용자 입력을 읽는 중 오류가 발생했습니다.");
    }
  }
  splitInput(input) {
    const separators = [",", ":"];
    const CUSTOM_SEPARATOR_REGEX = new RegExp(/^\/\/(.*)\\n/);

    // 커스텀 구분자를 지정하였는지 확인
    if (input.match(CUSTOM_SEPARATOR_REGEX)) {
      const customSeparator = input.match(CUSTOM_SEPARATOR_REGEX)[1];

      if (customSeparator.length === 0) {
        throw new Error("[ERROR] 커스텀 구분자는 비어 있을 수 없습니다.");
      }

      if (customSeparator.length > 1) {
        throw new Error("[ERROR] 커스텀 구분자는 1자만 지정할 수 있습니다.");
      }

      if (!isNaN(Number(customSeparator)) && !isNaN(parseFloat(customSeparator))) {
        throw new Error("[ERROR] 숫자는 커스텀 구분자로 사용할 수 없습니다.");
      }

      if (customSeparator === ".") {
        throw new Error("[ERROR] 마침표(.)는 커스텀 구분자로 사용할 수 없습니다.");
      }

      // 구분자 추가 (정규표현식에서 사용하는 특수문자 이스케이핑)
      separators.push(customSeparator.replace(/[.*+?^${}()|[\]\\]/, "\\$&"));
    }

    const SEPARATOR_REGEX = new RegExp(`${separators.join("|")}`);
    const processedInput = input.replace(CUSTOM_SEPARATOR_REGEX, "");

    if (processedInput.length === 0) {
      return [];
    }

    return processedInput.split(SEPARATOR_REGEX);
  }
  calculate(numStrs) {
    if (numStrs.some((numStr) => numStr.trim() === "")) {
      throw new Error("[ERROR] 빈 값은 계산할 수 없습니다.");
    }

    if (numStrs.some((numStr) => isNaN(Number(numStr)) || isNaN(parseFloat(numStr)))) {
      throw new Error("[ERROR] 숫자가 아닌 값은 계산할 수 없습니다.");
    }

    if (numStrs.some((numStr) => Number(numStr) < 0)) {
      throw new Error("[ERROR] 음수는 입력할 수 없습니다.");
    }

    return numStrs.map(Number).reduce((prev, cur) => prev + cur, 0);
  }
  async run() {
    const input = await this.getInput();
    const numStrs = this.splitInput(input);
    const result = this.calculate(numStrs);

    Console.print(`결과 : ${result}`);
  }
}

export default App;
