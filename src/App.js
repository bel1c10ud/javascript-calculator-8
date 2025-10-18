import { Console } from "@woowacourse/mission-utils";

class App {
  async getInput() {
    try {
      const input = await Console.readLineAsync(
        "덧셈할 문자열을 입력해 주세요.\n"
      );
      return input;
    } catch (error) {
      
    }
  }
  splitInput(input) {
    const separators = [",", ":"];
    const CUSTOM_SEPARATOR_REGEX = new RegExp(/^\/\/(\D)\\n/);

    // 커스텀 구분자를 지정하였는지 확인
    if (CUSTOM_SEPARATOR_REGEX.test(input)) {
      const customSeparator = input
        .match(CUSTOM_SEPARATOR_REGEX)[1]
        // 정규표현식에서 사용하는 특수문자 이스케이핑
        .replace(/[.*+?^${}()|[\]\\]/, "\\$&");

      // 구분자 추가
      separators.push(customSeparator);
    }

    const SEPARATOR_REGEX = new RegExp(`${separators.join("|")}`);

    const numbers = input
      .replace(CUSTOM_SEPARATOR_REGEX, "")
      .split(SEPARATOR_REGEX)
      .map(Number);

    return numbers;
  }
  async run() {
    const input = await this.getInput();
    const numbers = this.splitInput(input);
    const result = numbers.reduce((prev, cur) => prev + cur, 0);

    Console.print(`결과 : ${result}`);
  }
}

export default App;
